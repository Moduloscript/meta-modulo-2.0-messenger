import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";


async function Header() {
  const session =await  getServerSession()
  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            src={session.user?.image!}
            alt="Profile Picture"
            width={50}
            height={10}
          />
          <div>
            <p className="text-blue-400">logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name} 🤖🤖</p>
            <p></p>
          </div>
        </div>
        <LogoutButton />
        </header>
  )


  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src="https://links.papareact.com/jne"
            alt="logo"
            width={50}
            height={10}
          />
          <p className="text-blue-400">Welcome Meta Messenger 💕</p>
        </div>
        <div>
          <Link
            href="/auth/signin"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            sign In
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
