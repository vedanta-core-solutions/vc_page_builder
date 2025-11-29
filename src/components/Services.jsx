"use client";
import { useConfig } from "../context/ConfigProviderClient";

export default function Services() {
  const config = useConfig();
  console.log(config);
  if (!config) {
    return null;
  }
  const { content, themeForBiz } = config;
  return (
    <>
      <div
        style={{
          fontFamily: themeForBiz.font,
          background: themeForBiz.colors.background,
        }}
        className="flex flex-col justify-center items-center py-6"
      >
        {content?.services?.top_heading.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center my-7 space-y-2 text-center"
          >
            <h1 className="text-2xl capitalize">{item.h_1}</h1>
            <p className="text-sm max-w-xl px-4">{item.text}</p>
          </div>
        ))}

        {/* Cards Section */}
        <div className="w-full space-y-10 max-w-7xl px-4">
          {content?.services?.cards.map((item, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row justify-center items-center lg:space-x-10 space-y-6 lg:space-y-0 w-full"
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/3 flex items-center justify-center">
                <img
                  key={i}
                  src={item.img}
                  alt="img"
                  className="rounded-lg shadow-xl hover:shadow-amber-500 duration-700 w-full max-w-xs lg:max-w-sm object-cover hover:rotate-z-6 hover:rotate-x-12"
                />
              </div>

              {/* Text Section */}
              <div
                className="w-full lg:w-2/3 rounded-3xl shadow-xl border-b-2 border-b-red-200 px-6 py-5"
              >
                <div className="space-y-3.5">
                  <h1 className="text-xl md:text-2xl font-semibold">
                    {item.h_1}
                  </h1>
                  <p>{item.para}</p>

                  <button className="bg-amber-400 px-5 py-2 rounded-lg shadow-xl hover:shadow-amber-100 hover:bg-amber-500 hover:translate-y-1 duration-500">
                    {item.btn}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
