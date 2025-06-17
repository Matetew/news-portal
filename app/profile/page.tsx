import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import ProfileForm from "@/components/profile/profile-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        imageType: true,
        createdAt: true,
      },
    })

    if (!user) {
      redirect("/login")
    }

    // Convert Buffer to base64 string for client component
    const userForClient = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image ? Buffer.from(user.image).toString("base64") : null,
      imageType: user.imageType,
      createdAt: user.createdAt,
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>
            <ProfileForm user={userForClient} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Profile page error:", error)
    redirect("/login")
  }
}
