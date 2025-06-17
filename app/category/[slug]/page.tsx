import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import NewsCard from "@/components/news-card"
import { fetchNewsArticles, transformApiArticle, getAllCategories, getArticlesByCategory } from "@/lib/api"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  try {
    // Decode the slug in case it contains encoded characters
    const decodedSlug = decodeURIComponent(slug)
    console.log(`Loading category page for slug: "${slug}" (decoded: "${decodedSlug}")`)

    // Fetch all articles
    const apiArticles = await fetchNewsArticles()

    // Get all categories
    const categories = getAllCategories(apiArticles)

    // Find the current category (try both original and decoded slug)
    const category = categories.find((cat) => cat.slug === slug || cat.slug === decodedSlug)

    if (!category) {
      console.log(`Category not found for slug: "${slug}"`)
      console.log(
        "Available categories:",
        categories.map((c) => c.slug),
      )
      return notFound()
    }

    // Get articles for this category
    const categoryArticles = getArticlesByCategory(apiArticles, category.slug)
    const articles = categoryArticles.map(transformApiArticle)

    return (
      <div className="min-h-screen bg-background">
        <Navbar categories={categories} />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground mt-2">Browse the latest articles in {category.name}</p>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCard
                  key={article.id}
                  id={article.id}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt || ""}
                  date={article.createdAt.toString()}
                  category={article.category.name}
                  imageUrl={article.featuredImage || "/placeholder.svg"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found in this category.</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error(`Error loading category page for ${slug}:`, error)

    return (
      <div className="min-h-screen bg-background">
        <Navbar categories={[]} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Unable to Load Category</h1>
            <p className="text-muted-foreground">We're having trouble loading this category. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
