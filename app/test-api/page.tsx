import { testApiConnection } from "@/lib/api"

export default async function TestApiPage() {
  const result = await testApiConnection()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Test Result:</h2>
        <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Check the browser console for detailed logs about the API response structure.
        </p>
      </div>
    </div>
  )
}
