

import React from 'react'
//import { SprOrg } from "./types";
import { SprTable } from './data-table'
import { columns } from './columns'
//import { GetSprOrg } from './actionsOrg';
import { db } from "@/lib/db";

export default async function SprOrgPage() {
    // загрузка меню из БД ---------------------------
  // async function loader() {
  //     try {
  //         const response = await db.sprorg.findMany();
  //         return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  // загрузка меню из БД ---------------------------
  console.log("SprOrgPage")
  //const defaultData: any = await loader();
  // если пусто ---------------------------
  //if (!defaultData) return <h1>no datafound</h1>
  
  // загрузка меню в память ---------------------------
  //const navItems = defaultData;

  return (
    <div className='container py-5 px-20 mx-auto'>
     {/* <SprTable columns={columns} data={defaultData} /> */}
       <SprTable />
    </div>  
   )
}

//export default SprOrgPage;