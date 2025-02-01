
import Link from 'next/link'
import React from 'react'

const NavbarLink = () => {
  return (
    <div className="hidden md:flex space-x-4 ">
        <Link href={"#home"} className="link">
        Home
        </Link>
        <Link href={"#about"} className="link">
        About
        </Link>
        <Link href={"#services"} className="link">
        Services
        </Link>
        <Link href={"#contact"} className="link">
        Contact
        </Link>
    </div>
  )
}

export default NavbarLink

