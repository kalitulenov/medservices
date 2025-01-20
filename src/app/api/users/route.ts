
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("route_GET=");
  try {
    const result = await db.sprusr.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}

export async function POST(req: Request) 
{
    console.log("POST=");
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






