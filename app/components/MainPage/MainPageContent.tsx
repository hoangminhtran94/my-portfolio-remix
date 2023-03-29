const MainPageContent = () => {
  return (
    <div className="flex justify-center">
      <div>
        <h1 className="tracking-wide text-[#b3445e] mb-[20px]">This is me!!</h1>
        <span>
          <svg
            height="200px"
            width="200px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 511.997 511.997"
            xmlSpace="preserve"
            fill="#000000"
            transform="rotate(270)matrix(-1, 0, 0, 1, 0, 0)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M468.705,258.685l-59.411,59.408c-9.927-101.077-84.793-188.359-189.37-209.161 c-76.978-15.308-156.364,8.462-212.356,63.594c-9.979,9.829-10.106,25.884-0.277,35.867c9.823,9.977,25.881,10.108,35.867,0.277 c44.008-43.332,106.393-62.02,166.871-49.988c82.622,16.434,141.641,85.686,148.91,165.66l-65.664-65.662 c-9.903-9.905-25.962-9.905-35.867,0c-9.905,9.905-9.905,25.962,0,35.867l105.649,105.647c4.952,4.952,11.443,7.429,17.933,7.429 c6.489,0,12.982-2.475,17.934-7.429L504.568,294.55c9.905-9.903,9.905-25.962,0-35.867 C494.669,248.78,478.61,248.78,468.705,258.685z"></path>
            </g>
          </svg>
        </span>
      </div>
      <div>
        <img
          className="w-[400px] max-h-[400px] object-cover  rounded-full shadow-lg "
          src="images/main-banner-image.jpg"
          alt="main-banner"
        />
      </div>
    </div>
  );
};
export default MainPageContent;
