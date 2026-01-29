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
    <div className="flex flex-col items-center lg:text-left">
      <img
        src={profileImage.src}
        alt="Dijana Pavlovic profile image"
        className="w-[180px] h-[180px] rounded-full mb-8 shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] sm:ml-6"
      />

      <div className="mb-4 text-center">
        <h1 className="mx-auto">Software Engineer</h1>
        <p className="text-md mb-4">
          Former (and maybe future) electronics engineer.
        </p>
        <p className="text-md mb-4">Endlessly curious.</p>
        <p className="text-md  mb-4">
          Here, I share my software journey and my insights on all things{" "}
          <span className="text-primary">tech</span>.
        </p>
        <p className="text-md mb-4">
          I love nature and anything that gets me outside.
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
            className="text-muted-foreground hover:text-muted-foreground border-none hover:border-none hover:opacity-80 transition-all"
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
