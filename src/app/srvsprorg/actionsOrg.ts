

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
         where: {Id:id},
         data: {OrgAdr: postData.OrgAdr,
                OrgNam: postData.OrgNam,
                OrgTel: postData.OrgTel,
                OrgDmu: postData.OrgDmu}
         } 
    );
 }
 
 //--------------------------------------------------------------
export async function deleteRow(id: number) {
    console.log("removeRow=",id);
    await db.sprorg.delete
    (
        {where: {Id:id}} 
    );
 }


//--------------------------------------------------------------
export async function addRow(postData: SprOrg) {
    console.log("addRow=",postData);
    await db.sprorg.create
    (
        {
         data: {Id: postData.Id,
                OrgKod: postData.OrgKod,
                OrgCty: 1,
                OrgAdr: postData.OrgAdr,
                OrgNam: postData.OrgNam,
                OrgNamShr: postData.OrgNam,
                OrgTel: postData.OrgTel,
                OrgDmu: postData.OrgDmu}
         } 
    );
 }

//  const user = await prisma.user.create({
//     data: {
//       email: 'elsa@prisma.io',
//       name: 'Elsa Prisma',
//     },
//   })