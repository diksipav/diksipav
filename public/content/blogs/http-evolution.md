---
id: 1a37b1f0-0017-11ea-9149-d386e8a6bfaa
title: HTTP evolution (part 1 - HTTP/1 & HTTP/2)
date: 2024-09-21
desc: Did you know that HTTP/3 is available? The majority of big browsers support it, and some big domains like Youtube, Facebook, Google, CNN already use it!
seoDesc: Explore the evolution of HTTP from its beginnings to HTTP/2 in this in-depth post. Learn about the key differences, improvements, and how these protocols impact web performance.
tags: '#software #computer-networking'
---

![HTTP Evolution Hero Image](/http-evolution.png)

Did you know that HTTP/3 is available? The majority of big browsers support it, and some big domains like Youtube, Facebook, Google, CNN already use it! You can check it yourself [here](https://http3check.net/). 🎉 🎉

## Intro (for novices)

`HTTP (HyperText Transfer Protocol)` is the underlying protocol of the `World Wide Web`. 
It represents the foundational set of rules and standards that allows communication 
between web browsers (clients) and web servers. HTTP (together with lower network protocols) is 
what makes it possible for you to click on a link or enter a URL in your browser 
and have the content from a web server displayed on your screen.

#### TCP (Transmission Control Protocol)

`TCP` operates at the `Transport layer` (Layer 4) of the OSI model. It promises 
guaranteed delivery of messages it gets from the layer above to the destination.
TCP also breaks long messages it receives into shorter segments and provides a congestion-control 
mechanism. But, a downside is that every TCP connection requires a `three-way handshake` - 
a process used to establish a reliable connection between a client and a server 
before data transmission begins. We will see in the next blog post how HTTP/3, 
built on the `QUIC` protocol, eliminates the 3-way handshake entirely by using 
a connection establishment process that requires only a single round-trip.

## HTTP/1.0 

`HTTP/1` was introduced in 1996. Before that, there was `HTTP/0.9` - a simple protocol 
that only supported GET method and had no headers or status codes. And it was 
possible to transfer only HTML. **HTTP/1.0 added headers, status codes, and additional methods (POST and HEAD).**


In HTTP/1 every request to the same server required a separate TCP connection.
Which meant that every HTTP request triggered a TCP three-way handshake which is a time-consuming task. 
If a web page contained multiple resources that have to be fetched (css, images, js), 
a new connection was needed for every resource (per every request). 
Browsers were designed to improve this a bit by opening couple concurrent connections,
but in order to not overload the server or network, there's a limit of parallel 
TCP connections a browser can establish per domain. This limit is usually **6**.

## HTTP/1.1

HTTP/1.1 was published in 1997 and people usually refer to it when talking about HTTP/1.
It brought many improvements.

### Persistent connections 

In HTTP/1.1 a TCP connection can be reused to execute several HTTP requests. 
This improved performance because it decreases the number of 3-way-handshakes. But, the 
limit of 6 concurrent connections was still there. 

![Multiple vs Persistent connection](/multiple_vs_persistent.png)

### Pipelining 

HTTP/1.1 also introduced pipelining which allowed clients to send multiple requests over a single TCP connection without 
waiting for each response. For example, when the browser sees that it 
needs two images to render a web page, it can request them one after the other. 
Pipelining further improved performance by reducing latency for each response, but was limited by `HOL(head-of-line)` 
blocking. This issue is where handling a later request is blocked by one slow or blocked earlier response. 
Besides this, pipelining required special server and proxy support which was tricky to implement.
Because of all of this some browsers never implemented it and other disabled it by 
default after some time due to issues with compatibility and performance. 

![Pipelining](/pipelining.png)

#### Head-of-Line (HOL) Blocking

An issue that occurs when multiple requests are queued over a single TCP connection. 
If a single request in a pipeline takes longer to be processed by the server, it 
delays the processing of all subsequent requests, because responses needed to come in order.

The problem can also occur at the TCP layer, where packets are transmitted in 
order and must be reassembled correctly. If a packet is lost or arrives out of
order, all subsequent packets are held up until the missing packet is retransmitted and received, causing delays.

### Caching and Conditional Requests

HTTP/1.1 added the `Cache-Control` header which provides more fine-grained control 
over caching compared to the `Expires` header used in HTTP/1.0.
It also added `ETags (Entity Tags)` - unique identifiers assigned to specific 
versions of a resource (eg. if a file content changes, the etag also changes). 

Conditional requests, using headers like `If-Modified-Since` (was available in 1.0) and `If-None-Match` (added in 1.1), 
enabled clients to request resources only if they had been modified since a 
previous request, saving bandwidth and improving performance. 

When a browser caches a resource with an `ETag`, it can later use this ETag in an `If-None-Match`
request header to ask the server if the resource has changed. If the resource 
is unchanged, the server responds with a `304 Not Modified` status, otherwise 
the server sends the new version with an updated Etag. Conditional requests using 
Etags are better than only using the `max-age` header, because with the latter it can happen that
the browser still uses the old version of the resource even though it has changed on the server.

### Chunked Transfer Encoding

In HTTP/1.0, the `Content-Length` header was commonly used to tell the client 
how much data to expect in the response. Without this header, the client wouldn't 
know where the response body ended, which could cause issues with processing the response correctly.

HTTP/1.1 introduced `Chunked Transfer Encoding`, which is a method for sending 
data in chunks rather than requiring the entire response to be sent in one go. 
Each chunk is preceded by its size in bytes. The response ends with a zero-length chunk, 
signaling the end of the data. This method allows the server to begin transmitting 
data immediately, even if the total size is not known yet, improving efficiency for certain types of content, eg.
streaming large amounts of data, or dynamic content generation where the total 
content size is not known at the start of the response.

### More HTTP methods

New HTTP methods were added: PUT, PATCH, DELETE, CONNECT, TRACE, and OPTIONS.
Besides methods HTTP/1.1 also introduced new status codes.

### Host Header 

HTTP/1.1 introduced the requirement for the `Host` header in requests, which 
specifies the target domain name. This allowed multiple domains and subdomains 
to be hosted on a single IP address, enabling servers to efficiently manage and 
serve multiple websites from the same address. This led to `virtual hosting` 
which is commonly used by hosting providers.

#### Domain Sharding

This is not a feature but a technique that was used to increase number of concurrent opened connections.
By using multiple domains or subdomains, you can increase the number of simultaneous connections, 
allowing more resources to be downloaded in parallel. For example websites can 
serve static assets such as images, CSS, and JavaScript from subdomains and serve them in parallel. 

Despite the improvements introduced in HTTP/1.1, there were still many areas for 
enhancement. Some of the "issues" were TCP's 3-way-handshake, limited parallelism 
due to browsers limiting connections per domain, HTTP/1's text-based protocol and verbose headers,
TCP's slow start algorithm...

#### TCP's slow start algorithm

[TCP slow start](https://developer.mozilla.org/en-US/docs/Glossary/TCP_slow_start) is a 
congestion control mechanism used in TCP to manage the amount of data 
sent over a network. It is designed to prevent network congestion by gradually 
increasing the data transmission rate until network capacity is reached. But 
even though it is effective in general it has some 
[limitations](https://www.sciencedirect.com/science/article/pii/S1319157812000146).

## HTTP/2

In 2015, `HTTP/2` was launched to address some performance problems of HTTP/1 (HTTP/1.1).

### Binary Protocol

HTTP/1 sends messages in plain-text format, while HTTP/2 encodes them in binary format.  
Binary data is easier and faster for computers to parse compared to text, and is less 
Binary protocols are less prone to errors and ambiguities that can arise from text-based protocols.


HTTP/2 introduces the concept of `frames` and `streams`. In HTTP/2, messages are 
divided into smaller units called frames. Specifically, the Data and Header 
sections of a HTTP request or response are split into different frames — `Data frames` 
and `Header frames`. Each frame is associated with a specific stream, which represents 
a single request-response pair. By splitting the message into frames, HTTP/2 enables more efficient processing and multiplexing of requests and responses. 
Multiple frames from different streams (requests) can be sent over the same TCP connection, allowing for concurrent data transmission.
Every frame contains a stream identifier in its header which helps the client reassemble the data.

### Multiplexing

Multiplexing in HTTP/2 is a key feature that allows multiple requests and responses 
to be sent concurrently over a single TCP connection. With multiplexing, frames from 
multiple streams can be interleaved and sent over the same TCP connection. This 
means that the client and server can simultaneously handle multiple requests and 
responses without waiting for one to complete before starting another. This
eliminates head-of-line blocking and significantly improves performance.

### Stream prioritization

HTTP/2 allows clients to assign priority levels to different streams. This is 
done to indicate which requests should be processed first. Prioritization helps 
the server decide the order in which to allocate resources and send responses, 
which can impact the perceived performance of a web page. With default multiplexing 
responses can come in any order which is often not optimal for the client. For example, 
if the server sends a large image before the main stylesheet, 
the page might appear unstyled for a while, leading to a slower perceived load time.

### Header compression

In HTTP/1.1, only the main data (body) of the HTTP message was typically compressed, 
while headers were not. This was partly because headers were relatively small, and 
the performance gains from compressing them were not considered significant at the 
time. However, with the modern web's increased complexity and the growing size of 
headers and their repetition, the need to reduce even this part of data transfer became apparent.
HTTP/2 uses [HPACK](https://datatracker.ietf.org/doc/html/rfc7541) compression algorithm to reduce the size of HTTP headers. 
Headers are compressed and sent in a more efficient format avoiding repetition. 

### Server Push

Server Push in HTTP/2 is a feature that allows the server to send resources to 
the client proactively, without the client explicitly requesting them. This can 
improve the performance of web applications by reducing the number of round-trip 
requests needed to load a webpage. The server can anticipate which resources the client 
will need  based on the initial request and sends them in advance. For example 
when the client asks for a HTML page, the server can also send CSS, JS and image files it knows are needed for that page.

### Challenges with HTTP/2

Most challenges and limitations of HTTP/2 are connected with the TCP layer:
- `HOL` blocking is still happening at the TCP level. If a single packet is lost in 
a TCP connection, all streams using that connection are blocked until the 
missing packet is retransmitted and received.
- `Three-way handshake` and `slow start algorithm` impacts performance in scenarios when low latency is crucial.
- TCP connections are bound to specific IP addresses, so when a client's IP changes 
(e.g., switching from Wi-Fi to cellular), it can cause dropped connections and 
delays due to the need to re-establish the connection.
- Modern networks (wireless) have different 
characteristics compared to the traditional wired networks for which TCP was 
originally designed. HTTP/2's reliance on TCP makes it harder to optimize for 
these newer environments, where latency and packet loss are more common.


##### References and resources

  - [ByteByteGo HTTP deep dive](https://blog.bytebytego.com/p/http1-vs-http2-vs-http3-a-deep-dive)
  - [Swadhin Pattnaik: HTTP evolution](https://www.linkedin.com/pulse/http-10-vs-11-20-30-swadhin-pattnaik/)
  - [MDN: Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)
  - WWW and endless conversations with GPT. 💪🏽💪🏽

---

Need a ☕ now. Stay tuned for the next post on HTTP/3 and QUIC! 🚀 