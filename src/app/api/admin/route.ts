import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({
      message: "invalid cred"
    })
  }
  console.log('user', username, password)
  console.log('process env', process.env.ADMIN_USERNAME)
  console.log('process password', process.env.ADMIN_PASSWORD)
  if (process.env.ADMIN_USERNAME === username && process.env.ADMIN_PASSWORD === password) {
    const register = await db.register.findMany({})
    //const sevendayprogram = await db.sevenDaysProgramUser.findMany({})

    return NextResponse.json({
      success: true,
      register,
      //sevendayprogram
    })
  }
  return NextResponse.json({
    success: false
  })
}
