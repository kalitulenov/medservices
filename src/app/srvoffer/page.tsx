


import React from 'react'
import { SprTable } from './data-table'
import { columns } from './columns'
import { db } from "@/lib/db";
import { getSession } from '@/actions';

export default async function OfferPage() {
   // получаем расшифрованный ключ из actions.ts
   const session = await getSession();
   console.log('session_Nav=',session);
   
    // загрузка меню из БД ---------------------------
  async function loader() {
      try {
        //  const response = await db.sprusl.findMany({take: 5000});
        //  const response = await db.$queryRaw `SELECT getseekusl(${1});`;
          const orgnam = session.userorg;
          const response = await db.$queryRaw`SELECT SprUsl.Id, SprUsl.UslTrf, SprUsl.UslNam, SprUsl.UslEdn,SprUsl.UslZen, 
                                                     SprOrg.OrgNam, SprOrg.OrgDmu,SprOrg.OrgTel,SprUslFrm.UslMinLet,SprUslFrm.UslMaxLet 
                                              FROM SprOrg INNER JOIN SprUslFrm ON SprOrg.OrgKod = SprUslFrm.UslFrmHsp 
                                                           RIGHT OUTER JOIN SprUsl ON SprUslFrm.UslFrmTrf = SprUsl.UslTrf
                                              WHERE SprOrg.OrgNam = ${orgnam}
                                              ORDER BY SprUsl.UslTrf`;

          console.log(response);
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