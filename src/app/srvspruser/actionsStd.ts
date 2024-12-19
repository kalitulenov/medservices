//import useSWR, { mutate } from 'swr';
import { SprUsr } from './types';
import { db } from "@/lib/db";

//const url = 'http://localhost:5000/students';

// async function updateRequest(id: number, data: Student) {
//   const response = await fetch(`${url}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   return response.json();
// }

// async function addRequest(data: Student) {
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   return response.json();
// }

// async function deleteRequest(id: number) {
//   const response = await fetch(`${url}/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   });
//   return response.json();
// }

// async function getRequest() {
//   console.log("getRequest=");
//   const response = await fetch(url);
//   return response.json();
// }

async function getRequest() {
    console.log("getRequest=");
    const response =  await db.sprusr.findMany();
    //console.log("getRequest2=",response);

    return response;
  }
  
export default function useStudents() {
  //const data:SprUsr[]=[];
  const data  = async ()=>getRequest();
  console.log("actionStd-data=",data);

  const updateRow = async (id: number, postData: SprUsr) => {
    // await updateRequest(id, postData);
    // mutate(url);
  };

  const deleteRow = async (id: number) => {
    // await deleteRequest(id);
    // mutate(url);
  };

  const addRow = async (postData: SprUsr) => {
    // await addRequest(postData);
    // mutate(url);
  };


  return {
    data: data ?? [],
   // isValidating,
    addRow,
    updateRow,
    deleteRow
  };
}
