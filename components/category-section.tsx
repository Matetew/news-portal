import Link from "next/link"
import { ChevronRight } from "lucide-react"
import NewsCard from "@/components/news-card"

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string | null
  createdAt: string | Date
  featuredImage: string | null // Updated to match API transform
  category: {
    name: string
  }
}

interface CategorySectionProps {
  title: string
  articles: Article[]
  showViewAll?: boolean // Make this optional with default true
}

export default function CategorySection({ title, articles, showViewAll = true }: CategorySectionProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showViewAll && (
          <Link
            href={`/${title.toLowerCase()}`}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
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
    </section>
  )
}
