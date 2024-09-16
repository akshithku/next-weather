"use client";
import React from 'react';
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from '@/components/ui/skeleton';
import { sun } from '@/app/utils/Icons';
import { UvProgress } from '../UvProgress/UvProgress';

function Uvindex() {
    const context = useGlobalContext();

    const uvIndex = context?.uvIndex;

    if(!uvIndex || !uvIndex?.daily){
        return <Skeleton className="h-[12rem] w-full"/>
    }

    const daily = uvIndex;
    const uv_index_clear_sky_max = daily?.uv_index_clear_sky_max;
    // const uv_index_max = daily?.uv_index_max;
    const uv_index_max = daily;


    const uvIndexMax = uv_index_max?.daily?.uv_index_max[0].toFixed(0);

    // console.log("uv max", uvIndexMax);

    const uvIndexCategory = (uvIndex:number)=>{
        if(uvIndex <= 3){
            return{
                text:"Low",
                protection:"No protection required",
            }
        }else if (uvIndex <= 5) {
              return {
                text: "Moderate",
                protection: "Stay in shade near midday.",
              };
            } else if (uvIndex <= 7) {
              return {
                text: "High",
                protection: "Wear a hat and sunglasses.",
              };
            } else if (uvIndex <= 10) {
              return {
                text: "Very High",
                protection: "Apply sunscreen SPF 30+ every 2 hours.",
              };
            } else if (uvIndex > 10) {
              return {
                text: "Extreme",
                protection: "Avoid being outside.",
              };
            } else {
              return {
                text: "Extreme",
                protection: "Avoid being outside.",
              };
            }
    };

    const marginLeftPercentage = (uvIndexMax / 14) * 100;

  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
         <div className="top">
      <h2 className='flex items-center gap-2 font-medium'>{sun} Uv Index</h2>
    <div className='pt-4 flex flex-col gap-1'>
    <p className="text-2xl">
        {uvIndexMax}
        <span className='text-sm'>
            ({uvIndexCategory(uvIndexMax)?.text})
        </span>
      </p>
    </div>
      <UvProgress
      value={marginLeftPercentage}
      max={14}
      className='progress'
      />
        </div>
        <p className='text-sm'>{uvIndexCategory(uvIndexMax)?.protection}</p>
    </div>
  )
}

export default Uvindex