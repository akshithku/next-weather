"use client";

import { people } from '@/app/utils/Icons';
import React from 'react';
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from '@/app/utils/misc';

function Population() {
  const {fiveDayForecast} = useGlobalContext();

  const city = fiveDayForecast?.city;

  if (!fiveDayForecast || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

//   console.log("city data", city);
//   console.log("data", fiveDayForecast);

  
  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {people} Population
        </h2>
        <p className='pt-4 text-2xl'>
            {formatNumber(city.population)}
        </p>
      </div>
      <p className='text-sm'>Latest UN population data for {city.name}.</p>
    </div>
  );
}

export default Population;
