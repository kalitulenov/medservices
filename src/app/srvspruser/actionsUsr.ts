

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
         where: {id:id},
         data: {usrkod: Number(postData.usrkod),
                usrorg: postData.usrorg,
                usrlog: postData.usrlog,
                usrpsw: postData.usrpsw,
                usrtel: postData.usrtel,
                usrfio: postData.usrfio,
                usrtyp: postData.usrtyp}
         } 
    );
 }
 
 //--------------------------------------------------------------
export async function deleteRow(id: number) {
    console.log("removeRow=",id);
    await db.sprusr.delete
    (
        {where: {id:id}} 
    );
 }


//--------------------------------------------------------------
export async function addRow(postData: SprUsr) {
    console.log("addRow=",postData);
    await db.sprusr.create
    (
        {
         data: {usrkod: postData.usrkod as number,
                usrorg: postData.usrorg as string,
                usrlog: postData.usrlog as string,
                usrpsw: postData.usrpsw as string,
                usrtel: postData.usrtel as string,
                usrfio: postData.usrfio as string,
                usrtyp: postData.usrtyp as string}
         } 
    );
 }
