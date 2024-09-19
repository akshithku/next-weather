// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//     try {
//         const apiKey = process.env.OPENWEATHERMAP_API_KEY;
//         const searchParams = req.nextUrl.searchParams;
//         const city = searchParams.get("");
//         const url = `http://api.openweathermap.org/geo/1.0/direct?q=Delhi&limit=5&appid=${apiKey}`;
    
//         const res = await axios.get(url);
//         // console.log("res data: ", res.data);
//         return NextResponse.json(res.data);
//     } catch (error) {
//         console.log("Error fetching geocoded data");
//         return new Response("Error fetching geocoded data", {status: 500})
//     } 
// }





// // import { NextRequest, NextResponse } from "next/server";

// // export async function GET(req: NextRequest) {
// //   try {
// //     const apiKey = process.env.OPENWEATHERMAP_API_KEY;
// //     const searchParams = req.nextUrl.searchParams;
// //     console.log("search : " ,searchParams);
// //     const city = searchParams.get("");
// //     const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

// //     const res = await fetch(url);
    
// //     if (!res.ok) {
// //       throw new Error(`Failed to fetch data from OpenWeatherMap. Status: ${res.status}`);
// //     }

// //     const data = await res.json();

// //     return NextResponse.json(data);
// //   } catch (error) {
// //     console.error("Error fetching geocoded data: ", error);
// //     return new Response("Error fetching geocoded data", { status: 500 });
// //   }
// // }


import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const searchParams = req.nextUrl.searchParams;

    const city = searchParams.get("search");
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching geocoded data");
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
