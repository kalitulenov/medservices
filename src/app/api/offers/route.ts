
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getSession } from "@/actions";

export async function GET(req: Request) {
  console.log("route_GET=");
  const headerList = headers();         // полчить заголовок запроса
  const type = headerList.get("type");  // полчить в заголовок параметр
  const session = await getSession();

    try {
      //  const response = await db.sprusl.findMany({take: 5000});
      //  const response = await db.$queryRaw `SELECT getseekusl(${1});`;
      //  const orgnam = session.userorg;
        const orgkod = Number(session.userorgkod);
        console.log("orgkod=",orgkod);
        const result = await db.$queryRaw`SELECT SprUsl.Id, SprUsl.UslTrf, SprUsl.UslNam, SprUsl.UslEdn, 
                                                    SprUsl.UslZen, T.UslFrmFlg, T.UslMinLet, T.UslMaxLet,
                                                    CAST(${orgkod} AS INTEGER) AS UslFrmHsp, T.id AS UslFrmIdn
                                            FROM SprUsl LEFT OUTER JOIN
                                              (SELECT SprUslFrm.id, true AS UslFrmFlg, UslFrmHsp,UslFrmTrf, 
                                                      UslMinLet, UslMaxLet
                                                FROM SprUslFrm INNER JOIN SprOrg 
                                                              ON SprUslFrm.UslFrmHsp = SprOrg.ORGKOD
                                                WHERE SprOrg.OrgKod = ${orgkod}) AS T 
                                                      ON (SprUsl.UslTrf = T.UslFrmTrf)
                                            WHERE LENGTH(SprUsl.UslTrf)=11
                                            ORDER BY SprUsl.UslTrf  LIMIT 25;`

        return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(err);
  }
}


export async function POST(req: Request) 
{
    console.log("POST=");
    
    const session = await getSession();
    session.isAdd = true;
    await session.save();


    const body = await req.json();
    const result = await db.spruslfrm.create(
      {
        data: {...body,},
      }
    );

    if (!result) NextResponse.json(
      {
        message: "error",
        status: 500
      });
    return NextResponse.json(
        {
          message: "OK",
          status: 200,
          data: result
        });

}






