import React from "react";

interface Props {
  title: string,
  icon:React.ReactNode,
  value:string
}

const Card = ({ title,icon, value }: Props) => {
  return (
    <>
    <div title={title} className="border border-gray-300  m-2 p-4 grid grid-cols-[1fr_3fr_2fr]">
      <div className="">
        {icon} 
      </div>
      <div>
        <h4 className="text-white">{title}</h4>
        <p className="text-gray-950 text-lg font-medium">{value}</p>
      </div>
    </div>
    </>
  );
};

export default Card;
