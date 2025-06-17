import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { slugify } from "@/lib/utils"

// Schema for category validation
const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
})

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 })
  }
}

// POST /api/categories - Create a new category
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const body = categorySchema.parse(json)

    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: {
        name: body.name,
      },
    })

    if (existingCategory) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 })
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: slugify(body.name),
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Error creating category" }, { status: 500 })
  }
}
