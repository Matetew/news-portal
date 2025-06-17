export const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "ADMIN",
    image: null,
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "USER",
    image: null,
  },
]

export const categories = [
  {
    id: "1",
    name: "Politics",
    slug: "politics",
  },
  {
    id: "2",
    name: "Technology",
    slug: "technology",
  },
  {
    id: "3",
    name: "Business",
    slug: "business",
  },
  {
    id: "4",
    name: "Health",
    slug: "health",
  },
  {
    id: "5",
    name: "Entertainment",
    slug: "entertainment",
  },
]

export const articles = [
  {
    id: "1",
    title: "Global Climate Summit Reaches Historic Agreement",
    slug: "global-climate-summit-reaches-historic-agreement",
    excerpt:
      "World leaders have reached a landmark agreement at the Global Climate Summit, pledging significant reductions in carbon emissions over the next decade.",
    content: `
      <p>World leaders have reached a landmark agreement at the Global Climate Summit, pledging significant reductions in carbon emissions over the next decade. The agreement, which was signed by representatives from over 190 countries, sets ambitious targets for reducing greenhouse gas emissions and increasing the use of renewable energy sources.</p>
      
      <p>The summit, which was held in Geneva, Switzerland, brought together heads of state, environmental experts, and industry leaders to address the urgent challenge of climate change. The agreement is being hailed as a major breakthrough in international cooperation on environmental issues.</p>
      
      <h2>Key Points of the Agreement:</h2>
      <ul>
        <li>A commitment to reduce global carbon emissions by 50% by 2030</li>
        <li>Increased investment in renewable energy technologies</li>
        <li>Establishment of a $100 billion annual fund to assist developing nations in transitioning to cleaner energy sources</li>
        <li>Enhanced monitoring and reporting mechanisms to ensure compliance</li>
      </ul>
      
      <p>Environmental activists have largely welcomed the agreement, though some argue that even more aggressive measures are needed to combat the escalating climate crisis. Industry representatives have expressed cautious optimism, emphasizing the need for balanced implementation that doesn't unduly burden economic growth.</p>
      
      <p>As nations begin the process of ratifying the agreement and incorporating its provisions into domestic policy, the world watches with anticipation. The success of this historic accord will largely depend on the commitment and actions of individual countries in the years to come.</p>
      
      <p>The Global Climate Summit has set the stage for a new era of environmental responsibility. Time will tell if this agreement marks a turning point in humanity's relationship with our planet.</p>
    `,
    published: true,
    featuredImage: "/placeholder.svg?height=500&width=1000",
    createdAt: "2025-03-11T12:00:00Z",
    authorId: "1",
    categoryId: "1",
    author: {
      name: "Admin User",
      image: null,
    },
    category: {
      name: "Politics",
      slug: "politics",
    },
  },
  {
    id: "2",
    title: "Revolutionary AI Model Breaks Performance Records",
    slug: "revolutionary-ai-model-breaks-performance-records",
    excerpt:
      "A new artificial intelligence model has shattered previous performance benchmarks across multiple domains.",
    content: `
      <p>A groundbreaking artificial intelligence model developed by researchers at a leading tech institute has shattered previous performance benchmarks across multiple domains. The model, named "NeuralNexus," demonstrates unprecedented capabilities in natural language processing, image recognition, and complex problem-solving tasks.</p>
      
      <p>According to the research team, NeuralNexus represents a significant leap forward in AI technology due to its novel architecture that more closely mimics the neural pathways of the human brain. Unlike previous models that excel in specific tasks but struggle with others, NeuralNexus shows remarkable versatility and adaptability.</p>
      
      <h2>Key Achievements:</h2>
      <ul>
        <li>Surpassed human performance in medical diagnosis accuracy by 15%</li>
        <li>Reduced computational requirements by 40% compared to previous state-of-the-art models</li>
        <li>Demonstrated the ability to learn new tasks with minimal training data</li>
        <li>Achieved breakthrough performance in understanding context and nuance in language</li>
      </ul>
      
      <p>Industry experts are already speculating about the wide-ranging implications of this technology across sectors including healthcare, finance, education, and scientific research. Some have expressed concerns about potential ethical implications and the need for robust governance frameworks to guide the deployment of such powerful AI systems.</p>
      
      <p>The research team has committed to open-sourcing aspects of their work while implementing safeguards to prevent misuse. They emphasize that their goal is to develop AI that augments human capabilities rather than replacing human judgment.</p>
      
      <p>As NeuralNexus moves from the research lab toward practical applications, it may well mark the beginning of a new chapter in the evolution of artificial intelligence and its role in society.</p>
    `,
    published: true,
    featuredImage: "/placeholder.svg?height=500&width=1000",
    createdAt: "2025-03-10T12:00:00Z",
    authorId: "1",
    categoryId: "2",
    author: {
      name: "Admin User",
      image: null,
    },
    category: {
      name: "Technology",
      slug: "technology",
    },
  },
  {
    id: "3",
    title: "Global Markets Reach All-Time Highs Amid Economic Optimism",
    slug: "global-markets-reach-all-time-highs",
    excerpt:
      "Stock markets around the world have reached record levels as economic indicators show strong growth potential.",
    content: `
      <p>Stock markets around the world have surged to unprecedented heights as a confluence of positive economic indicators fuels investor optimism. Major indices in North America, Europe, and Asia have all posted significant gains, with several breaking through previous resistance levels to establish new all-time highs.</p>
      
      <p>The rally appears to be driven by several factors, including stronger-than-expected corporate earnings reports, declining inflation rates, and signs that central banks may be nearing the end of their interest rate hiking cycles. Additionally, consumer spending has remained resilient despite earlier concerns about a potential recession.</p>
      
      <h2>Market Highlights:</h2>
      <ul>
        <li>The S&P 500 has gained over 15% year-to-date</li>
        <li>Technology and financial sectors are leading the rally</li>
        <li>Emerging markets are showing strong performance after years of underperformance</li>
        <li>Market volatility indices have dropped to multi-year lows</li>
      </ul>
      
      <p>Economic analysts are divided on whether the current bull market can sustain its momentum. Optimists point to improving economic fundamentals and the potential for a "soft landing" scenario where inflation is tamed without triggering a recession. Skeptics, however, warn that markets may be overvalued and that geopolitical risks could quickly reverse the positive sentiment.</p>
      
      <p>Retail investors have been increasingly active participants in the market rally, with brokerage firms reporting record numbers of new account openings. This has raised some concerns about potential market froth and speculation.</p>
      
      <p>As the market continues its upward trajectory, investors are advised to maintain diversified portfolios and to be prepared for potential volatility in the months ahead.</p>
    `,
    published: true,
    featuredImage: "/placeholder.svg?height=500&width=1000",
    createdAt: "2025-03-09T12:00:00Z",
    authorId: "1",
    categoryId: "3",
    author: {
      name: "Admin User",
      image: null,
    },
    category: {
      name: "Business",
      slug: "business",
    },
  },
  {
    id: "4",
    title: "New Medical Breakthrough Could Transform Treatment of Chronic Diseases",
    slug: "new-medical-breakthrough-could-transform-treatment-of-chronic-diseases",
    excerpt:
      "Researchers have developed a revolutionary approach that could change how we treat a range of chronic conditions.",
    content: `
      <p>A team of medical researchers has announced a breakthrough that could fundamentally transform the treatment of multiple chronic diseases. The innovation, which combines gene editing technology with targeted drug delivery systems, has shown remarkable results in early clinical trials.</p>
      
      <p>The approach, dubbed "PrecisionCure," allows for highly specific modifications to disease-causing genetic factors while simultaneously delivering therapeutic compounds directly to affected tissues. This dual-action method has demonstrated efficacy in treating conditions that have traditionally been difficult to manage with conventional therapies.</p>
      
      <h2>Potential Applications:</h2>
      <ul>
        <li>Autoimmune disorders such as rheumatoid arthritis and multiple sclerosis</li>
        <li>Metabolic conditions including type 2 diabetes</li>
        <li>Neurodegenerative diseases like Parkinson's and Alzheimer's</li>
        <li>Certain forms of previously treatment-resistant cancers</li>
      </ul>
      
      <p>Dr. Elena Rodriguez, lead researcher on the project, emphasized that while the results are promising, further studies are needed before the treatment becomes widely available. "We're seeing unprecedented improvements in patient outcomes, but we need to ensure the long-term safety and efficacy through expanded clinical trials," she explained.</p>
      
      <p>Healthcare experts have responded with cautious optimism, noting that if the treatment fulfills its early promise, it could significantly reduce the economic and social burden of chronic diseases, which currently account for approximately 70% of healthcare expenditures worldwide.</p>
      
      <p>The research team is now working with regulatory authorities to expedite the next phase of clinical trials while maintaining rigorous safety standards.</p>
    `,
    published: true,
    featuredImage: "/placeholder.svg?height=500&width=1000",
    createdAt: "2025-03-08T12:00:00Z",
    authorId: "1",
    categoryId: "4",
    author: {
      name: "Admin User",
      image: null,
    },
    category: {
      name: "Health",
      slug: "health",
    },
  },
  {
    id: "5",
    title: "Acclaimed Director Announces Groundbreaking Film Project",
    slug: "acclaimed-director-announces-groundbreaking-film-project",
    excerpt:
      "Award-winning filmmaker reveals plans for an innovative movie that will push the boundaries of storytelling and technology.",
    content: `
      <p>Renowned director Alexandra Chen has announced her next project, an ambitious film that promises to revolutionize cinematic storytelling through a combination of cutting-edge technology and narrative innovation. The project, titled "Dimensions," will explore the interconnected lives of characters across multiple realities and time periods.</p>
      
      <p>Chen, whose previous works have garnered critical acclaim and numerous awards, described the film as "the culmination of everything I've been working toward as a filmmaker." The production will utilize advanced virtual production techniques, similar to those pioneered in recent high-profile streaming series, but with significant technological enhancements.</p>
      
      <h2>Innovative Elements:</h2>
      <ul>
        <li>Interactive narrative components that will allow viewers to experience the story from different perspectives</li>
        <li>Custom-developed visual effects that create seamless transitions between different realities</li>
        <li>An original musical score that adapts to the emotional state of the audience</li>
        <li>Collaboration with neuroscientists to optimize the emotional impact of key scenes</li>
      </ul>
      
      <p>The film has attracted an impressive ensemble cast, including several Academy Award winners and nominees. Industry insiders suggest that the project's unique approach could establish a new paradigm for immersive storytelling in the digital age.</p>
      
      <p>Major studios engaged in a bidding war for distribution rights, with StreamVerse ultimately securing the global release. The platform has committed to both a traditional theatrical release and an enhanced streaming version that will include additional interactive elements.</p>
      
      <p>Production is scheduled to begin next month, with a targeted release date in the fall of 2026.</p>
    `,
    published: true,
    featuredImage: "/placeholder.svg?height=500&width=1000",
    createdAt: "2025-03-07T12:00:00Z",
    authorId: "1",
    categoryId: "5",
    author: {
      name: "Admin User",
      image: null,
    },
    category: {
      name: "Entertainment",
      slug: "entertainment",
    },
  },
  {
    id: "6",
    title: "Opposition Party Announces New Leadership",
    slug: "opposition-party-announces-new-leadership",
    excerpt:
      "Following internal elections, the opposition party has announced its new leadership team for the upcoming political cycle.",
    content: `
      <p>The National Reform Party has elected a new leadership team following a closely contested internal election. The results, announced yesterday, show a significant shift toward a younger and more diverse group of leaders who have promised to reinvigorate the party's platform and electoral strategy.</p>
      
      <p>Dr. Maya Johnson, a 42-year-old economist and former university professor, has been elected as the new party chairperson, becoming the first woman to lead the party in its 75-year history. In her acceptance speech, Dr. Johnson emphasized the need for evidence-based policy solutions to address growing economic inequality and climate change.</p>
      
      <h2>Key Leadership Positions:</h2>
      <ul>
        <li>Chairperson: Dr. Maya Johnson</li>
        <li>Deputy Chair: Carlos Rodriguez</li>
        <li>Policy Director: Dr. Samuel Kim</li>
        <li>Communications Director: Aisha Patel</li>
        <li>Treasurer: Robert Chen</li>
      </ul>
      
      <p>Political analysts suggest that this leadership change represents a strategic pivot as the party prepares for next year's general election. The new team is expected to focus on expanding the party's appeal among younger voters and urban professionals, demographics where they have traditionally underperformed.</p>
      
      <p>The outgoing chairperson, James Wilson, who has led the party for the past eight years, expressed his full support for the new leadership. "The party is in excellent hands," Wilson stated. "This team has the vision and energy needed to connect with voters and present a compelling alternative to the current government."</p>
      
      <p>The new leadership will face its first major test next month when they unveil their updated policy platform at the annual party conference.</p>
    `,
    published: true,
    featuredImage: "/placeholder.svg?height=200&width=400",
    createdAt: "2025-03-06T12:00:00Z",
    authorId: "1",
    categoryId: "1",
    author: {
      name: "Admin User",
      image: null,
    },
    category: {
      name: "Politics",
      slug: "politics",
    },
  },
  {
    id: "7",
    title: "Tech Startup Secures Record Funding for Quantum Computing Project",
    slug: "tech-startup-secures-record-funding-for-quantum-computing-project",
    excerpt:
      "A promising startup has raised $300 million to develop practical quantum computing applications for businesses.",
    content: `
      <p>QuantumLeap Technologies, a startup founded just three years ago, has secured $300 million in Series C funding, marking one of the largest investments in the quantum computing sector to date. The funding round was led by Horizon Ventures, with participation from several major technology investment firms and corporate partners.</p>
      
      <p>The company has gained attention for its novel approach to quantum computing that focuses on practical business applications rather than purely theoretical advancements. Their proprietary architecture, which combines quantum and classical computing elements, has demonstrated promising results in solving complex optimization problems that are beyond the capabilities of traditional computing systems.</p>
      
      <h2>Planned Developments:</h2>
      <ul>
        <li>Expansion of their quantum hardware capabilities from 128 qubits to over 500 qubits</li>
        <li>Development of industry-specific quantum algorithms for finance, logistics, and pharmaceutical research</li>
        <li>Creation of a cloud-based platform to make quantum computing accessible to businesses without specialized expertise</li>
        <li>Establishment of a quantum computing research center in partnership with leading universities</li>
      </ul>
      
      <p>"This investment will accelerate our mission to bring practical quantum advantage to businesses across multiple industries," said Dr. Sophia Chen, CEO and co-founder of QuantumLeap. "We're not just focused on building powerful quantum systems, but on solving real-world problems that create measurable value."</p>
      
      <p>Industry analysts note that while quantum computing has long been promising, QuantumLeap's focus on specific business applications could help bridge the gap between theoretical quantum capabilities and practical implementation. The company has already established partnerships with several Fortune 500 companies to develop custom quantum solutions for their operational challenges.</p>
      
      <p>The funding will also enable the company to expand its team of quantum physicists, software engineers, and industry specialists from 85 to approximately 200 employees over the next 18 months.</p>
    `,
    published: true,
    featuredImage: "/placeholder.svg?height=200&width=400",
    createdAt: "2025-03-05T12:00:00Z",
    authorId: "1",
    categoryId: "2",
    author: {
      name: "Admin User",
      image: null,
    },
    category: {
      name: "Technology",
      slug: "technology",
    },
  },
  {
    id: "8",
    title: "Major Retailer Announces Sustainable Business Transformation",
    slug: "major-retailer-announces-sustainable-business-transformation",
    excerpt:
      "One of the world's largest retail chains unveils comprehensive plan to achieve carbon neutrality and zero waste by 2030.",
    content: `
      <p>Global retail giant RetailCo has announced an ambitious sustainability initiative that aims to transform every aspect of its business operations over the next five years. The comprehensive plan includes commitments to achieve carbon neutrality, eliminate waste sent to landfills, and ensure ethical practices throughout its supply chain.</p>
      
      <p>The initiative, named "Future Forward," represents a $2 billion investment and will touch every aspect of the company's operations, from manufacturing and transportation to store operations and product packaging. The company's CEO, Jennifer Martinez, described the move as "not just the right thing to do for the planet, but essential for our long-term business success."</p>
      
      <h2>Key Commitments:</h2>
      <ul>
        <li>100% renewable energy for all operations by 2027</li>
        <li>Carbon-neutral supply chain by 2030</li>
        <li>Zero waste to landfill from operations by 2028</li>
        <li>Fully sustainable or recyclable packaging for all private label products by 2026</li>
        <li>Comprehensive ethical labor standards for all suppliers</li>
      </ul>
      
      <p>The announcement has been generally well-received by environmental organizations, though some have pointed out that the timeline could be more aggressive. "This is a significant step in the right direction," said Environmental Action Network director Marcus Wong. "The comprehensiveness of the plan is impressive, though we would have liked to see even faster implementation in some areas."</p>
      
      <p>Investors have responded positively to the announcement, with the company's stock price rising 3% following the news. Market analysts suggest this reflects growing recognition that sustainability initiatives can drive long-term value creation through cost savings, risk reduction, and enhanced brand reputation.</p>
      
      <p>RetailCo has committed to transparent reporting on its progress, with annual sustainability reports to be verified by independent third-party auditors.</p>
    `,
    published: true,
    featuredImage: "/placeholder.svg?height=200&width=400",
    createdAt: "2025-03-04T12:00:00Z",
    authorId: "1",
    categoryId: "3",
    author: {
      name: "Admin User",
      image: null,
    },
    category: {
      name: "Business",
      slug: "business",
    },
  },
]

// Helper function to get articles by category
export function getArticlesByCategory(categorySlug: string) {
  return articles.filter((article) => article.category.slug === categorySlug)
}

// Helper function to get article by slug
export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}

// Helper function to get related articles
export function getRelatedArticles(categoryId: string, currentArticleId: string) {
  return articles.filter((article) => article.categoryId === categoryId && article.id !== currentArticleId).slice(0, 3)
}
