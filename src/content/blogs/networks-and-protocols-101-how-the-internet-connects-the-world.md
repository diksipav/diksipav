---
id: 2a37b1f0-0017-11ea-9149-d386e8a6bfaa
title: Networks and protocols 101 — how the Internet connects the world
date: 2024-09-15
desc: This post is the first in a series exploring the Internet and some networking protocols. In this introduction, we'll define what the Internet is, who its members are, and how they communicate with one another.
seoDesc: This post explains what is the Internet, who are its members, and how they communicate between each other. 
tags: '#software #computer-networking'
---

![Computer networks](/networks-and-protocols.png)

This post is the first in a series exploring the Internet and some networking protocols. In this introduction, we'll define what the Internet is, who its members are, and how they communicate with one another.

As you probably know, the `Internet` is a vast network of interconnected computers and other devices that function seamlessly across geographical and political boundaries, enabling global communication and data exchange. The Internet is also `a network of networks`, because it consists of countless smaller networks (home networks, corporate networks...) that are interconnected to form a larger global network.

Data flows between its `end-systems` (computers, smartphones, tablets, and various `IoT` devices like cars, watches, and home appliances) through `communication links`, which are the physical or wireless connections between devices. These links are made from different mediums, each with unique characteristics. `Physical (wired) links` include copper wire, coaxial cable, optical fiber, and hybrid fiber-coaxial (HFC), a combination of fiber-optic and coaxial cables. `Wireless links` include radio waves (Wi-Fi), cellular networks (4G, 5G), and satellite links. The speed at which each link transmits data varies and is measured in `bits per second`.

Communication links are connected by devices called `packet switches`. A packet switch takes a packet arriving on one of its incoming communication links and forwards that packet on one of its outgoing communication links. Two of the most prominent types of packet switches in today's Internet are `routers` and `link-layer switches`.

A link-layer switch connects multiple devices (such as computers and printers) within the same `local area network (LAN)`. It is used primarily in wired networks, enabling devices within a localized area — like a home, office, or school — to communicate with each other.

A router, on the other hand, connects different networks and is responsible for routing data between them. A router connects your home network (LAN) to the broader Internet. Routers manage both wired and wireless connections, and most modern routers include built-in switch capabilities. This means they can perform the role of a switch within a home or small office network, which is why separate switches are not as commonly seen in home networks today.

![Internet and its members](/internet-members.png)
*Internet and its members*

Devices must first connect to the Internet before they can send or receive data. An `ISP (Internet Service Provider)` is a company that provides individuals, businesses, and other organizations with Internet access. ISPs allow customers to connect to the global Internet through various technologies like DSL, cable, fiber optics, wireless, satellite, or mobile networks.

To bring the Internet into your home, a `modem` (short for modulator-demodulator) is required. The modem translates the analog or light signals from your ISP into digital data that your home devices can understand. However, a modem alone can connect only one device to the Internet. That's where a router comes in. Since most households have multiple devices that need Internet access, the router connects to the modem to distribute the Internet connection to multiple devices, both wired and wireless. Nowadays, modems and routers are often combined into a single device, commonly referred to as a `gateway`, which simplifies the setup and handles both functions.

To ensure smooth communication between end-systems, packet switches, and other members of the Internet, all of them must **"speak the same language"**. This is where `protocols` come in. Protocols are sets of rules that control the sending and receiving of data across the Internet. They determine the format, timing, sequencing, and error-checking methods used during communication between devices, ensuring that the data is sent and received accurately.

There are many different protocols, and each protocol has a specific responsibility. They work together in a layered structure known as `protocol layering`. The idea is to break down the complex process of transmitting data between two devices into smaller, manageable tasks, where each layer handles a specific function.

There are two widely recognized models that describe how protocol layering works: the [TCP/IP](https://www.fortinet.com/resources/cyberglossary/tcp-ip) model which has four layers, and the [OSI (Open Systems Interconnection)](https://aws.amazon.com/what-is/osi-model/) model, which consists of seven layers. In both models, data moves from the application layer (where users interact with applications) down to the physical layer (where bits are transmitted as signals — whether electrical, optical or radio frequency). It then travels across the network to the destination device, where the process is reversed, moving data back up through the layers.

Moving "up/down" through the layers is just a metaphor that helps describing order of operations. The terms "up" and "down" are used because the `OSI` and `TCP/IP` models are often represented graphically as vertical stacks of layers, with the `Application Layer` at the top and the `Physical Layer` at the bottom.

![Transmission of data on the Internet through protocol layers](/protocol-layers.png)
*Transmission of data on the Internet through protocol layers*

The diagram above illustrates how data flows through protocol layers. On the sending side, each layer adds its own header to the package it receives from the layer above it. These headers are then used by the corresponding layers on the receiving side to interpret and process the data properly.

You can also see how routers and link-layer switches do not implement all of the layers in the protocol stack. Which means that they do not process the entire range of tasks across all layers of the network model. They only handle the tasks and responsibilities associated with the first few bottom layers. A Link-layer switch operates at the `data link layer` (Layer 2) of the OSI model. It connects devices within a local area network (LAN) and forwards data frames based on `MAC` (Media Access Control) addresses. A MAC address is a unique identifier assigned to a network interface of the device (the hardware or software component that connects a device to a network, like a Wi-Fi card or Ethernet port) for communication within a local network.

A Router operates at the `network layer` (Layer 3) of the OSI model. It routes data packets between different networks based on `IP` addresses. IP (Internet Protocol) address is an address that identifies a device on a network (either local or global) for routing data between networks. So data-link layer uses MAC addresses for local communication between devices on the same network. And network layer uses IP addresses for global communication across multiple networks.

This will be all for now, stay tuned for the next post in this series, where we'll take a closer look at the `TCP/IP` model to better understand responsibilities of each of its layers. 🚀

---

I'd like to acknowledge the invaluable resource — [Computer Networking: A Top-Down Approach](https://www.amazon.com/Computer-Networking-Top-Down-Approach-7th/dp/0133594149) book by James Kurose and Keith Ross, which provides clear and comprehensive explanations of the Internet and its underlying protocols. The diagrams in this post are taken from this book.

And I want to thank my amazing colleague and friend, [James](https://github.com/jaclarke), for always taking the time to read my posts and provide great feedback. 🚀
