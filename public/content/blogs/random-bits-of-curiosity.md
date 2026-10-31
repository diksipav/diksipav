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

I poked around a bit and here’s my current understanding. Of course, there’s still an infinite amount to 
learn (grind through CS:APP, OSTEP, assembly guides, and a bunch of other resources I know and don’t know about).

At compile time, the compiler places the text in the read-only part of the binary (usually `.rodata` on Linux) 
and records a symbol/reference to its address, along with its length. The compiler also decides the layout 
of the function’s stack frame, including the offset at which the address and length of `s` will be stored.

`s` is an entry in the compiler’s symbol/scope table. The compiler records its type, scope, and storage 
location, often a stack-frame offset (a case in our example). That table is used to translate every later 
use of `s` into an address calculation or register access.

At runtime, once the process’s virtual address space exists and the function’s stack frame is created, 
generated machine code stores the literal’s resolved virtual address and its length into the stack slot 
chosen by the offset generated at compile time.
