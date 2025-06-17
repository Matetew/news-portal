import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const imageId = searchParams.get("id")

  if (!imageId) {
    return new NextResponse("Missing image ID", { status: 400 })
  }

  try {
    // Try multiple Google Drive URL formats
    const urls = [
      `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`,
      `https://drive.google.com/uc?export=view&id=${imageId}`,
      `https://lh3.googleusercontent.com/d/${imageId}=w1000`,
    ]

    let imageResponse: Response | null = null

    for (const url of urls) {
      try {
        console.log(`Trying to fetch image from: ${url}`)
        const response = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        })

        if (response.ok) {
          imageResponse = response
          console.log(`Successfully fetched image from: ${url}`)
          break
        }
      } catch (error) {
        console.log(`Failed to fetch from ${url}:`, error)
        continue
      }
    }

    if (!imageResponse) {
      console.log(`All URLs failed for image ID: ${imageId}`)
      return new NextResponse("Image not found", { status: 404 })
    }

    const imageBuffer = await imageResponse.arrayBuffer()
    const contentType = imageResponse.headers.get("content-type") || "image/jpeg"

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("Error proxying image:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
