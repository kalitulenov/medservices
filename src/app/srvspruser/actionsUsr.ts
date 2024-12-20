

"use server";

import { db } from "@/lib/db";
import { SprUsr } from "./types";

// ==============================================================================================
export const GetSprUsr = async () => {
  console.log("GetSprUsr=");
  try {
    const data = await db.sprusr.findMany();
      console.log("data=",data);
      return data;
    } catch (error) {
        console.error(error);
    }
};

//--------------------------------------------------------------
export async function updateRow(id: number, postData: SprUsr) {
    console.log("updateRow=",id,postData);
    await db.sprusr.update
    (
        {
         where: {Id:id},
         data: {UsrOrg: postData.UsrOrg,
                UsrLog: postData.UsrLog,
                UsrPsw: postData.UsrPsw,
                UsrTel: postData.UsrTel,
                UsrFio: postData.UsrFio,
                UsrTyp: postData.UsrTyp}
         } 
    );
 }
 
 //--------------------------------------------------------------
export async function deleteRow(id: number) {
    console.log("removeRow=",id);
    await db.sprusr.delete
    (
        {where: {Id:id}} 
    );
 }


//--------------------------------------------------------------
export async function addRow(postData: SprUsr) {
    console.log("addRow=",postData);
    await db.sprusr.create
    (
        {
         data: {Id:     postData.Id as number,
                UsrKod: postData.UsrKod as number,
                UsrOrg: postData.UsrOrg as string,
                UsrLog: postData.UsrLog as string,
                UsrPsw: postData.UsrPsw as string,
                UsrTyp: postData.UsrTyp as string,
                UsrTel: postData.UsrTel as string,
                UsrFio: postData.UsrFio as string}
         } 
    );
 }




  //   return {
  //     data: data ?? [],
  // //    isValidating,
  //     addRow,
  //     updateRow,
  //     deleteRow
  //   };
  