import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import NewsCard from "@/components/news-card"
import { fetchNewsArticles, transformApiArticle } from "@/lib/api"

interface SearchPageProps {
  searchParams: { q?: string }
}

function SearchResults({ query }: { query: string }) {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchContent query={query} />
    </Suspense>
  )
}

async function SearchContent({ query }: { query: string }) {
  try {
    const apiArticles = await fetchNewsArticles()
    const articles = apiArticles.map(transformApiArticle)

    // Simple search implementation
    const searchResults = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.category.name.toLowerCase().includes(query.toLowerCase()),
    )

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-8">
          {searchResults.length} results found for "{query}"
        </p>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((article) => (
              <NewsCard
                key={article.id}
                id={article.id}
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                date={article.createdAt}
                category={article.category.name}
                imageUrl={article.featuredImage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground">Try searching with different keywords or browse our categories.</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error in search:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Search Error</h2>
          <p className="text-muted-foreground">Unable to perform search. Please try again later.</p>
        </div>
      </div>
    )
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {query ? (
          <SearchResults query={query} />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Search News</h1>
              <p className="text-muted-foreground">Enter a search term to find relevant articles.</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
