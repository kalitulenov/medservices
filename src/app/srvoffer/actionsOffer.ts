



"use server";

import { db } from "@/lib/db";
import { SprUslFrm} from "./types";


// ==============================================================================================
export const GetSprUslFrm = async () => {
  console.log("GetSprOrg=");
  try {
    const data = await db.sprfrmusl.findMany();
      console.log("data=",data);
      return data;
    } catch (error) {
        console.error(error);
    }
};

//--------------------------------------------------------------
export async function updateRow(id: number, postData: SprUslFrm) {
    console.log("updateRow=",id,postData);
    await db.sprfrmusl.update
    (
        {
         where: {id:id},
         data: {uslfrmflg: postData.uslfrmflg,
                uslminlet: postData.uslminlet,
                uslmaxlet: postData.uslmaxlet}
         } 
    );
 }
 
 //--------------------------------------------------------------
export async function deleteRow(id: number) {
    console.log("removeRow=",id);
    await db.sprfrmusl.delete
    (
        {where: {id:id}} 
    );
 }
//--------------------------------------------------------------
