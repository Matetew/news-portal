const fs = require("fs")
const path = require("path")

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
    } else {
      arrayOfFiles.push(filePath)
    }
  })

  return arrayOfFiles
}

function findDynamicRoutes() {
  const appDir = path.join(process.cwd(), "app")
  const allFiles = getAllFiles(appDir)

  const dynamicRoutes = []
  const dynamicSegments = new Map()

  allFiles.forEach((file) => {
    const relativePath = path.relative(process.cwd(), file)
    const parts = relativePath.split(path.sep)

    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith("[") && parts[i].endsWith("]")) {
        const routePath = parts.slice(0, i + 1).join("/")
        const paramName = parts[i].slice(1, -1)

        dynamicRoutes.push({
          path: routePath,
          paramName,
          file: relativePath,
        })

        // Store the parameter name for this route path
        if (!dynamicSegments.has(routePath)) {
          dynamicSegments.set(routePath, new Set())
        }
        dynamicSegments.get(routePath).add(paramName)
      }
    }
  })

  console.log("Dynamic routes:")
  dynamicRoutes.forEach((route) => {
    console.log(`${route.path} (${route.paramName}) - ${route.file}`)
  })

  console.log("\nPotential conflicts:")
  dynamicSegments.forEach((params, routePath) => {
    if (params.size > 1) {
      console.log(`${routePath}: ${Array.from(params).join(", ")}`)
    }
  })
}

findDynamicRoutes()
