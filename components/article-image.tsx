"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface ArticleImageProps {
  src: string | null
  alt: string
  className?: string
  driveId?: string
}

export default function ArticleImage({ src, alt, className = "", driveId }: ArticleImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string | null>(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (driveId) {
      // Use our proxy API route
      const proxyUrl = `/api/proxy-image?id=${driveId}`
      console.log(`Loading image via proxy for drive ID: ${driveId}`)
      setCurrentSrc(proxyUrl)
    } else if (src) {
      console.log(`Loading image from src: ${src}`)
      setCurrentSrc(src)
    } else {
      console.log(`No image source provided for: ${alt}`)
      setHasError(true)
      setIsLoading(false)
    }
  }, [driveId, src, alt])

  const handleError = () => {
    console.error(`Image failed to load: ${currentSrc}`)
    setHasError(true)
    setIsLoading(false)
    setCurrentSrc(`/placeholder.svg?height=500&width=800&text=${encodeURIComponent(alt)}`)
  }

  const handleLoad = () => {
    console.log(`Image loaded successfully: ${currentSrc}`)
    setIsLoading(false)
    setHasError(false)
  }

  if (!currentSrc) {
    return (
      <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500">No image</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-gray-100">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      <Image
        src={currentSrc || "/placeholder.svg"}
        alt={alt}
        fill
        className={`object-cover ${className} ${hasError ? "opacity-75" : ""} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        priority
        unoptimized
        onError={handleError}
        onLoad={handleLoad}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Image not available</p>
            {driveId && <p className="text-xs text-gray-400 mt-1">ID: {driveId}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
