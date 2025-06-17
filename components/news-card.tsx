import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

interface NewsCardProps {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  imageUrl: string | null
}

export default function NewsCard({ id, slug, title, excerpt, date, category, imageUrl }: NewsCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden aspect-[16/9]">
        <Link href={`/article/${slug}`}>
          <Image
            src={imageUrl || "/placeholder.svg?height=225&width=400"}
            alt={title}
            width={400}
            height={225}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            unoptimized
          />
        </Link>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{formatDate(date)}</span>
        </div>
        <Link href={`/article/${slug}`} className="group">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2">{excerpt}</p>
      </CardContent>
    </Card>
  )
}
