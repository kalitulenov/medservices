



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
    // -------------- вариант 1 ----------------------------
    // const response = await db.$executeRaw`
    //       DELETE FROM spruslfrm WHERE Id=id;
	  //       IF postData.uslfrmflg=true THEN INSERT INTO SprUslFrm(uslfrmhsp,uslfrmtrf,uslminlet,uslmaxlet) 
    //                                  VALUES(postData.uslfrmhsp,true,postData.uslminlet,postData.uslmaxlet);
    //       END IF;
    //       console.log("updateRow=",response);    `
    // -------------- вариант 2 ----------------------------
    if (postData.uslfrmidn) {
        await db.spruslfrm.delete
        (
            {where: {id:postData.uslfrmidn}} 
        );
      }

    console.log("updateRow_create=");
    if (postData.uslfrmflg=true) {
        const user = await db.spruslfrm.create({
          data: {
            uslfrmhsp: postData.uslfrmhsp,
            uslfrmtrf: postData.usltrf,
            uslminlet: Number(postData.uslminlet),
            uslmaxlet: Number(postData.uslmaxlet),
          },
        })
      }
    }
 
 //--------------------------------------------------------------
