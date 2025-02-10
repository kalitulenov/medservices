
import { db } from "@/lib/db";
import { NextResponse, NextRequest} from "next/server";

// export async function DELETE(req: Request, {params}: {params: {id: string}} ) {
//     const id = params.id;
    
//     try {
//         await db.sprusr.delete
//         (
//             {where: {id: parseInt(id) }} 
//         );
//         return NextResponse.json(id);
//     } catch (err) 
//     {
//       console.log(err);
//       return NextResponse.json(err);
//     }
//   }

  export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10); // Преобразуем id в число

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        await db.sprusr.delete({
            where: { id: id }
        });
        return NextResponse.json({ id: id });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
    }
}

  export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await req.json();

    try {
        // Преобразуем id в число (если это необходимо)
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        // Обновляем запись в базе данных
        await db.sprusr.update({
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
