// "use server"

import { db } from "@/lib/db";
import { json } from "stream/consumers";

export async function getRequest() {
    console.log("getRequest-data=");
    try {
      const data = await db.sprusr.findMany();
        console.log("getRequest-data=",data);
        return data;
      } catch (error) {
          console.error(error);
      }
  };

// import  useSWR  from 'swr';
// //import prisma from '../generated/client';

// const fetcher = async (url: any) => {
//   const response = await fetch(url);
//   return response.json();
// };

// const getRequest = (query: any) => {
//   const { data, error } = useSWR(query, fetcher);
//   console.log("getRequest-data=",data);
//   return {
//     data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

// export default getRequest;