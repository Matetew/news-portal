import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId } = params

    // Get the user's profile image
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        image: true,
        imageType: true,
        updatedAt: true,
      },
    })

    if (!user || !user.image || !user.imageType) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Convert Buffer to Uint8Array for response
    const imageBuffer = Buffer.from(user.image)

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": user.imageType,
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        "Content-Length": imageBuffer.length.toString(),
        "Last-Modified": user.updatedAt.toUTCString(),
      },
    })
  } catch (error) {
    console.error("Profile image fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
