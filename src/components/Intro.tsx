import profileImage from "@/assets/images/portfolio.jpg";
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from "./icons";

const Intro = () => {
  const socialLinks = [
    {
      href: "https://github.com/diksipav",
      icon: GithubIcon,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/diksipav/",
      icon: LinkedinIcon,
      label: "LinkedIn",
    },
    {
      href: "https://x.com/diksipav",
      icon: XIcon,
      label: "X (Twitter)",
    },
    {
      href: "https://www.instagram.com/diksipav/",
      icon: InstagramIcon,
      label: "Instagram",
    },
  ];

  return (
    <div className="flex flex-col items-center text-center lg:text-left">
      <img
        src={profileImage}
        alt="Dijana Pavlovic profile image"
        className="w-[180px] h-[180px] rounded-full mb-8 shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]"
      />

      <div className="mb-4">
        <p className="text-lg text-muted-foreground mb-2">
          Hi, I'm a <span className="text-primary">software engineer</span> &
          digital nomad from Serbia.
        </p>
        <p className="text-lg text-muted-foreground mb-4">
          Former (maybe future) electronics engineer.
        </p>
        <p className="text-lg text-muted-foreground mb-4">
          This is where I share my insights on{" "}
          <span className="text-primary">software</span>,{" "}
          <span className="text-primary">AI</span>, and{" "}
          <span className="text-primary">tech</span>.
        </p>
        <p className="text-lg text-muted-foreground mb-2">
          I enjoy immersing myself in nature & doing outdoorsy stuff.
        </p>
        <p className="text-lg text-muted-foreground">
          I LOVE to read, & sometimes I draw.
        </p>
      </div>

      {/* Social Links */}
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label={social.label}
          >
            <social.icon />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Intro;
