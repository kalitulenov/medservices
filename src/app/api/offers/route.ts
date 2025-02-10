
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
//import { headers } from "next/headers";
import { getSession } from "@/actions";

export async function GET() {
  const session = await getSession();

  try {
      const orgkod = Number(session.userorgkod);
      // Получаем данные из базы данных
      const result = await db.$queryRaw`SELECT SprUsl.Id, SprUsl.UslTrf AS UslFrmTrf, SprUsl.UslNam AS UslFrmNam,  
                                                  SprUsl.UslEdn AS UslFrmEdn, T.UslFrmFlg, T.UslMinLet, T.UslMaxLet,
                                                  CAST(${orgkod} AS INTEGER) AS UslFrmHsp, T.id AS UslFrmIdn
                                          FROM SprUsl LEFT OUTER JOIN
                                            (SELECT SprUslFrm.id, true AS UslFrmFlg, UslMinLet, UslMaxLet, UslFrmTrf
                                              FROM SprUslFrm INNER JOIN SprOrg 
                                                            ON SprUslFrm.UslFrmHsp = SprOrg.ORGKOD
                                              WHERE SprOrg.OrgKod = ${orgkod}) AS T 
                                                    ON (SprUsl.UslTrf = T.UslFrmTrf)
                                          WHERE LENGTH(SprUsl.UslTrf)=11
                                          ORDER BY SprUsl.UslTrf LIMIT 1000;`

      // Возвращаем успешный ответ
      return NextResponse.json(result);

  } catch (err) {
      console.error(err);
      // Возвращаем общее сообщение об ошибке
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}


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
      const result = await db.spruslfrm.create({
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





