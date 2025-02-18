
import React from 'react'
import { SprTable } from './data-table'
import { columns } from './columns'
import { db } from "@/lib/db";
import { getSession } from '@/actions';
import { SprUslSeek } from '@/components/types';

export default async function OfferPage() {
   // получаем расшифрованный ключ из actions.ts
   const session = await getSession();
  // console.log('session_Nav=',session);
   
    // загрузка меню из БД ---------------------------
  // async function loader() {
  //     try {
  //         const orgkod = Number(session.userorgkod);
  //         const response: SprUslSeek[] = await db.$queryRaw`SELECT SprUsl.Id, SprUsl.UslTrf, SprUsl.UslNam, SprUsl.UslEdn, 
  //                                                    SprUsl.UslZen, T.UslMinLet, T.UslMaxLet, T.OrgNam AS UslHspNam
  //                                             FROM SprUsl INNER JOIN
  //                                               (SELECT UslMinLet, UslMaxLet, UslFrmTrf, OrgNam
  //                                                FROM SprUslFrm INNER JOIN SprOrg 
  //                                                               ON SprUslFrm.UslFrmHsp = SprOrg.ORGKOD
  //                                                WHERE SprOrg.OrgKod <> ${orgkod}) AS T 
  //                                                       ON (SprUsl.UslTrf = T.UslFrmTrf)
  //                                             WHERE LENGTH(SprUsl.UslTrf)=11
  //                                             ORDER BY SprUsl.UslTrf  LIMIT 2500;`

  //         return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


  async function loader() {
    try {
        const orgkod = Number(session.userorgkod);
        if (isNaN(orgkod)) {
            throw new Error('Invalid orgkod');
        }

        const response: SprUslSeek[] = await db.$queryRaw`
            SELECT 
                SprUsl.Id, 
                SprUsl.UslTrf, 
                SprUsl.UslNam, 
                SprUsl.UslEdn, 
                SprUsl.UslZen, 
                T.UslMinLet, 
                T.UslMaxLet, 
                T.OrgNam AS UslHspNam
            FROM 
                SprUsl
            INNER JOIN (
                SELECT 
                    UslMinLet, 
                    UslMaxLet, 
                    UslFrmTrf, 
                    OrgNam
                FROM 
                    SprUslFrm
                INNER JOIN 
                    SprOrg ON SprUslFrm.UslFrmHsp = SprOrg.ORGKOD
                WHERE 
                    SprOrg.OrgKod <> ${orgkod}
            ) AS T ON SprUsl.UslTrf = T.UslFrmTrf
            WHERE 
                LENGTH(SprUsl.UslTrf) = 11
            ORDER BY 
                SprUsl.UslTrf
            LIMIT 2500;`;

        return response;
    } catch (error) {
        console.error(error);
        throw error; // или return [];
    }
}
  
  // загрузка меню из БД ---------------------------
 // console.log("SeekPage")
  const defaultData = await loader();
  // если пусто ---------------------------
  if (!defaultData || defaultData == undefined) {
    return <h1>No data found</h1>;
  }
  
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