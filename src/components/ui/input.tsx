import React from 'react'

interface Props{
    placeholder? : string,
    type?: string,
    name:string
}



const Input = ({placeholder, type, name} : Props) => {
  return (
    <input  name={name} type={type} placeholder={placeholder } className='flex align-middle h-9 w-full rounded-md border-0 border-input bg-gray px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'/>
  )
}

export {Input}