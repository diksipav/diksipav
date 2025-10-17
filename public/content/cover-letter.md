I’m writing to express my strong interest in backend and systems engineering roles, with a particular passion for working with **Rust**.

## Background  

I’m a software engineer with ten years of professional experience. My journey began in Belgrade, where I attended a specialized high school for gifted mathematicians before studying Electrical Engineering and Electronics at the University of Belgrade. I started my career as a silicon designer, working in that field for two years before transitioning to software engineering in 2017. At that time, limited opportunities in Serbia, combined with financial constraints and a necessary eye surgery to correct double vision, prevented me from fully pursuing my goals.

Big part of my software career has been focused on frontend development (**Angular, React, Next.js, Svelte**), along with backend experience in **Node.js** and **NestJS**. For the last 2 years, I worked at [Gel](https://www.geldata.com/) as a TypeScript tooling and AI engineer, where I built AI solutions with both TypeScript and Python.  

Despite this, I’ve always felt drawn back to low-level and systems work—where I can tackle more complex problems and focus on performance. Two months ago, I decided to fully commit to this direction.  

## Recent Focus  
Since then, I’ve dedicated myself to Rust and backend/system design:  

- Read ~50% of [Designing Data-Intensive Applications (Kleppmann)](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321) (and I read and reread slow because I'm trying to understand and remember as much as possible).
- Completed ~90% of both the [Rust Book](https://rust-book.cs.brown.edu/) and [Async Rust](https://rust-lang.github.io/async-book/intro.html).  
- Studied half of the [Rust Atomics and Locks](https://marabos.nl/atomics/) and resources like [CPU caches and memory](https://people.freebsd.org/~lstewart/articles/cpumemory.pdf).
- Worked through the [Tokio tutorial](https://tokio.rs/tokio/tutorial), read many blog posts, exploring various github projects.
- Reading [CSAP - Computer Systems](https://www.amazon.com/Computer-Systems-Programmers-Perspective-3rd/dp/013409266X).
- Spent few days solely with different data structures (BST, RBT, AVL, B Trees, Radix Tree, Skip Lists...).
- Spent few days understanding better Linux, hardware and OS virtualization, hypervisor, virtual machines, containers...
- Spent few days researching locks, deadlocks, pessimistic/optimistic locking, priority inversion, semaphores, lock-free data structures, epoch-based memory reclamation, transactional memory ...
- Read WebKit blog post about [locking data structures](https://webkit.org/blog/6161/locking-in-webkit/) they built.
- The list will never end—and I’m excited to keep enriching it in my next role. 😊😊

## I Built a Rust Project
I built **[redis-streams](https://github.com/diksipav/redis-streams)**, a Rust library inspired by Redis Streams. While it’s an early version (created in 4 days with the help of AI), it gave me hands-on experience with concurrency, locking, and Tokio.  

In retrospect, I realized the design could be improved with a **Radix tree** for efficiency, so I want to explore existing crates or build my own radix tree crate. I also recently learned about **ULID**, which may fit this project well.

## Current Exploration & Contributions  
- I merged few PRs to [Meilisearch](https://www.meilisearch.com/).
- I researched in detail [parking_lot crate](https://crates.io/crates/parking_lot). There are no many issues on this crate, so I am waiting for the opportunity to contribute. 
- Currently, I'm researching [SlateDB](https://slatedb.io/). I go through PRs and also read relevant conversations and research papers to understand all the concepts and real-world implementations (for compaction, reader/writer protocols, snapshots etc). Knowledge from *Designing Data-Intensive Applications* (SSTables, LSM trees, WALs) helped to understand the project faster.
- I researched [Diesel](https://github.com/diesel-rs/diesel) for a few days. This is an ORM and Query Builder for Rust.
- I also researched [rustfs](https://github.com/rustfs/rustfs) – a high-performance distributed object storage. I find this and SlateDB a bit more interesting than ORMs so I'll focus on them for now.

## Why Rust & Systems Work  
While I’ve built a career in frontend and AI, my long-term aspiration has always been to design performant systems and solve challenging engineering problems. I’m looking for a role where I can apply my experience, continue learning, and grow within a Rust-focused team. I am also open to full-stack work. It is not that I don't like FE or tooling work — I enjoy programming in general and I am grateful for all the knowledge and skills I have picked up until now. I just want to spend time perfecting my skills in a slightly different area of programming.gi