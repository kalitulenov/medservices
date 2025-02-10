
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
//import { headers } from "next/headers";
import { getSession } from "@/actions";

export async function GET() {
  const session = await getSession();

  try {
      // Приводим session.isAdd к булевому типу
      const isAdd = Boolean(session.isAdd);

      // Получаем данные из базы данных
      const result = await db.sprorg.findMany({
          orderBy: {
              id: isAdd ? 'desc' : 'asc',
          },
      });

      // Обновляем сессию
      try {
          session.isAdd = false;
          await session.save();
      } catch (saveError) {
          console.error('Failed to save session:', saveError);
      }

      // Возвращаем успешный ответ
      return NextResponse.json(result);

  } catch (err) {
      console.error(err);
      // Возвращаем общее сообщение об ошибке
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}


// export async function POST(req: Request) 
// {
//    // console.log("POST=");
    
//     const session = await getSession();
//     session.isAdd = true;
//     await session.save();


//     const body = await req.json();
//     const result = await db.sprorg.create(
//       {
//         data: {...body,},
//       }
//     );

//     if (!result) NextResponse.json(
//       {
//         message: "error",
//         status: 500
//       });
//     return NextResponse.json(
//         {
//           message: "OK",
//           status: 200,
//           data: result
//         });
// }

export async function POST(req: Request) {
  const session = await getSession();

  try {
      // Обновляем сессию
      try {
          session.isAdd = true;
          await session.save();
      } catch (saveError) {
          console.error('Failed to save session:', saveError);
          return NextResponse.json(
              {
                  message: "Failed to save session",
                  status: 500,
              },
              { status: 500 }
          );
      }

      // Парсим тело запроса
      const body = await req.json();

      // Создаем запись в базе данных
      const result = await db.sprorg.create({
          data: { ...body },
      });

      // Проверяем результат
      if (!result) {
          return NextResponse.json(
              {
                  message: "error",
                  status: 500,
              },
              { status: 500 }
          );
      }

      // Возвращаем успешный ответ
      return NextResponse.json(
          {
              message: "OK",
              status: 200,
              data: result,
          },
          { status: 200 }
      );

  } catch (err) {
      console.error(err);
      return NextResponse.json(
          {
              message: "Internal Server Error",
              status: 500,
          },
          { status: 500 }
      );
  }
}


