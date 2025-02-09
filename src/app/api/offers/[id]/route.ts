


import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE({params}: {params: {id: string}} ) {
    const id = params.id;
    
    try {
        await db.spruslfrm.delete
        (
            {where: {id: parseInt(id) }} 
        );
        return NextResponse.json(id);
    } catch (err) 
    {
      console.log(err);
      return NextResponse.json(err);
    }
  }


  export async function PUT(req: Request, {params}: {params: {id: string}} ) {
    const id = params.id;
    const body = await req.json();
   // const { title, content, authorEmail } = await req.json();

    try {
        await db.spruslfrm.update
        (
            {
             where: {id: parseInt(id)},
             data: {...body,},
             } 
        );
        return NextResponse.json(id);
  
    } catch (err) 
    {
      console.log(err);
      return NextResponse.json(err);
    }
  }
  
  