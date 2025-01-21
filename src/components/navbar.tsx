
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "@/actions";
import { LogOut } from "lucide-react";
import LogoutForm from "./LogoutForm";
import { MobileNavbar } from "./MobileNavbar";
import { db } from "@/lib/db";
import { toast } from "./ui/use-toast";

export async function Navbar() {

  // получаем расшифрованный ключ из actions.ts
  const session = await getSession();
  console.log('session_Nav=',session);

//  const dataDB = [
//   {
//     "id": 1,
//     "href": "/",
//     "label": "Home1",
//     "isExternal": false,
//   },
//   {
//     "id": 2,
//     "href": "/about",
//     "label": "About1",
//     "isExternal": false,
//   },

//   {
//     id: 3,
//     "href": "/blog",
//     "label": "Blog1",
//     "isExternal": false,
//   },
// ];


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
      <div className="text-white text-3xl font-bold">ВИТРИНА</div>
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
        //   <div className="hidden md:flex space-x-4 ">
        //     <Link href={"#home"} className="link">
        //     Home
        //     </Link>
        //     <Link href={"#about"} className="link">
        //     About
        //     </Link>
        //     <Link href={"#services"} className="link">
        //     Services
        //     </Link>
        //     <Link href={"#contact"} className="link">
        //     Contact
        //     </Link>
        // </div>
    
          )}
          <div className="hidden md:flex">
                {session.isLoggedIn ? (<LogoutForm />) 
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

//export default Navbar;

// const data = {
//   data: {
//     id: 3,
//     documentId: 'ph0ub6mu326lpcdn1hz87iom',
//     title: 'Global settings',
//     description: 'Responsible for our top nav and footer.',
//     createdAt: '2024-08-31T00:36:59.847Z',
//     updatedAt: '2024-08-31T22:26:40.129Z',
//     publishedAt: '2024-08-31T22:26:40.238Z',
//     locale: null,
//     topNavigation: {
//       id: 3,
//       logoTitle: {
//         id: 12,
//         label: 'Awesome Web',
//         href: '/',
//         isExternal: false,
//         type: 'LINK'
//       },

//       navItems: [
//         {
//           id: 13,
//           label: 'Home',
//           href: '/',
//           isExternal: false,
//           type: 'LINK'
//         },
//         {
//           id: 14,
//           label: 'About',
//           href: '/about',
//           isExternal: false,
//           type: 'LINK'
//         },
//         {
//           id: 15,
//           label: 'Blog',
//           href: '/blog',
//           isExternal: false,
//           type: 'LINK'
//         },
//         {
//           id: 16,
//           label: 'Test',
//           href: '/test',
//           isExternal: false,
//           type: 'LINK'
//         }
//       ],
//       cta: {
//         id: 17,
//         label: 'CTA',
//         href: 'https://www.codingafterthirty.com',
//         isExternal: true,
//         type: 'PRIMARY'
//       }
//     }
//   },
//   meta: {}
// }
