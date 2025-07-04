import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { z } from "zod"

import { prisma } from "@/lib/prisma"

// Schema for user registration
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = userSchema.parse(json)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(body.password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    })

    // Remove password from response
    const { password, ...result } = user

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error registering user:", error)
    return NextResponse.json({ error: "Error registering user" }, { status: 500 })
  }
}
