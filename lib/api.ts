interface ApiArticle {
  id: string
  user_id: string
  judul: string
  penulis: string
  kategori: string
  status: string
  deskripsi: string
  gambar: string
  slug: string
  visitor_count: number | null
  created_at: string
  updated_at: string
}

// The API returns a direct array, not wrapped in an object
type ApiResponse = ApiArticle[]

export async function fetchNewsArticles(): Promise<ApiArticle[]> {
  try {
    console.log("Fetching news articles from API...")

    const response = await fetch("https://winnicode.com/api/publikasi-berita", {
      method: "GET",
      headers: {
        Authorization: `Bearer a42278524bee772194f2ad0e9ac88a5893aa733db4d1c684d89c2dc08b7f718a`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store", // Force fresh data
    })

    console.log("API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API error response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result: ApiResponse = await response.json()
    console.log(`Successfully fetched ${result.length} articles from API`)

    // Log first article structure for debugging
    if (result.length > 0) {
      console.log("First article sample:", {
        id: result[0].id,
        judul: result[0].judul,
        kategori: result[0].kategori,
        slug: result[0].slug,
        gambar: result[0].gambar,
      })
    }

    // Log all unique image IDs for debugging
    const imageIds = result.map((article) => article.gambar).filter(Boolean)
    console.log("All image IDs from API:", imageIds)

    return result
  } catch (error) {
    console.error("Error fetching news articles:", error)
    console.log("Falling back to mock data")
    return getMockArticles()
  }
}

export async function fetchArticleBySlug(slug: string): Promise<ApiArticle | null> {
  try {
    const articles = await fetchNewsArticles()
    const article = articles.find((article) => article.slug === slug) || null
    console.log(`Found article for slug "${slug}":`, article ? "Yes" : "No")
    return article
  } catch (error) {
    console.error("Error fetching article by slug:", error)
    return null
  }
}

// Create URL-safe slug from category name
export function createCategorySlug(categoryName: string): string {
  return categoryName
    .toLowerCase()
    .trim()
    .replace(/&/g, "and") // Replace & with "and"
    .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

// Get all unique categories from articles
export function getAllCategories(articles: ApiArticle[]): { name: string; slug: string }[] {
  const categoriesMap = new Map<string, { name: string; slug: string }>()

  articles.forEach((article) => {
    const categoryName = article.kategori
    const categorySlug = createCategorySlug(categoryName)

    if (!categoriesMap.has(categorySlug)) {
      categoriesMap.set(categorySlug, {
        name: categoryName,
        slug: categorySlug,
      })
    }
  })

  const categories = Array.from(categoriesMap.values())
  console.log("Generated categories:", categories)
  return categories
}

// Transform API article to match our component interface
export function transformApiArticle(apiArticle: ApiArticle) {
  console.log("Transforming article:", apiArticle.judul, "Image ID:", apiArticle.gambar)

  // Create excerpt from deskripsi (remove HTML tags and limit length)
  const excerpt =
    apiArticle.deskripsi
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .substring(0, 150) + "..."

  // Use our proxy API route instead of direct Google Drive URLs
  const imageUrl = apiArticle.gambar ? `/api/proxy-image?id=${apiArticle.gambar}` : null

  console.log("Generated proxy image URL:", imageUrl)

  return {
    id: apiArticle.id,
    slug: apiArticle.slug,
    title: apiArticle.judul,
    excerpt: excerpt,
    content: apiArticle.deskripsi,
    createdAt: apiArticle.created_at,
    featuredImage: imageUrl,
    driveImageId: apiArticle.gambar, // Pass the raw drive ID for fallback attempts
    category: {
      name: apiArticle.kategori,
      slug: createCategorySlug(apiArticle.kategori),
    },
    author: {
      name: apiArticle.penulis,
      image: null,
    },
  }
}

// Get articles by category
export function getArticlesByCategory(articles: ApiArticle[], categorySlug: string) {
  const filtered = articles.filter((article) => {
    const articleCategorySlug = createCategorySlug(article.kategori)
    return articleCategorySlug === categorySlug.toLowerCase()
  })
  console.log(`Found ${filtered.length} articles for category "${categorySlug}"`)
  return filtered
}

// Helper function to get error message from unknown error
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === "string") {
    return error
  }
  return "An unknown error occurred"
}

// Mock data as fallback (updated to match API structure)
function getMockArticles(): ApiArticle[] {
  console.log("Using mock articles as fallback")

  return [
    {
      id: "mock-1",
      user_id: "mock-user-1",
      judul: "Global Markets Reach All-Time Highs Amid Economic Optimism",
      penulis: "Financial Reporter",
      kategori: "Business",
      status: "Public",
      deskripsi:
        "<p>Stock markets around the world have reached record levels as economic indicators show strong growth potential.</p><p>Investors are increasingly optimistic about the global economic outlook, driving stock indices to unprecedented heights. The rally has been fueled by strong corporate earnings, low interest rates, and signs of recovery in key sectors.</p><p>Analysts suggest this trend could continue through the year, though some warn of potential volatility ahead.</p>",
      gambar: "",
      slug: "global-markets-reach-all-time-highs",
      visitor_count: 150,
      created_at: "2024-05-27T10:00:00.000000Z",
      updated_at: "2024-05-27T10:00:00.000000Z",
    },
    {
      id: "mock-2",
      user_id: "mock-user-2",
      judul: "Revolutionary AI Model Breaks Performance Records",
      penulis: "Tech Analyst",
      kategori: "Technology",
      status: "Public",
      deskripsi:
        "<p>A new artificial intelligence model has shattered previous performance benchmarks across multiple tasks.</p><p>The groundbreaking AI system demonstrates unprecedented capabilities in natural language processing, image recognition, and complex problem-solving. Developed by a team of international researchers, the model represents a significant leap forward in machine learning technology.</p><p>Industry experts believe this advancement could accelerate AI applications across healthcare, finance, and scientific research.</p>",
      gambar: "",
      slug: "revolutionary-ai-model-breaks-records",
      visitor_count: 200,
      created_at: "2024-05-27T09:30:00.000000Z",
      updated_at: "2024-05-27T09:30:00.000000Z",
    },
    {
      id: "mock-3",
      user_id: "mock-user-3",
      judul: "Global Climate Summit Reaches Historic Agreement",
      penulis: "Environmental Correspondent",
      kategori: "Career & Self Development",
      status: "Public",
      deskripsi:
        "<p>World leaders have reached a landmark agreement at the Global Climate Summit, pledging significant reductions in carbon emissions over the next decade.</p><p>The historic pact includes commitments to phase out coal power, accelerate renewable energy adoption, and provide financial support to developing nations. Environmental groups have cautiously welcomed the agreement while emphasizing the need for swift implementation.</p><p>This marks the most ambitious international climate action plan to date, with specific targets and accountability measures.</p>",
      gambar: "",
      slug: "global-climate-summit-agreement",
      visitor_count: 300,
      created_at: "2024-05-27T08:45:00.000000Z",
      updated_at: "2024-05-27T08:45:00.000000Z",
    },
  ]
}
