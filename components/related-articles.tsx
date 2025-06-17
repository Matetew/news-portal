import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

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

interface RelatedArticlesProps {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="group">
            <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={article.featuredImage || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{article.excerpt || ""}</p>
                <span className="text-xs text-muted-foreground">{formatDate(article.createdAt.toString())}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
