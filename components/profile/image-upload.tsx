"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Upload, X, User } from "lucide-react"

interface ImageUploadProps {
  currentImage: string | null // Base64 string
  imageType: string | null
  userId: string
}

export default function ImageUpload({ currentImage, imageType, userId }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Convert base64 string to data URL for display
  const getImageUrl = () => {
    if (preview) return preview
    if (currentImage && imageType) {
      return `data:${imageType};base64,${currentImage}`
    }
    return null
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload image")
      }

      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      })

      // Trigger navbar refresh
      window.dispatchEvent(new CustomEvent("profileImageUpdated"))
      router.refresh()
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      })
      setPreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = async () => {
    setIsUploading(true)

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: null, imageType: null }),
      })

      if (!response.ok) {
        throw new Error("Failed to remove image")
      }

      toast({
        title: "Success",
        description: "Profile picture removed successfully",
      })

      setPreview(null)
      // Trigger navbar refresh
      window.dispatchEvent(new CustomEvent("profileImageUpdated"))
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const displayImage = getImageUrl()

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Image Display */}
      <div className="relative">
        {displayImage ? (
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
            <Image
              src={displayImage || "/placeholder.svg"}
              alt="Profile picture"
              fill
              className="object-cover"
              unoptimized
            />
            {currentImage && !isUploading && (
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
            <User className="h-16 w-16 text-gray-400" />
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <div className="flex flex-col items-center space-y-2">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

        <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading} variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          {currentImage ? "Change Picture" : "Upload Picture"}
        </Button>

        <p className="text-xs text-gray-500 text-center">JPG, PNG or GIF. Max size 5MB.</p>
      </div>
    </div>
  )
}
