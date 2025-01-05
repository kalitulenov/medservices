


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
          const response = await db.$queryRaw`SELECT SprUsl.Id, SprUsl.UslTrf, SprUsl.UslNam, SprUsl.UslEdn, 
                                                     SprUsl.UslZen, T.UslFrmFlg, T.UslMinLet, T.UslMaxLet
                                              FROM SprUsl LEFT OUTER JOIN
                                                (SELECT SprUslFrm.id, true AS UslFrmFlg, UslFrmHsp,UslFrmTrf, 
                                                        UslMinLet, UslMaxLet
                                                 FROM SprUslFrm INNER JOIN SprOrg 
                                                                ON SprUslFrm.UslFrmHsp = SprOrg.ORGKOD
                                                 WHERE SprOrg.ORGNAM = ${orgnam}) AS T 
                                                        ON (SprUsl.UslTrf = T.UslFrmTrf)
                                              WHERE LENGTH(SprUsl.UslTrf)=11
                                              ORDER BY SprUsl.UslTrf;`

          console.log("orgnam=",orgnam);
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