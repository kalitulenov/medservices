
import { SprUsr } from "./types";
import useSWR, { mutate } from 'swr';
const url = './api/users';

// ==============================================================================================
  async function getRequest() {
    console.log("getRequest=",url);
      const response = await fetch(url);
      return response.json();
  }

//--------------------------------------------------------------
async function updateRequest(id: number, data: SprUsr) {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

 //--------------------------------------------------------------
async function deleteRequest(id: number) {
    console.log("removeRow=",id);
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.json();
 };


//--------------------------------------------------------------

 async function addRequest(data: SprUsr) {

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
 
 export default function useUsers() {
   const { data, isValidating } = useSWR(url,getRequest);
   //console.log("useStudents_isValidating=",isValidating);

    const updateRow = async (id: number, postData: SprUsr) => {
      await updateRequest(id, postData);
      mutate(url);
    };
  
    const deleteRow = async (id: number) => {
      console.log("useUsers-deleteRow=");
      await deleteRequest(id);
      mutate(url);
    };
  
    const addRow = async (postData: SprUsr) => {
      await addRequest(postData);
      mutate(url);
    };
  
    return {
      data: data ?? [],
      isValidating,
      addRow,
      updateRow,
      deleteRow
    };
  };