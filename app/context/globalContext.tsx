// "use client";

// import axios from 'axios';
// import React, { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';

// // Define interfaces for the data
// interface MainData {
//   temp: number;
//   feels_like: number;
//   temp_min: number;
//   temp_max: number;
//   pressure: number;
//   humidity: number;
// }

// interface ForecastData {
//   main: MainData;
//   [key: string]: any;
// }

// interface AirQualityData {
//     pm25: number;
//     pm10: number;
//     [key: string]: any;
//   }

//   interface FiveDayForecastData {
//     list: Array<any>; 
//     [key: string]: any;
//   }

//   interface UvIndexData {
//     value: number;
//     date_iso: string;
//     [key: string]: any;
//   }
//   interface GlobalContextType {
//     forecast: ForecastData | undefined;
//     airQuality: AirQualityData | undefined;
//     fiveDayForecast: FiveDayForecastData | undefined;
//     uvIndex: UvIndexData | undefined;
//   }
  

// const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
// const GlobalContextUpdate = createContext<Dispatch<SetStateAction<ForecastData | undefined>> | undefined>(undefined);

// interface GlobalContextProviderProps {
//   children: ReactNode;
// }

// const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
//     const [forecast, setForecast] = useState<ForecastData | undefined>(undefined);
//     const [airQuality, setAirQuality] = useState<AirQualityData | undefined>(undefined);
//     const [fiveDayForecast, setFiveDayForecast] = useState<FiveDayForecastData | undefined>(undefined);
//     const [uvIndex, setUvIndex] = useState<UvIndexData | undefined>(undefined); 



//     const fetchForecast = async () => {
//         try {
//             const res = await axios.get("api/weather");
//             // console.log("res", res.data);
//             setForecast(res.data);
//         } catch (error) {
//             console.log("Error fetching forecast data: ", error);
//         }
//     }

//     const fetchAirQuality = async ()=>{
//         try {
//             const res = await axios.get("api/pollution");
//             // console.log("air data",res.data);
//             setAirQuality(res.data)
//         } catch (error) {
//             console.log("Error fetching air quality data: ", error);
//         }
//     }

//     const fetchfiveDayForecast= async()=>{
//         try {
//             const res = await axios.get('api/fiveday');
//             // console.log("five day forecast dat:: ", res.data);
//             setFiveDayForecast(res.data);
//         } catch (error) {
//             console.log("Error fetching five day forecast data: ", error);
//         }
//     }

//     const fetchUvIndex = async()=>{
//         try {
//             const res = await axios.get('/api/uv');
//             setUvIndex(res.data);
//             // console.log("UV Index", res.data);
//         }catch(error){
//             console.log("Error fetching the forecast:",error);
//         }
//     }

//     useEffect(() => {
//         fetchForecast();
//         fetchAirQuality();
//         fetchfiveDayForecast();
//         fetchUvIndex();
//     }, []);

//     return (
//         <GlobalContext.Provider value={{forecast,
//             airQuality,
//             fiveDayForecast,
//             uvIndex,
//         }}>
//             <GlobalContextUpdate.Provider value={setForecast}>
//                 {children}
//             </GlobalContextUpdate.Provider>
//         </GlobalContext.Provider>
//     );
// };

// export default GlobalContextProvider;
// export const useGlobalContext = () => useContext(GlobalContext);
// export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);

"use client";

import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';
import defaultStates from '../utils/defaultStates';
import {debounce} from "lodash";

// Define interfaces for the data
interface MainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface ForecastData {
  main: MainData;
  [key: string]: any;
}

interface AirQualityData {
  pm25: number;
  pm10: number;
  [key: string]: any;
}

interface FiveDayForecastData {
  list: Array<any>; 
  [key: string]: any;
}

interface UvIndexData {
  value: number;
  date_iso: string;
  [key: string]: any;
}

interface GlobalContextType {
  forecast: ForecastData | undefined;
  airQuality: AirQualityData | undefined;
  fiveDayForecast: FiveDayForecastData | undefined;
  uvIndex: UvIndexData | undefined;
  geoCodedList: typeof defaultStates;
  inputValue: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

// Create the context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextUpdate = createContext<{
  setForecast: Dispatch<SetStateAction<ForecastData | undefined>>,
  setActiveCityCoords: Dispatch<SetStateAction<[number, number]>>
} | undefined>(undefined);

interface GlobalContextProviderProps {
  children: ReactNode;
}

// Context Provider Component
const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [forecast, setForecast] = useState<ForecastData | undefined>(undefined);
  const [airQuality, setAirQuality] = useState<AirQualityData | undefined>(undefined);
  const [fiveDayForecast, setFiveDayForecast] = useState<FiveDayForecastData | undefined>(undefined);
  const [uvIndex, setUvIndex] = useState<UvIndexData | undefined>(undefined); 
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");
  const [activeCityCoords, setActiveCityCoords] = useState<[number, number]>([
    51.752021, -1.257726,
  ]);

  const fetchForecast = async (lat : any, lon : any) => {
    try {
      const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error);
    }
  }

  const fetchAirQuality = async (lat : any, lon : any) => {
    try {
      const res = await axios.get(`/api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error);
    }
  }

  const fetchFiveDayForecast = async (lat : any, lon : any) => {
    try {
      const res = await axios.get(`/api/fiveday?lat=${lat}&lon=${lon}`);
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error);
    }
  }

  const fetchGeoCodedList = async (search : React.ChangeEvent<HTMLInputElement>) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);
      // console.log("data", res.data);
      setGeoCodedList(res.data);
    } catch (error) {
      console.log("Error fetching geocoded list: ", error);
    }
  };



  const fetchUvIndex = async (lat : any, lon : any) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
      setUvIndex(res.data);
    } catch (error) {
      console.log("Error fetching UV Index data: ", error);
    }
  }

  

  const handleInput = (e : any) =>{
    setInputValue(e.target.value);

    if(e.target.value === ""){
      setGeoCodedList(defaultStates);
    }
  }

  useEffect(()=>{
    const debouncedFetch = debounce((serach)=>{
      fetchGeoCodedList(serach);
    },500);
    if(inputValue){
      debouncedFetch(inputValue);
    }

    return ()=> debouncedFetch.cancel();
  },[inputValue])

  useEffect(() => {
    fetchForecast(activeCityCoords[0],activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0],activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0],activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0],activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider value={{
      forecast,
      airQuality,
      fiveDayForecast,
      uvIndex,
      geoCodedList,
      inputValue,
      handleInput,  
    }}>
      <GlobalContextUpdate.Provider value={{
        setForecast,
        setActiveCityCoords,
      }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

// Custom hooks for accessing the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};

export const useGlobalContextUpdate = () => {
  const setForecast = useContext(GlobalContextUpdate);
  if (!setForecast) {
    throw new Error("useGlobalContextUpdate must be used within a GlobalContextProvider");
  }
  return setForecast;
};

export default GlobalContextProvider;
