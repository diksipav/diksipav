I’m writing to express my strong interest in backend, systems engineering and full-stack roles, with a particular passion for working with **Go**, **TS** and **Rust**.

I’m very motivated to go beyond pure coding and spend part of my time (or extra hours) on DevRel, product or project management, and other cross-functional work. I’m a high-agency, highly motivated person, and I want to use the next few years to work extremely hard and accelerate my growth as much as possible. Right now, I have the energy, focus, and flexibility to invest extra effort and really push myself.

## Background

I’m a software engineer with ten years of professional experience. My journey began in Belgrade, where I attended a specialized high school for gifted mathematicians before studying Electrical Engineering and Electronics at the University of Belgrade. I started my career as a silicon designer, working in that field for two years before transitioning to software engineering in 2017. At that time, limited opportunities in Serbia, combined with financial constraints and a necessary eye surgery to correct double vision, prevented me from fully pursuing my goals.

Big part of my software career has been focused on frontend development (**Angular, React, Next.js, Svelte**), along with backend experience in **Node.js** and **NestJS**. For the last 2 years, I worked at [Gel](https://www.geldata.com/) as a TypeScript tooling and AI engineer, where I built AI solutions with both TypeScript and Python.

Despite this, I’ve always felt drawn back to back-end, low-level and systems work—where I can tackle more complex problems and focus on performance. Eight months ago, I decided to fully commit to this direction.

## Recent Focus

Since then, I’ve dedicated myself to Rust, Go and backend/system design:

- Read ~50% of [Designing Data-Intensive Applications (Kleppmann)](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321).
- Completed ~90% of both the [Rust Book](https://rust-book.cs.brown.edu/) and [Async Rust](https://rust-lang.github.io/async-book/intro.html).
- Studied half of the [Rust Atomics and Locks](https://marabos.nl/atomics/) and resources like [CPU caches and memory](https://people.freebsd.org/~lstewart/articles/cpumemory.pdf).
- Got familiar with Golang.
- Worked through the [Tokio tutorial](https://tokio.rs/tokio/tutorial), read many blog posts, exploring various github projects.
- Read [CSAP - Computer Systems](https://www.amazon.com/Computer-Systems-Programmers-Perspective-3rd/dp/013409266X).
- Spent few days solely with different data structures (BST, RBT, AVL, B Trees, Radix Tree, Skip Lists...).
- Spent few days understanding better Linux, hardware and OS virtualization, hypervisor, virtual machines, containers...
- Spent few days researching locks, deadlocks, pessimistic/optimistic locking, priority inversion, semaphores, lock-free data structures, epoch-based memory reclamation, transactional memory ...
- Read WebKit blog post about [locking data structures](https://webkit.org/blog/6161/locking-in-webkit/) they built.
- Reading daily [hellointerview](https://www.hellointerview.com/). This is a great resource on system design.
- The list will never end—and I’m excited to keep enriching it in my next role. 😊😊

## ATM building a Go project

I got few days ago a bit more interested in Go, and I can't believe how much esier it is than Rust. You feel so much more productive. I started building a webhooks delivery service: [e-commerce-webooks](https://github.com/diksipav/e-commerce-webooks).

## I Built a Rust Project

I built **[redis-streams](https://github.com/diksipav/redis-streams)**, a Rust library inspired by Redis Streams. While it’s an early version (created in 4 days with the help of AI), it gave me hands-on experience with concurrency, locking, and Tokio.

In retrospect, I realized the design could be improved with a **Radix tree** for efficiency, so I want to explore existing crates or build my own radix tree crate. I also recently learned about **ULID**, which may fit this project well.

## Built Another Rust Project

I built a small [VM-Hours Allocation Service](https://github.com/diksipav/concurrent-http-service) where users can send HTTP requests to buy VM hours, and providers can send requests to sell resources. The system matches buyers with available supply, always prioritizing those willing to pay the highest price. It is designed to handle high concurrency, and if multiple buyers submit requests at the same price, the system serves them in the order their requests were received, using an atomic sequence counter to ensure fairness.

## Exploration & Contributions

- I merged few PRs to [Meilisearch](https://www.meilisearch.com/).
- I researched in detail [parking_lot crate](https://crates.io/crates/parking_lot). There are no many issues on this crate, so I am waiting for the opportunity to contribute.
- I merged few PRs to [Zed editor](https://zed.dev/). And for a few weeks now I only use Zed as my editor of choice.
- I researched in detail [SlateDB](https://slatedb.io/). I went through PRs and also read relevant conversations and research papers to understand all the concepts and real-world implementations (for compaction, reader/writer protocols, snapshots etc). Knowledge from *Designing Data-Intensive Applications* (SSTables, LSM trees, WALs) helped to understand the project faster.
- I researched [Diesel](https://github.com/diesel-rs/diesel) for a few days. This is an ORM and Query Builder for Rust.
- I also researched [rustfs](https://github.com/rustfs/rustfs) – a high-performance distributed object storage.

At the moment, I decided to spend some time on data structures and algorithms, this is my [LeetCode profile](https://leetcode.com/u/DijanaPavlovic). 

## Why all this

Long term, my goal is to one day co-found a tech startup. Because of that, I’m intentionally seeking environments where I can grow as an engineer, but also develop strong product intuition, communication skills, ownership, and an understanding of how real-world systems and teams operate end to end. I’m excited by roles where I can contribute beyond my immediate scope, learn from experienced engineers and leaders, and steadily expand the skill set required to build and ship meaningful products.

At this stage of my life, I’m highly motivated, resilient, and ready to invest significant effort into growth. I’m looking for a team where ambition, curiosity, and craftsmanship are valued — and where I can bring the same level of commitment, energy, and care to the work.
