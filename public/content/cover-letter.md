I’m writing to express my strong interest in systems and backend engineering roles (systems more), with a particular passion for working with **Rust** and **C/C++** though I'm of course open to other languages. **TS/JS** is atm my strongest language (tho I believe I understand Rust under the hood better). I love both software and hardware.

As a high-agency engineer, I’m ready to invest extra hours to accelerate my growth over the next few years. I want to strengthen my technical expertise while deliberately building leadership skills.

## Background

With 10 years of professional experience, I finished a specialized high school for gifted mathematicians (4.75/5) in Belgrade and graduated from Electronics at the University of Belgrade (9/10). I began as a silicon designer for two years before transitioning to software engineering in 2017. Limited opportunities in Serbia, financial constraints, double vision and necessary eye surgery prevented me from fully pursuing my goals. I wish I had been able to focus primarily on studying back then, but for years my main priority was regaining my vision, and becoming emotionally and mentally stronger, as life had challenged me from a very early age. Now, fully recovered, tremendously grateful, and ofc stronger than ever 💪, I’m laser-focused on advancing my engineering career. And maybe even completing a Master’s degree at a top university (or a PhD 😮). Or "just" becoming a super skilled software engineer ("distinguished" is a nice word and it's certainly a long journey, but probably one worth pursuing).

Much of my career focused on frontend (**Angular, React, Next.js, Svelte**), along with backend experience in **Node.js**. For the last two years at [Gel](https://www.geldata.com/) I built SDKs and AI solutions using TypeScript and Python as a tooling / AI engineer.

However, I’ve always gravitated toward low-level systems work where I can solve complex problems and optimize performance. A year ago, I committed fully to this path. Since then, I’ve dedicated myself to Rust and systems / BE engineering concepts. I really like electronics too.

## Recent Focus

- Practising algorithms and data structures almost daily. TBH, I don't like that my language of choice for now is JS as it lacks many data structures other languages have bulit-in. Nevertheless, I got comfy with heaps, treesets/maps, queues, deques etc...
- Completed the [Rust Book](https://rust-book.cs.brown.edu/), [Async Rust](https://rust-lang.github.io/async-book/intro.html),
and first 2 chapters of [Rust Atomics and Locks](https://marabos.nl/atomics/).
- Mara Bos's book is such a gem, but I realised in order to trully mentalise it I lack many other concepts which got me into "CS:APP" and "OSTEP". For the past few weeks, I’ve been trying to read these every morning for a few hours. I don’t really know how I ever called myself a software engineer before reading them. I guess ignorance is a double-edged sword.
- Before these I read [Designing Data-Intensive Applications (Kleppmann)](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321). Looking back, I wish I had read it after CS:APP and OSTEP. The good thing is that a new edition is ready and waiting for me. And, for anyone who doesn’t know, a refreshed CS:APP is also arriving in 2027.
- Explored a range of other topics (Postgres, Docker...) and realized I’d like to take a deeper dive into Linux someday.

## Exploration & Contributions

Researched [Meilisearch](https://www.meilisearch.com/), [Zed editor](https://zed.dev/), [SlateDB](https://slatedb.io/) projects and rust language itself. Created few minor PRs to Meili and Rust.

Researched Rust compiler internals, incremental compilation, autodiff, hierarchy of Sized traits... Paused this for now as I have to focus on finding a job.

## Key projects

**Node**: started building an [Instagram-like](https://github.com/diksipav/my-insta) app for fun. The goal is to gradually expand this project and make it increasingly production-ready while learning through practical decisions and trade-offs. Planned areas include session-based authentication, PostgreSQL for persistent data, media storage with Amazon S3 using multipart uploads and presigned URLs... I may implement performance-critical components in Rust. 

**Rust**: a small [priority auction marketplace for VM compute hours](https://github.com/diksipav/vmbid) where users can send HTTP requests to buy VM hours, and providers can send requests to sell resources. The system matches buyers with available supply, always prioritizing those willing to pay the highest price. It is designed to handle high concurrency, and if multiple buyers submit requests at the same price, the system serves them in the order their requests were received, using an atomic sequence counter to ensure fairness.

**Go**:[e-commerce-webhooks](https://github.com/diksipav/e-commerce-webhooks) is a webhooks delivery service, that allows merchants to subscribe to events happening in their store (e.g., orders, shipments). Merchants can register webhooks with a URL and a list of events they want to receive, and this service will deliver notifications to those URLs when the events occur.
