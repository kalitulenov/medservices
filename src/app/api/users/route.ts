
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
//import { headers } from "next/headers";
import { getSession } from "@/actions";

export async function GET() {
  //console.log("route_GET=");
  // const headerList = headers();         // полчить заголовок запроса
  // const type = headerList.get("type");  // полчить в заголовок параметр
  const session = await getSession();

  try {
    const result = await db.sprusr.findMany({
      orderBy: [
        {
          ...(session.isAdd ? { id: 'desc' } : {id: 'asc'}),
        }
      ],
    });
    session.isAdd = false;
    await session.save();

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}

export async function POST(req: Request) 
{
   // console.log("POST=");
    
    const session = await getSession();
    session.isAdd = true;
    await session.save();


    const body = await req.json();
    const result = await db.sprusr.create(
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






