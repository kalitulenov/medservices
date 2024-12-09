import Image from "next/image";
import Nurse from "../public/NurseMen.jpeg";
export default function Home() {
  return (
    <main className="flex border-2 p-24 border-black">
        {/* сетка один-столбец-на-моб комп-2-столбца внутрений-отступ отступ-между-столбцами толщина-границы цвет-границы*/}
        <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-1 border-2 border-red-500">
          <div className="border-2 border-blue-500 p-2 ">
            <Image
              className="rounded-lg"
              src={Nurse}
              alt="img"
            />
          </div>
        {/* толщина-границы цвет-границы внутрений-отступ обрезка-текста перепоненые-тексты-не-показывать */}
        {/* <div className="border-2 border-blue-500 p-2 text-clip overflow-hidden"> </div> */}

        {/* создать скролл толщина границы цвет-границы внутрений-отступ */}
        <div className="overflow-y-auto border-2 border-blue-500 p-2 ">
              &nbsp;Поисковая система медицинских услуг необходима для того, чтобы упростить процесс поиска клиник и медицинских услуг более удобным и эффективным. Вот основные цели и задачи таких систем:
            <p>&nbsp;&nbsp; </p>
            <p className="font-bold">1. Упрощение поиска медицинских учреждений </p>
              &nbsp;Поисковая система помогает пользователям находить нужную клинику на основании различных критериев поиска медицинских услуг. 
            <p className="font-bold">2. Доступ к информации о медицинских услугах и ценах</p>
              &nbsp;В таких системах обычно содержится информация о стоимости услуг в разных медицинских учреждениях, что помогает сравнивать цены и выбирать наиболее подходящие варианты по бюджету.
            <p className="font-bold">3. Поиск медицинских услуг в экстренных случаях</p>
              &nbsp;В случаях, когда требуется срочная медицинская помощь, такие системы помогают найти ближайшие медицинские учреждения , готовых оказать помощь как можно быстрее.
      </div>
      </div>
    </main>
  );
}
