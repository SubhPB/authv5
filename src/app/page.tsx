// Byimaan

import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export default async function Home() {

  // const data = await getSession();

  console.log('All cookies = ', cookies())
  const headerCookie = cookies().get('authjs.session-token');

  console.log('')
  console.log('Header cookie = ',headerCookie)

  const userDetails = await decode({
    token: headerCookie?.value!,
    salt: headerCookie?.name!,
    secret: process.env.AUTH_SECRET!
  });

  console.log('')
  console.log('User details = ',userDetails)

  return (
    <main className="h-full w-full grid place-content-center">
      {/* {JSON.stringify(data)} */}
    </main>
  );
}
