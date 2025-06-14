---
id: aa37b1f0-0017-11ea-9149-d386e8a6bf6f
title: Efficient way to read string files in Rust
date: 2024-03-25
desc: Today, we will explore a few different methods for reading files in Rust. As a frontend engineer with a huge curiosity for backend and low-level systems, experimenting with Rust has been quite an enjoyable journey.
seoTags: Explore efficient methods for reading string files in Rust in this detailed guide. Learn about various approaches, performance insights, and practical tips.
tags: '#software #rust'
---

Today, we will explore a few different methods for reading files in Rust. As a frontend engineer with a huge curiosity for backend and low-level systems, experimenting with Rust has been quite an enjoyable journey. Last year, this system language caught my attention, and since then, I've found myself returning to it time and again.

Recently, I've started a small Rust [CLI project](https://rust-cli.github.io/book/) to deepen my understanding of the language. The task is seemingly simple: create a tool that searches for a string within a file and outputs all lines containing that string to the terminal (basic form of wellknown [grep](https://en.wikipedia.org/wiki/Grep#:~:text=grep%20is%20a%20command%2Dline,which%20has%20the%20same%20effect.)). However, what began as a straightforward exercise soon evolved into an exploration of efficient file reading techniques, particularly for handling large datasets.

In this blog post, I'll share my discovery, presenting several approaches for reading files. Along the way, I'll explain the inner workings of each solution and provide insights from my performance analysis. While not a comprehensive guide, I hope this exploration inspires you to experiment with Rust and deepen your understanding of its capabilities. You can find my project at [github/simple-rust-grep-tool](https://github.com/diksipav/simple-rust-grep-tool).

This is not a step by step guide, you should be able to create new Rust project, know how to run it, and explore and learn on your own about the crates I'm using here. Focus is on finding performant way to read files from disk.

## Brief explanation of the simple grep tool

Let's say our text file name is `random_text.txt` and we want to print only the lines that contain `"hello world"`. To invoke the tool we'll use the following command:

```bash
$ cargo run "hello world" random_text.txt
```

Upon executing this command we should see in the terminal the appropriate lines. If the file does not exist or is somehow corrupted, the tool will provide an appropriate error message.

> Of course, if there are no lines with the phrase you can update the tool to print out the appropriate message too (I'm not doing it here).

Text file I'm using here has 10mb, each line is 80 characters long. I'm generating it with Rust too (out of scope for this post, but you can find the script I'm using in the [Github repo](https://github.com/diksipav/simple-rust-grep-tool)).

## Let's start

I'll focus on two files here: `main.rs` and `util.rs`. Main function parses command line arguments and invokes different functions for reading a file and searching for particular phrase in it.

`util.rs` is a module that contains my solution functions: `read_file_as_a_string`, `read_file_line_by_line` and `read_file_line_by_line_better`.

Here is the content of the main file:

```rust
use std::time::Instant;

use clap::Parser;

use util::read_file_as_a_string;

mod util;

#[derive(Parser)]
struct Cli {
    pattern: String,
    path: std::path::PathBuf,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Record the start time
    let start_time = Instant::now();

    // Parse command line arguments
    let args = Cli::parse();

    // Read the file and print lines or return an err
    read_file_as_string(&args)?;

    let end_time = Instant::now();

    // Calculate the elapsed time
    let elapsed_time = end_time.duration_since(start_time);

    // Print the elapsed time in milliseconds
    println!("Program execution time: {} ms", elapsed_time.as_millis());

    Ok(())
}
```

The `Cli` struct defines arguments I want to parse from the invocation command. For parsing arguments I use [clap](https://docs.rs/clap/latest/clap/) crate which is an excelent command line argument parser for Rust. Additionally, I employ the [instant](https://doc.rust-lang.org/std/time/struct.Instant.html) struct to measure the execution time of the tool. I'm here invoking `read_file_as_string` as a first solution, later when I intend to test another 2 approaches I'll just replace this function with another ones.

> Note: A more elegant approach would involve adding support for an additional flag that users can provide to the grep command. This argument would enable users to specify their preferred method for reading the file. Based on the provided flag, the tool would then invoke the corresponding function.

## The easiest solution: read_to_string

The most basic approach to read a file is to use standard library [std::fs::read_to_string](https://doc.rust-lang.org/std/fs/fn.read_to_string.html) function. This will read the entire contents of a file into a string which mean it will read the whole file into memory (RAM), however large the file might be.

```rust
use std::fs::File;

use anyhow::{Context, Result};

use crate::Cli;

pub fn read_file_as_string(args: &Cli) -> Result<()> {
    let content = std::fs::read_to_string(&args.path)
        .with_context(|| format!("Could not read the file {}", args.path.display()))?;

    for line in content.lines() {
        if line.contains(&args.pattern) {
            println!("{}", line);
        }
    }

    Ok(())
}
```

I really like using `with_context` from [anyhow](https://docs.rs/anyhow/latest/anyhow/trait.Context.html#tymethod.with_context) crate to show nicer errors and more context alongside original errors.

This works, but is not good for large files, since it can lead to memory exhaustion, causing the program to run out of memory and potentially crash.

### Performance: read_to_string

This solution took 128ms, 114ms, and 114ms, respectively, to complete the task in three consecutive calls.

## A better solution: BufReader

The better approach is to use [std::io::BufReader](https://doc.rust-lang.org/std/io/struct.BufReader.html) struct from the standard library. This struct adds buffering to any reader. A buffered reader is usually more efficient way to read from a file in Rust (true for other languages too), due to its ability to minimize the number of system calls and improve performance by reading data in larger chunks and storing it in memory for faster access (check the section below about system calls). Its buffer size is fixed (default is 8KiB, it is configurable) so for large files it will not store the whole file in memory.

Here is a solution that read line by line using buffered reader:

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

use anyhow::{Context, Result};

use crate::Cli;

pub fn read_file_line_by_line(args: &Cli) -> Result<(), Box<dyn std::error::Error>> {
    let f = File::open(&args.path)
        .with_context(|| format!("Could not read the file {}", args.path.display()))?;

    let reader = BufReader::new(f);

    for line in reader.lines() {
        let line = line?;

        if line.contains(&args.pattern) {
            println!("{}", line);
        }
    }

    Ok(())
}
```

### Performance: BufReader using .lines()

I thought I found the approach I want to go on with, but then I tested it and the results were not what I was expecting. This solution took 239ms, 180ms, 181ms. What?! Slower than the basic `read-to-string` solution? So I researched.

The `lines()` method automatically attached to anything implementing `std::io::BufRead` trait is really convenient but it has a big performance problem - the iterator returns an owned String so we need to allocate a new string on the heap for every line in the file. While memory allocation itself is generally fast, the overhead of allocating and deallocating memory for each line can become significant, especially for large files with many short lines (which is my text file).

## Ok, now really better approach

So, the obvious "fix" to the previous approach is to create manually a `String` buffer and read line by line into this buffer (I named this buffer `line`). This means we only ever have one string buffer and there is no allocation and dealocation of heap memory for every line (if new line is longer than previous one there will be new allocation).

Before filling the buffer with new line we clear the buffer (if the new line is shorter than the previous one/ones and we don't clear the buffer it will end up with data from both/multiple lines).

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

use anyhow::{Context, Result};

use crate::Cli;

pub fn read_file_line_by_line_better(args: &Cli) -> Result<(), Box<dyn std::error::Error>> {
    let f = File::open(&args.path)
        .with_context(|| format!("Could not read the file {}", args.path.display()))?;

    let mut reader = BufReader::new(f);
    let mut line = String::new();

    loop {
        let len = reader.read_line(&mut line)?;

        if len == 0 {
            break;
        }

        if line.contains(&args.pattern) {
            println!("{}", line.trim());
        }

        line.clear();
    }

    Ok(())
}
```

### Performance: BufReader using one buffer

After running the tool few times it has been confirmed that this approach is indeed superior to the two previous methods. The tool took 110ms, 107ms and 110ms (for 3 consecutive calls) to read the file and print the lines.

### Adjust the size of the buffer

The default buffer size is `8 KiB` which is maybe too much for the lines my text file has. I was playing a bit with this and found that the size of around 3 KiB gives the same performanse. But keep in mind that the larger the size of the buffer, the fewer system calls will occur. Try multiple values and test performance. You can adjust the size of the buffer when you create it using:

```rust
let mut reader = BufReader::with_capacity(3000, f);
```

You should definitelly check the official docs for [BufReader](https://doc.rust-lang.org/std/io/struct.BufReader.html#) to find out other ways you can use and configure it.

## A note on system calls

A system call is a mechanism for an application program on a machine to interact with machine's operating system (OS). Application programs use system calls to request services from the OS's kernel.

The kernel provides a set of interfaces by which processes running in user-space can interact with the system. These interfaces give applications controlled access to hardware, a mechanism with which to create new processes and communicate with existing ones, and the capability to request other OS resources.

When a program invokes a system call, the execution context switches from user to kernel mode, allowing the system to access hardware and perform the required operations safely. After the operation is completed, the control returns to the user mode, and the program continues its execution.

File reading in Rust, as in many programming languages, involves interactions with the underlying operating system. These interactions typically include system calls. System calls involve doing a bunch of work to prepare to hand over control to the operating system so that it can do the read operation. That work is the same whether you're reading one byte at a time or plenty.

`BufReader` makes it so that the system calls always read a lot at a time even when you only ask for a little bit of data, so that when you ask for the next little bit of data it doesn't need to go through the work all over again (it already has the requested data in the buffer). It's the same with lines in my example above, it will read as many data it can in the buffer and will read lines from it into our `line` String buffer as long as there are full lines. Next time there is no full line, `BufReader` will create another system call and fill its buffer again.

Using `read_to_string` makes it even more efficient in terms of the number of system calls, but if you're only using part of the file at a time it causes a lot of unnecessary memory use. `BufReader` is intended to be a middle ground without excessive memory usage or excessive system calls.

## Further performance improvements

The `contains` method from Rust's standard library that I'm using in the examples above to find a substring in a string is generally efficient for most use cases, but its performance might degrade for very large strings or if you're doing many substring checks in a tight loop. The primary reason for its potential slowness in those scenarios is its implementation. In those cases it's advisable to explore alternative approaches. Really good one is [memchr crate](https://docs.rs/memchr/latest/memchr/).

In the example provided earlier, I demonstrated reading files line by line. However, depending on your specific requirements, you might find it necessary to read the file in byte chunks rather than line by line. Additionally, employing `tokenization` can offer further flexibility and customization for various use cases.

Until next time, take care! 🦀 