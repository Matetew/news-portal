import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
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

interface FeaturedNewsProps {
  articles: Article[]
}

export default function FeaturedNews({ articles }: FeaturedNewsProps) {
  if (articles.length === 0) {
    return null
  }

  const mainArticle = articles[0]
  const secondaryArticles = articles.slice(1, 3)

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured News</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-lg group">
            <Link href={`/article/${mainArticle.slug}`}>
              <Image
                src={mainArticle.featuredImage || "/placeholder.svg?height=500&width=900"}
                alt={mainArticle.title}
                width={900}
                height={500}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <Badge className="w-fit mb-2">Breaking News</Badge>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{mainArticle.title}</h3>
                <p className="text-white/90 mb-2 line-clamp-2">{mainArticle.excerpt || ""}</p>
                <span className="text-white/70 text-sm">{formatDate(mainArticle.createdAt.toString())}</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {secondaryArticles.map((article) => (
            <div key={article.id} className="relative overflow-hidden rounded-lg group">
              <Link href={`/article/${article.slug}`}>
                <Image
                  src={article.featuredImage || "/placeholder.svg?height=250&width=450"}
                  alt={article.title}
                  width={450}
                  height={250}
                  className="w-full h-[190px] object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{article.title}</h3>
                  <span className="text-white/70 text-sm">{formatDate(article.createdAt.toString())}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
