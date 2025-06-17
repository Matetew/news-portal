import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('articleId')

    if (!articleId) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 })
    }

    // Fetch comments with nested replies
    const comments = await prisma.comment.findMany({
      where: {
        articleId,
        parentId: null, // Only top-level comments
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform the data to include base64 images
    const transformedComments = comments.map(comment => ({
      ...comment,
      user: {
        ...comment.user,
        image: comment.user.image ? 
          `data:image/jpeg;base64,${Buffer.from(comment.user.image).toString('base64')}` : 
          null,
      },
      replies: comment.replies?.map(reply => ({
        ...reply,
        user: {
          ...reply.user,
          image: reply.user.image ? 
            `data:image/jpeg;base64,${Buffer.from(reply.user.image).toString('base64')}` : 
            null,
        },
      })),
    }))

    return NextResponse.json(transformedComments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { content, articleId, parentId } = body

    if (!content || !content.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    if (!articleId) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 })
    }

    if (content.length > 500) {
      return NextResponse.json({ error: 'Content must be 500 characters or less' }, { status: 400 })
    }

    // Get the current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        articleId,
        userId: user.id,
        parentId: parentId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // Transform the response to include base64 image
    const transformedComment = {
      ...comment,
      user: {
        ...comment.user,
        image: comment.user.image ? 
          `data:image/jpeg;base64,${Buffer.from(comment.user.image).toString('base64')}` : 
          null,
      },
    }

    return NextResponse.json(transformedComment, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}