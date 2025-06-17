import Navbar from "@/components/navbar"
import FeaturedNews from "@/components/featured-news"
import CategorySection from "@/components/category-section"
import Footer from "@/components/footer"
import { fetchNewsArticles, transformApiArticle, getAllCategories } from "@/lib/api"

export default async function Home() {
  try {
    console.log("Home page: Fetching articles...")

    // Fetch articles from external API
    const apiArticles = await fetchNewsArticles()
    console.log(`Home page: Received ${apiArticles.length} articles`)

    // Transform API articles to match our component interface
    const articles = apiArticles.map(transformApiArticle)

    // Get featured articles (latest 3)
    const featuredArticles = articles.slice(0, 3)
    console.log(`Home page: Featured articles: ${featuredArticles.length}`)

    // Get all unique categories from the API for navbar
    const categories = getAllCategories(apiArticles)
    console.log(`Home page: Found ${categories.length} unique categories`)

    // Get remaining articles for "Newest" section (skip the featured ones)
    const newestArticles = articles.slice(3, 30)
    console.log(`Home page: Newest articles: ${newestArticles.length}`)

    return (
      <div className="min-h-screen bg-background">
        <Navbar categories={categories} />
        <main className="container mx-auto px-4 py-8">
          <FeaturedNews articles={featuredArticles} />

          {newestArticles.length > 0 && (
            <CategorySection title="Recent News" articles={newestArticles} showViewAll={false} />
          )}

          {/* Fallback if no articles are available */}
          {articles.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No Articles Available</h2>
              <p className="text-muted-foreground">Please check back later for the latest news.</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error loading homepage:", error)

    return (
      <div className="min-h-screen bg-background">
        <Navbar categories={[]} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Unable to Load News</h1>
            <p className="text-muted-foreground">
              We're having trouble loading the latest news. Please try again later.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
