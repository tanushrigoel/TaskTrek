"use client"

import { useSession } from "next-auth/react";
function page() {
  const { data: session } = useSession();
  return <div>{JSON.stringify(session)}</div>;
}

export default page;
