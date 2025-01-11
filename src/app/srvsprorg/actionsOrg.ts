

"use server";

import { db } from "@/lib/db";
import { SprOrg } from "./types";


// ==============================================================================================
export const GetSprOrg = async () => {
  console.log("GetSprOrg=");
  try {
    const data = await db.sprorg.findMany();
      console.log("data=",data);
      return data;
    } catch (error) {
        console.error(error);
    }
};

//--------------------------------------------------------------
export async function updateRow(id: number, postData: SprOrg) {
    console.log("updateRow=",id,postData);
    await db.sprorg.update
    (
        {
         where: {id:id},
         data: {orgadr: postData.orgadr,
                orgnam: postData.orgnam,
                orgtel: postData.orgtel,
                orgdmu: postData.orgdmu}
         } 
    );
 }
 
 //--------------------------------------------------------------
export async function deleteRow(id: number) {
    console.log("removeRow=",id);
    await db.sprorg.delete
    (
        {where: {id:id}} 
    );
 }


//--------------------------------------------------------------
export async function addRow(postData: SprOrg) {
    console.log("addRow=",postData);
    await db.sprorg.create
    (
        {
         data: {orgkod: postData.orgkod,
                orgcty: 1,
                orgadr: postData.orgadr,
                orgnam: postData.orgnam,
                orgnamshr: postData.orgnamshr,
                orgtel: postData.orgtel,
                orgdmu: postData.orgdmu}
         } 
    );
 }