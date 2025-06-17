"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, User, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

interface Category {
  name: string
  slug: string
}

interface NavbarProps {
  categories?: Category[]
}

export default function Navbar({ categories = [] }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  const isLoggedIn = status === "authenticated"
  const isAdmin = session?.user?.role === "ADMIN"

  // Function to fetch profile image
  const fetchProfileImage = useCallback(async () => {
    if (!session?.user?.id) return

    setImageLoading(true)
    try {
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/profile/image/${session.user.id}?v=${timestamp}`)
      if (response.ok) {
        const blob = await response.blob()
        const imageUrl = URL.createObjectURL(blob)
        setProfileImage(imageUrl)
      } else {
        setProfileImage(null)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      console.log("Profile image not found or failed to load:", errorMessage)
      setProfileImage(null)
    } finally {
      setImageLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (isLoggedIn && session?.user?.id) {
      fetchProfileImage()
    } else {
      setProfileImage(null)
    }
  }, [isLoggedIn, session?.user?.id, fetchProfileImage])

  // Listen for profile image updates
  useEffect(() => {
    const handleProfileImageUpdate = () => {
      fetchProfileImage()
    }

    window.addEventListener("profileImageUpdated", handleProfileImageUpdate)
    return () => {
      window.removeEventListener("profileImageUpdated", handleProfileImageUpdate)
    }
  }, [session?.user?.id, fetchProfileImage])

  const handleSignOut = async () => {
    if (profileImage) {
      URL.revokeObjectURL(profileImage)
      setProfileImage(null)
    }
    await signOut({ callbackUrl: "/" })
  }

  // Limit the number of categories shown in the main navigation
  const mainCategories = categories.slice(0, 5)
  const moreCategories = categories.slice(5)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="mt-4 mb-8">
                <Image src="/images/winni-code-logo.png" alt="Winni Code" width={180} height={50} className="h-auto" />
              </div>
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                  Home
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/winni-code-logo.png"
              alt="Winni Code"
              width={140}
              height={40}
              className="h-auto"
              priority
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>

          {/* Show main categories in the navbar */}
          {mainCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
          ))}

          {/* Show "More" dropdown if there are additional categories */}
          {moreCategories.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 px-2">
                  More <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {moreCategories.map((category) => (
                  <DropdownMenuItem key={category.slug} asChild>
                    <Link href={`/category/${category.slug}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (searchQuery.trim()) {
                    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
                    setIsSearchOpen(false)
                    setSearchQuery("")
                  }
                }}
                className="flex items-center"
              >
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] md:w-[300px]"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close search</span>
                </Button>
              </form>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  {imageLoading ? (
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                  ) : profileImage ? (
                    <Image
                      src={profileImage || "/placeholder.svg"}
                      alt={session?.user?.name || "Profile"}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">{session?.user?.email || session?.user?.name}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:inline-flex">
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
