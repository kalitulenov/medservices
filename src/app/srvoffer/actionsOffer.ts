
import { SprUslFrm } from "./types";
import useSWR, { mutate } from 'swr';
const url = './api/offers';

// ==============================================================================================
  async function getRequest() {
    console.log("getRequest=",url);
      const response = await fetch(url);
      return response.json();
  }

//--------------------------------------------------------------
async function updateRequest(uslfrmidn: number, data: SprUslFrm) {
  await fetch(`${url}/${uslfrmidn}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

//--------------------------------------------------------------
 
 export default function useOffers() {
   const { data, isValidating } = useSWR(url,getRequest);
   //console.log("useStudents_isValidating=",isValidating);

    const updateRow = async (id: number, postData: SprUslFrm) => {
      await updateRequest(id, postData);
      mutate(url);
    };
  
    return {
      data: data ?? [],
      isValidating,
      updateRow
    };
  };