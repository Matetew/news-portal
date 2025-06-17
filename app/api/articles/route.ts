import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { slugify } from "@/lib/utils"

// Schema for article validation
const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  published: z.boolean().default(false),
  featuredImage: z.string().optional(),
  categoryId: z.string(),
})

// GET /api/articles - Get all articles
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categorySlug = searchParams.get("category")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
    const published = searchParams.get("published") === "true"

    const where = {
      ...(categorySlug && {
        category: {
          slug: categorySlug,
        },
      }),
      ...(published && { published: true }),
    }

    const articles = await prisma.article.findMany({
      where,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        category: true,
      },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Error fetching articles" }, { status: 500 })
  }
}

// POST /api/articles - Create a new article
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const body = articleSchema.parse(json)

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: slugify(body.title),
        excerpt: body.excerpt,
        content: body.content,
        published: body.published,
        featuredImage: body.featuredImage,
        author: {
          connect: {
            id: session.user.id,
          },
        },
        category: {
          connect: {
            id: body.categoryId,
          },
        },
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error creating article:", error)
    return NextResponse.json({ error: "Error creating article" }, { status: 500 })
  }
}
