import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import type { WeatherData } from "../components/weather";
import SideBar from "../components/SideBar";
import OverviewTable from "../components/OverviewTable";
import SearchBar from "../components/SearchBar";
import defaultVideo from "../assets/279623_medium.mp4";
import clearSkyVideo from "../assets/158384-816637349_medium.mp4";
import brokenCloudsVideo from "../assets/278750_medium.mp4";
import rainVideo from "../assets/151629-801075780_medium.mp4";
import thunderstormVideo from "../assets/129904-745930548_medium.mp4";
import snowVideo from "../assets/29314-374760999_medium.mp4";
import mistVideo from "../assets/164360-830461265_medium.mp4";

const DashBoard = () => {

  const [data, setData] = useState<WeatherData | null>();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  type wheaterDescription =
    | ""
    | "clear sky"
    | "few clouds"
    | "scattered clouds"
    | "broken clouds"
    | "shower rain"
    | "rain"
    | "thunderstorm"
    | "snow"
    | "mist";

  const wheatherVideos: Record<wheaterDescription, string> = {
    "": defaultVideo,
    "clear sky": clearSkyVideo,
    "few clouds": clearSkyVideo,
    "scattered clouds": clearSkyVideo,
    "broken clouds": brokenCloudsVideo,
    "shower rain": rainVideo,
    rain: rainVideo,
    thunderstorm: thunderstormVideo,
    snow: snowVideo,
    mist: mistVideo,
  };

  const [date, setDate] = useState<Date>(new Date());
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const weekDay = weekDays[date.getDay()];
  const day = date.getDay();
  const hora =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const success = (pos : any) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const APIKey = "99c5b4521134966e5c2d3bf620bdd0ba";

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`,
        )
        .then((res) => {
          setData(res.data); //geting info from api...
        });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

 
  return (
    <div className="">
      {data ? (
        <div className="overflow-hidden ">
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src={
        wheatherVideos[
          data.weather[0].description as wheaterDescription
        ] ?? defaultVideo
      }
              type="video/mp4"
            />
          </video>
          <div className="mx-auto my-24 max-w-screen-xl h-full w-full rounded-md border border-white/20 bg-white/10 backdrop-blur-md ">
            <div className="grid  lg:grid-cols-[3fr_2fr]  md:gris-cols-2 sm:grid-cols-1  gap-4">
              <div className="w-full ">
                <SearchBar
                  month={month}
                  year={year}
                  weekDay={weekDay}
                  day={day}
                />
                <OverviewTable data={data} />
              </div>
              <div className="bg-gradient-to-r from-slate-500 to-slate-800">
                <SideBar data={data} hora={hora} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div role="status" className="min-h-screen flex items-center justify-center bg-slate-900">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
