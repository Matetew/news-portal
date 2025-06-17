import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SearchNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Search Error</h1>
        <p className="text-xl text-muted-foreground mb-8">Please enter a search term to find articles.</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </main>
      <Footer />
    </div>
  )
}
