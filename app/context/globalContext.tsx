"use Client";
import axios from "axios";
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  ChangeEvent,
} from "react";
import defaultStates from "../utils/defaultStates";

import { debounce } from "lodash";

// Define the types for the context values
interface GlobalContextType {
  forecast: Record<string, any>;
  airQuality: Record<string, any>;
  fiveDayForecast: Record<string, any>;
  uvIndex: Record<string, any>;
  geoCodedList: typeof defaultStates;
  inputValue: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  setActiveCityCoords: React.Dispatch<React.SetStateAction<[number, number]>>;
}

interface GlobalContextUpdateType {
  setActiveCityCoords: React.Dispatch<React.SetStateAction<[number, number]>>;
}

// Create contexts with initial undefined values
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextUpdate = createContext<GlobalContextUpdateType | undefined>(
  undefined
);

// Define the component props type
interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [forecast, setForecast] = useState<Record<string, any>>({});
  const [geoCodedList, setGeoCodedList] = useState<typeof defaultStates>(
    defaultStates
  );
  const [inputValue, setInputValue] = useState<string>("");

  const [activeCityCoords, setActiveCityCoords] = useState<[number, number]>([
    51.752021, -1.257726,
  ]);

  const [airQuality, setAirQuality] = useState<Record<string, any>>({});
  const [fiveDayForecast, setFiveDayForecast] = useState<Record<string, any>>(
    {}
  );
  const [uvIndex, seUvIndex] = useState<Record<string, any>>({});

  // Fetch weather forecast
  const fetchForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);

      setForecast(res.data);
    } catch (error: any) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // Fetch air quality
  const fetchAirQuality = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`/api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error: any) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  // Fetch five day forecast
  const fetchFiveDayForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`/api/fiveday?lat=${lat}&lon=${lon}`);

      setFiveDayForecast(res.data);
    } catch (error: any) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  // Fetch geocoded list
  const fetchGeoCodedList = async (search: string) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);

      setGeoCodedList(res.data);
    } catch (error: any) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  // Fetch UV data
  const fetchUvIndex = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

      seUvIndex(res.data);
    } catch (error: any) {
      console.error("Error fetching the UV index:", error);
    }
  };

  // Handle input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  // Use debounce for input fetching
  useEffect(() => {
    const debouncedFetch = debounce((search: string) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // Cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  // Fetch data on coordinates change
  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

// Custom hooks to use the context
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};

export const useGlobalContextUpdate = (): GlobalContextUpdateType => {
  const context = useContext(GlobalContextUpdate);
  if (!context) {
    throw new Error(
      "useGlobalContextUpdate must be used within a GlobalContextProvider"
    );
  }
  return context;
};
