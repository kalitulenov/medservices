
import { SprUslFrm } from "@/components/types";
import useSWR, { mutate } from 'swr';
const url = './api/offers';

// ==============================================================================================
  async function getRequest() {
 //   console.log("getRequest=",url);
      const response = await fetch(url);
      return response.json();
  }

//--------------------------------------------------------------
async function updateRequest(uslidn: number, data: SprUslFrm) {
  const DelFlg = data.uslfrmflg;
  const DelIdn = data.uslfrmidn;
  //console.log("updateRequest_uslidn=",uslidn, DelFlg, DelIdn,data);

  // if (DelIdn) {
  //   await fetch(`${url}/${DelIdn}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

  //console.log("updateRequest_PrzDel=",DelFlg);

  if (DelFlg) {
  //  console.log("updateRequest_data.uslfrmflg=true=",DelIdn, data);
    const dataPrs = {
        uslfrmtrf: data.uslfrmtrf,
        uslfrmhsp: data.uslfrmhsp,
        uslminlet: Number(data.uslminlet),
        uslmaxlet: Number(data.uslmaxlet),
      };

   //   console.log("updateRequest_POST=",url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPrs),
      });
      return response.json();
    }
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