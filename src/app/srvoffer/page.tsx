


import React from 'react'
import { SprTable } from './data-table'
import { columns } from './columns'
import { db } from "@/lib/db";

export default async function OfferPage() {
    // загрузка меню из БД ---------------------------
  async function loader() {
      try {
          const response = await db.sprusl.findMany({take: 5000});
          return response;
    } catch (error) {
      console.error(error);
    }
  }
  
  // загрузка меню из БД ---------------------------
  console.log("OfferPage")
  const defaultData: any = await loader();
  // если пусто ---------------------------
  //if (!defaultData) return <h1>no datafound</h1>
  
  // загрузка меню в память ---------------------------
  //const navItems = defaultData;

  return (
    <div className='container py-5 px-20 mx-auto'>
     <SprTable columns={columns} data={defaultData} />
       {/* <SprTable /> */}
    </div>  
   )
}

//export default SprOrgPage;