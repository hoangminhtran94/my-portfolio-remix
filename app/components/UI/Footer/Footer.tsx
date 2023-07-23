const Footer = () => {
  return (
    <footer className="py-[30px] flex flex-col items-center gap-3  tracking-widest text-white">
      <p className=" text-[16px] drop-shadow-blue-around">
        Developed by Minh Hoang Tran.
      </p>
      <p className="text-center font-bold text-[16px] drop-shadow-blue-around">
        Powered by:
      </p>
      <div>
        <div className="flex gap-5 md:gap-10 justify-center items-center flex-wrap ">
          <a
            className="hover:scale-105 transition-all"
            href="https://www.figma.com"
            target="_blank"
            rel="noreferrer"
            title="Learn more about Figma"
          >
            <img
              className="h-[40px] w-auto object-contain"
              src="/images/figma.svg"
              alt="figma"
            />
          </a>
          <a
            className="hover:scale-105 transition-all"
            href="https://remix.run"
            target="_blank"
            rel="noreferrer"
            title="Learn more about Remix"
          >
            <img
              className="h-[30px] w-auto object-contain"
              src="/images/remix.svg"
              alt="remix"
            />
          </a>

          <a
            className="hover:scale-105 transition-all"
            href="https://www.mongodb.com"
            target="_blank"
            rel="noreferrer"
            title="Learn more about MongoDB"
          >
            <img
              className="h-[60px] w-auto object-contain"
              src="/images/mongodb.svg"
              alt="mongodb"
            />
          </a>
          <a
            className="hover:scale-105 transition-all"
            href="https://www.prisma.io"
            target="_blank"
            rel="noreferrer"
            title="Learn more about Prisma"
          >
            <img
              className="h-[40px] w-auto object-contain"
              src="/images/prisma.svg"
              alt="prisma"
            />
          </a>
          <a
            className="hover:scale-105 transition-all"
            href="https://nodejs.org/en"
            target="_blank"
            rel="noreferrer"
            title="Learn more about Nodejs"
          >
            <img
              className="h-[40px] w-auto object-contain"
              src="/images/nodejs.svg"
              alt="nodejs"
            />
          </a>
          <a
            className="hover:scale-105 transition-all"
            href="https://www.netlify.com"
            target="_blank"
            rel="noreferrer"
            title="Learn more about Netlify"
          >
            <img
              src="/images/netlify.svg"
              alt="netlify"
              className="h-[40px] w-auto object-contain"
            />
          </a>

          <a
            className="hover:scale-105 transition-all"
            href="https://cloudinary.com"
            target="_blank"
            rel="noreferrer"
            title="Learn more about Cloudinary"
          >
            <img
              src="/images/cloudinary.svg"
              alt="cloudinary"
              className="h-[40px] w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
