
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "@/actions";
import LogoutForm from "./LogoutForm";
import { MobileNavbar } from "./MobileNavbar";
import { db } from "@/lib/db";

export async function Navbar() {

  // получаем расшифрованный ключ из actions.ts
  const session = await getSession();
 // console.log('session_Nav=',session);

//  структура меню -------------------
interface NavItem {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
  // type: "LINK" | "PRIMARY" | "SECONDARY";
}

// загрузка меню из БД ---------------------------
async function loader() {
 // return dataDB;
    try {
        const response = await db.sprmnubar.findMany({
              where: {typeusr: session.usertype}
        });
        //console.log("response=",response);
        return response;
  } catch (error) {
    console.error(error);
  }
}

// загрузка меню из БД ---------------------------
const data: any = await loader();

// если пусто ---------------------------
if (!data) return <h1>no datafound</h1>

// загрузка меню в память ---------------------------
const navItems = data;
// console.log("navItems=",navItems);

//console.dir(data,{depth: null});


  return (
    <div className="bg-sky-400 py-1 border-b border-s-sky-200 w-full z-10 top-0 ">
      <div className="flex justify-between border-2 mx-2 gap-2">
      <div className="text-white text-3xl font-bold">ВИТРИНА МЕДИЦИНСКИХ УСЛУГ</div>
        {/* <div className="flex gap-2"> */}
        {/* <Link className={buttonVariants()} href="/login">Sign in</Link> */}
        {/* {session.isLoggedIn ? <Link className={buttonVariants()} href="/logOut">Log Out</Link> : <Link className={buttonVariants()} href="/login">Sign in</Link>} */}
      <div className="flex">
          {session.isLoggedIn && (
            <div className="hidden md:flex space-x-4 ">

                  {/* map требует предварительную проверку */}
                  {navItems instanceof Array 
                    ?
                        (navItems.map((navItem: Readonly<NavItem>) => (
                          <Link href={navItem.href} key={navItem.id} className="link">
                            {navItem.label}
                          </Link>
                        ))) 
                    : 
                        (<h1>some other code as navItems is not an Array </h1>)
                    }
              </div>
          )}
          <div className="hidden md:flex">
                {session.isLoggedIn 
                  ? 
                      (<LogoutForm />) 
                  : 
                      (<Link className={buttonVariants()} href="/login">
                          Sign in
                      </Link>)}
          </div>
        <MobileNavbar/>
      </div>

        {/*если система вошла (если сессия есть) покажи Logout */}
      </div>
    </div>
  );
}

