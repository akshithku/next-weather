"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { sunset } from "@/app/utils/Icons";
import { unixToTime } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Sunset() {
    const context = useGlobalContext();

    const sundata = context?.forecast;
    // console.log("sundata: ", sundata );
    if(!sundata || !sundata?.sys || !sundata?.sys?.sunset){
        return <Skeleton className="h-[12rem] w-full"/>
    }

    const times = sundata?.sys?.sunset;
    const timezone = sundata?.timezone;

    
    const sunsetTime = unixToTime(times,timezone);
    const sunrise = unixToTime(sundata?.sys?.sunrise, timezone);

    // console.log("sunrise: ", sunrise);
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
        <div className="top">
      <h2 className='flex items-center gap-2 font-medium'>{sunset}Sunset</h2>
      <p className="pt-4 text-2xl">{sunsetTime}</p>
        </div>
        <p className='text-sm'>Sunrise: {sunrise}</p>
    </div>
  );
}

export default Sunset;
