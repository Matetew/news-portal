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

// GET /api/articles/[id] - Get a specific article
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: params.id,
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

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ error: "Error fetching article" }, { status: 500 })
  }
}

// PATCH /api/articles/[id] - Update an article
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const body = articleSchema.parse(json)

    // Check if article exists
    const article = await prisma.article.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Update article
    const updatedArticle = await prisma.article.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        slug: body.title !== article.title ? slugify(body.title) : article.slug,
        excerpt: body.excerpt,
        content: body.content,
        published: body.published,
        featuredImage: body.featuredImage,
        category: {
          connect: {
            id: body.categoryId,
          },
        },
      },
    })

    return NextResponse.json(updatedArticle)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error updating article:", error)
    return NextResponse.json({ error: "Error updating article" }, { status: 500 })
  }
}

// DELETE /api/articles/[id] - Delete an article
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if article exists
    const article = await prisma.article.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Delete article
    await prisma.article.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting article:", error)
    return NextResponse.json({ error: "Error deleting article" }, { status: 500 })
  }
}
