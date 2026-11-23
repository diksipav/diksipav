---
id: gag7b1f0-0017-11ea-9149-d386e8a6bfaa
title: Random bits of curiosity
date: 2026-09-31
desc: Random thoughts and curiosity follow-ups about Rust and systems eng.
seoDesc: ''
tags: '#rust'
---

This morning I was very determined to understand what is really going on with `let s = "hello world";`.
I knew that the text is part of the program binary executable and that `s` is of type `&'static str`.

I researched a bit and came with the following understanding (ofc, there is still so much to understand, 
to read the whole CS:APP, OSTEP, assembly guides, and bunch of other resources I know and don't know about).

At compile time, the compiler places the text in the read-only part of the binary (usually `.rodata` on Linux)[^elf] 
and records a symbol/reference to its address, along with its length. The compiler also decides the layout 
of the function’s stack frame, including the offset at which the address and length of `s` will be stored.

`s` is an entry in the compiler’s symbol/scope table. The compiler records its type, scope, and storage 
location, often a stack-frame offset (a case in our example). That table is used to translate every later 
use of `s` into an address calculation or register access.

At runtime, once the process’s virtual address space exists and the function’s stack frame is created, 
generated machine code stores the literal’s resolved virtual address and its length into the stack slot 
chosen by the offset generated at compile time.

[^elf]: A compiled program is more than a list of machine instructions. The file also holds constant data, 
    initial values of global variables, symbol names, and information the OS needs to load the program into 
    memory. Each operating system defines a file format that organizes all of this: Linux uses ELF (Executable 
    and Linkable Format). An ELF file is divided into sections, each holding one kind of content. The most common ones are:

    - `.text`: the program’s executable machine instructions.
    - `.rodata`: read-only data, such as the bytes of string literals like `"hello world"`.
    - `.data`: writable, initialized data, typically global or static variables with nonzero initial values.
    - `.bss`: space for zero-initialized global or static data. Instead of storing all those zero bytes in the 
      file, the binary records only how much space is needed, and that memory is zero-filled when the program 
      is loaded.

    When the program is loaded, the OS maps these sections into memory with matching permissions. That is what 
    makes `.rodata` truly read-only at runtime: trying to write to it crashes the program with a segmentation fault.
