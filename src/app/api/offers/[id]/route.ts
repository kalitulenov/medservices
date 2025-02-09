


// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function DELETE(req: Request, {params}: {params: {id: number}} ) {
//     const id = params.id;
    
//     try {
//         await db.spruslfrm.delete
//         (
//             {where: {id: id }} 
//         );
//         return NextResponse.json(id);
//     } catch (err) 
//     {
//       console.log(err);
//       return NextResponse.json(err);
//     }
//   }

import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Предположим, что db — это ваш Prisma клиент

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//     const id = parseInt(params.id, 10); // Преобразуем id в число

//     if (isNaN(id)) {
//         return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
//     }

//     try {
//         await db.spruslfrm.delete({
//             where: { id: id }
//         });
//         return NextResponse.json({ id: id });
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
//     }
// }

// export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
//   const id = Number(context.params.id);

//   if (!id) {
//       return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
//   }

//   try {
//       await db.spruslfrm.delete({
//           where: { id }
//       });
//       return NextResponse.json({ id });
//   } catch (err) {
//       console.error(err);
//       return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
//   }
// }

  // export async function PUT(req: Request, {params}: {params: {id: string}} ) {
  //   const id = params.id;
  //   const body = await req.json();
  //  // const { title, content, authorEmail } = await req.json();

  //   try {
  //       await db.spruslfrm.update
  //       (
  //           {
  //            where: {id: parseInt(id)},
  //            data: {...body,},
  //            } 
  //       );
  //       return NextResponse.json(id);
  
  //   } catch (err) 
  //   {
  //     console.log(err);
  //     return NextResponse.json(err);
  //   }
  // }
  

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await req.json();

    try {
        // Преобразуем id в число (если это необходимо)
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        // Обновляем запись в базе данных
        await db.spruslfrm.update({
            where: { id: parsedId },
            data: { ...body },
        });

        // Возвращаем успешный ответ
        return NextResponse.json({ id: parsedId }, { status: 200 });

    } catch (err) {
        console.error(err);
        // Возвращаем общее сообщение об ошибке
        return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
    }
}
  