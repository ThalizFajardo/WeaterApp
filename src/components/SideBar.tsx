
import Card from "./ui/card";
import type { WeatherData } from "./weather";
import {Sun, Sunrise} from 'lucide-react'


interface Props {
  data: WeatherData | null;
  hora:string
}

const SideBar = ({ data, hora }: Props) => {
 
const temperature = data ? Math.round(data.main.temp - 273.15) : ""




const iconUrl  =  data?.weather?.[0]?.icon
  ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  : ""

const sunset = data
  ? new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  : "";

  const sunrise = data
  ? new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  : ""
  
  return (
    <>
      <div className="text-white ">
        <div className="p-3 text-white border-b-2">
          <div className="py-4 grid grid-cols-2">
            <div>
              <h2 className="text-2xl">{data?.name},  {data?.sys.country}</h2>
            </div>
            <div className="pl-20 text-lg">
              <p>{hora}</p>
            </div>
          </div>
          <div className="py-4 grid grid-cols-2">
            <div className="flex flex-col">
             {iconUrl ? <img className="w-20" src={iconUrl} alt="weatherIcon"/> : ""} 
              <span className="text-4xl"> {temperature} °C </span> 
            
            </div>
            <div>
              <p className="text-2xl  py-10">{data?.weather[0].description}</p>
            </div>
          </div>
        </div>
        <div className=" p-3">
          <h3 className="text-lg">Sunrise & Sunset</h3>
          <Card title="Sunrise" icon={<Sun/>} value={sunrise}/>
          <Card title="Sunset" icon={<Sunrise/>} value={sunset}/>
        </div>
      </div>
    </>
  );
};

export default SideBar;
