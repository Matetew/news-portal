import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

async function setupDatabase() {
  try {
    console.log("Generating Prisma client...")
    await execAsync("npx prisma generate")

    console.log("Pushing database schema...")
    await execAsync("npx prisma db push")

    console.log("Seeding database...")
    await execAsync("npm run db:seed")

    console.log("Database setup completed successfully!")
    console.log("\nYou can now:")
    console.log("1. Run 'npm run dev' to start the development server")
    console.log("2. Visit http://localhost:3000 to see your news portal")
    console.log("3. Login with admin@example.com / password123 to access admin features")
  } catch (error) {
    console.error("Error setting up database:", error)
    process.exit(1)
  }
}

setupDatabase()
