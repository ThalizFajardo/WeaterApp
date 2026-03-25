
interface Props{
  month:string,
  year:number,
  weekDay:string,
  day:number
}

const SearchBar = ({month,year, weekDay, day}:Props) => {

  return (
    <div className="p-4 px-4 border-b  border-gray-600">
      <div>
        <p className="font-medium text-indigo-950 text-2xl">{month} {year}</p>
        <p className="font-medium text-gray-900 text-lg">{weekDay} , {month} {day} , {year}</p>
      </div>
      
    </div>
  );
};

export default SearchBar;
