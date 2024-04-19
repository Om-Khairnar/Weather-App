"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloudy } from "react-icons/io5";
import {
  RiHazeFill,
  RiSunFill,
  RiMistFill,
  RiFoggyFill,
  RiThunderstormsFill,
  RiSnowyFill,
  RiRainyFill,
} from "react-icons/ri";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export default function Home() {
  const [city, setCity] = useState();
  const [cityData, setCityData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getWeatherData = async () => {
    try {
      
      if (!city) {
        console.log("City is empty or undefined.");
        return;
      }

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`;
      let res = await fetch(url);

      if (!res.ok) {
        if (res.status === 404) {
          //city not found
          setCityData(null);
          setError("City not Found");
        } else {
          // Handle other errors
          throw new Error(`Error: ${res.status}`);
        }
      } else {
        // City found, proceed with data
        let data = await res.json();
        console.log("GET WEATHER DATA ", data.name);
        setCityData(data);
        setError(null);
      }
    } catch (err: any) {
      console.log(err.message);
      setError("Error fetching data");
    }
  };

  const handleSearchClick = () => {
    // Trigger weather data fetching when the button is clicked
    getWeatherData();
  };

  // useEffect(() => {
  //   getWeatherData();
  // }, [city]);

  useEffect(() => {
    getWeatherData();
}, [city, getWeatherData]);


  return (
    <div className={styles.outerdiv}>
      <div className={styles.searchbar}>
        <input
          type="search"
          placeholder="City Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCity(e.target.value);
            console.log("City Updated:", e.target.value);
          }}
        />
        

        <button onClick={handleSearchClick}>
          <FaSearch />
        </button>
      </div>

      <div className={styles.error}>
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
      </div>

      {cityData && (
        <div className={styles.row}>
          <div className={styles.sectionA}>
            <div className={styles.sectionB}>
              {cityData.weather[0].main === "Clouds" && (
                <IoCloudy className={styles.weathericon} />
              )}
              {cityData.weather[0].main === "Haze" && (
                <RiHazeFill className={styles.weathericon} />
              )}
              {cityData.weather[0].main === "Smoke" && (
                <RiHazeFill className={styles.weathericon} />
              )}
              {cityData.weather[0].main === "Clear" && (
                <RiSunFill className={styles.weathericon} />
              )}
              {cityData.weather[0].main === "Mist" && (
                <RiMistFill className={styles.weathericon} />
              )}
              {cityData.weather[0].main === "Fog" && (
                <RiFoggyFill className={styles.weathericon} />
              )}
              {cityData.weather[0].main === "Thunderstorm" && (
                <RiThunderstormsFill className={styles.weathericon} />
              )}
              {cityData.weather[0].main === "Snow" && (
                <RiSnowyFill className={styles.weathericon} />
              )}
              {cityData.weather[0].main === "Rain" && (
                <RiRainyFill className={styles.weathericon} />
              )}

              <p className={styles.temperature}>
                {(cityData?.main.temp - 273.15).toFixed(1)} <span>°C</span>
              </p>
            </div>
            <div className={styles.sectionB}>
              <p className={styles.city}>{cityData?.name}</p>
              <p className={styles.weathertype}>{cityData?.weather[0].main}</p>
            </div>
          </div>

          <div className={styles.timediv}>
            <p className={styles.time}>{currentTime}</p>
          </div>
        </div>
      )}

      {cityData && (
        <div className={styles.section2}>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature</p>
            <p className={styles.head2}>
              {(cityData?.main.temp - 273.15).toFixed(1)} <span>°C</span>
            </p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Min</p>
            <p className={styles.head2}>
              {(cityData?.main.temp_min - 273.15).toFixed(1)} <span>°C</span>
            </p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Max</p>
            <p className={styles.head2}>
              {(cityData?.main.temp_max - 273.15).toFixed(1)} <span>°C</span>
            </p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Humidity</p>
            <p className={styles.head2}>{cityData?.main.humidity}</p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Pressure</p>
            <p className={styles.head2}>{cityData?.main.pressure}</p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Visibility</p>
            <p className={styles.head2}>{cityData?.visibility}</p>
          </div>

          <div className={styles.section21}>
            <p className={styles.head1}>Wind Speed</p>
            <p className={styles.head2}>{cityData?.wind.speed} km/hr</p>
          </div>
        </div>
      )}
    </div>
  );
}
