import fs from "fs"
import path from "path"

function findDynamicRoutes(dir: string, routes: string[] = []): string[] {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Check if this is a dynamic route directory
      if (file.startsWith("[") && file.endsWith("]")) {
        routes.push(filePath)
      }
      // Recursively search subdirectories
      findDynamicRoutes(filePath, routes)
    }
  }

  return routes
}

const appDir = path.join(process.cwd(), "app")
const dynamicRoutes = findDynamicRoutes(appDir)

console.log("Dynamic routes found:")
dynamicRoutes.forEach((route) => {
  console.log(route)
})

// Group routes by their parent path to find conflicts
const routesByParent: Record<string, string[]> = {}

dynamicRoutes.forEach((route) => {
  const parentPath = path.dirname(route)
  const routeName = path.basename(route)

  if (!routesByParent[parentPath]) {
    routesByParent[parentPath] = []
  }

  routesByParent[parentPath].push(routeName)
})

console.log("\nPotential conflicts:")
Object.entries(routesByParent).forEach(([parent, routes]) => {
  if (routes.length > 1) {
    console.log(`${parent}: ${routes.join(", ")}`)
  }
})
