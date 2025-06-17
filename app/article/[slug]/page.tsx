import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RelatedArticles from "@/components/related-articles"
import ArticleImage from "@/components/article-image"
import CommentSection from "@/components/comments/comment-section"
import {
  fetchArticleBySlug,
  fetchNewsArticles,
  transformApiArticle,
  getArticlesByCategory,
  getAllCategories,
} from "@/lib/api"
import { formatDate, getReadingTime } from "@/lib/utils"

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  try {
    // Fetch the specific article
    const apiArticle = await fetchArticleBySlug(params.slug)

    if (!apiArticle) {
      notFound()
    }

    const article = transformApiArticle(apiArticle)

    // Get all articles and categories for navbar and related articles
    const allApiArticles = await fetchNewsArticles()
    const categories = getAllCategories(allApiArticles)

    const relatedApiArticles = getArticlesByCategory(allApiArticles, article.category.slug)
      .filter((a) => a.slug !== params.slug)
      .slice(0, 3)

    const relatedArticles = relatedApiArticles.map(transformApiArticle)

    return (
      <div className="min-h-screen bg-background">
        <Navbar categories={categories} />
        <main className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{article.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <Badge variant="secondary" className="text-sm">
                  {article.category.name}
                </Badge>
                <span className="flex items-center text-sm">
                  <User className="mr-2 h-4 w-4" />
                  {article.author.name}
                </span>
                <span className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(article.createdAt)}
                </span>
                <span className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  {getReadingTime(article.content)}
                </span>
              </div>

              {article.driveImageId && (
                <div className="relative w-full h-[300px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
                  <ArticleImage src={article.featuredImage} alt={article.title} driveId={article.driveImageId} />
                </div>
              )}
            </header>

            {/* Article Content with Proper Styling */}
            <div
              className="prose prose-lg prose-gray dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6
                prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
                prose-p:text-base prose-p:leading-7 prose-p:mb-4 prose-p:text-foreground
                prose-ul:my-4 prose-ul:pl-6 prose-ul:list-disc
                prose-ol:my-4 prose-ol:pl-6 prose-ol:list-decimal
                prose-li:text-base prose-li:leading-7 prose-li:mb-2 prose-li:text-foreground prose-li:marker:text-foreground
                prose-strong:text-foreground prose-strong:font-semibold
                prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Comment Section */}
            <div className="mt-12 border-t pt-8">
              <CommentSection articleId={article.id} />
            </div>
          </article>

          {relatedArticles.length > 0 && <RelatedArticles articles={relatedArticles} />}
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error loading article:", error)
    notFound()
  }
}
