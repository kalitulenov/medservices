// "use server";

import useSWR, { mutate } from 'swr';
import { SprOrg } from '@/components/types';
import { db } from "@/lib/db";
import { array } from 'zod';
import { json } from 'stream/consumers';
import Result from 'postcss/lib/result';
//import { GetSprOrg } from '@/actions';

//const url = 'http://localhost:5000/students';
const url = 'http://localhost:5000/sprorg';

async function updateRequest(id: number, data: SprOrg) {
//   const response = await fetch(`${url}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   return response.json();
    console.log("updateRequest=",id, data);
}

async function addRequest(data: SprOrg) {
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   return response.json();
  console.log("addRequest=", data);

}

async function deleteRequest(id: number) {
//   const response = await fetch(`${url}/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   });
//   return response.json();
  console.log("deleteRequest=", id);

}

async function getRequest() {
  const response = await fetch(url);
  return response.json();

  // try {
  //   const data = await db.sprorg.findMany();
  //   return data; 
  //   } catch (error) {
  //       console.error(error);
  //   }
 }


// async functions always return a promise. you must await
// them in async functions, or use .then to get and use the value
// getData().then(result => {
//     // do things with the result here, like call functions with them
//     console.log(result)
// })
export default function useSprOrg() {
    //const { data, isValidating } = useSWR(url, getRequest);
    console.log("useSprOrg=");

    const isValidating  = false;

    const updateRow = async (id: number, postData: SprOrg) => {
        await updateRequest(id, postData);
     //  mutate(url);
        console.log("actions=");
    }

    const deleteRow = async (id: number) => {
         await deleteRequest(id);
        // mutate(url);
        console.log("deleteRow=",id);

    };

    const addRow = async (postData: SprOrg) => {
         await addRequest(postData);
        // mutate(url);
        console.log("addRow=",postData);
    };

    return {
     //   data: data ?? [],
        isValidating,
        addRow,
        updateRow,
        deleteRow
    };
}
