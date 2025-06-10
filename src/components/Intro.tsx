import profileImage from "@/assets/images/portfolio.jpg";

const Intro = () => {
  return (
    <div className="grid-area-intro flex flex-col items-center">
      <img
        src={profileImage}
        alt="Dijana Pavlovic profile image"
        className="w-[180px] xxxl:w-[200px] h-[180px] xxxl:h-[200px] rounded-full bg-pink-400 my-12 mx-6 shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Software Engineer
      </h1>
      <p className="text-lg text-muted-foreground mb-1">
        Hi, I'm a software engineer and digital nomad from Serbia.
      </p>
      <p className="text-lg text-muted-foreground mb-4">
        Former (maybe future) electronics engineer.
      </p>
      <p className="text-lg text-muted-foreground mb-4">
        This is where I share my insights on software, AI, and tech.
      </p>
      <p className="text-lg text-muted-foreground mb-1">
        I enjoy immersing myself in nature & doing outdoorsy stuff.
      </p>
      <p className="text-lg text-muted-foreground mb-1">
        I LOVE to code, read, and make impossible possible.
      </p>
    </div>
  );
};

export default Intro;
