/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from '@/app/utils/Icons';
import { KelvinToCelsius } from '@/app/utils/misc';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

function Temperature() {
  // const forecast = useGlobalContext();

  // const weather = forecast;
  // const main = forecast;
  // const timezone = forecast;
  // const name = forecast;

  // const mainTemp = forecast?.main?.temp; // Assuming forecast.main.temp is the temperature in Kelvin

  // // Check if mainTemp is a number before using it
  // const tempCelsius = mainTemp !== undefined ? KelvinToCelsius(mainTemp) : null;


  // console.log(tempCelsius);

  // if(!forecast || ! weather){ 
  //   return <div>Loading.....</div>;
  // }
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const context = useGlobalContext();

  useEffect(()=>{
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone/60);
      const formatedTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    },1000);
  },[])

  const forecast = context?.forecast;
  const main = forecast?.main;
  const weather = forecast?.weather;
  const timezone = forecast?.timezone;
  const name = forecast?.name;

  if (!forecast || !weather) { 
    return <div>Loading.....</div>;
  }
  const mainTemp = main?.temp;
  const min_Temp = main?.temp_min;
  const max_Temp = main?.temp_max;

  const temp= mainTemp !== undefined ? KelvinToCelsius(mainTemp) : null;
  const minTmep= min_Temp !== undefined ? KelvinToCelsius(min_Temp) : null;
  const maxTemp= max_Temp !== undefined ? KelvinToCelsius(max_Temp) : null;

  const{main:weatherMain, description}=weather[0];


  const getIcon = () =>{
    switch(weatherMain){
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

 

  return (
    <div 
    className="pt-6 pb-5 px-4 border rounded-lg flex flex-col
     justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
     >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
      <span className="">{name}</span>
      <span className="">{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTmep}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
      </div>
  )
}

export default Temperature
