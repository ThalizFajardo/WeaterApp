import React from "react";
import Card from "./ui/card";
import type { WeatherData } from "./weather";
import { Wind, Waves, Eye } from "lucide-react";

interface Props {
  data: WeatherData | null;
}

const OverviewTable = ({ data }: Props) => {
  return (
    <>
     
        <div className="relative z-10">
            <div className="py-4 p-3">
              <h2 className="font-normal text-2xl ">Today overview </h2>
            </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <Card
              title="Wind Speed"
              icon={<Wind />}
              value={`${data?.wind.speed} km/H`}
            />
            <Card
              title="Visibility"
              icon={<Eye />}
              value={ data ? `${data?.visibility / 1000} km` : ''}
            />
            <Card
              title="Pressure"
              icon={<Waves />}
              value={`${data?.main.pressure} hpa`}
            />
          </div>
        </div>

    </>
  );
};

export default OverviewTable;
