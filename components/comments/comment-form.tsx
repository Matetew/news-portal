'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Send, X } from 'lucide-react'
import Image from 'next/image'

interface Comment {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string | null
    image: string | null
  }
  replies?: Comment[]
}

interface CommentFormProps {
  articleId: string
  parentId?: string
  onCommentAdded: (comment: Comment) => void
  onCancel?: () => void
  placeholder?: string
  buttonText?: string
}

export default function CommentForm({
  articleId,
  parentId,
  onCommentAdded,
  onCancel,
  placeholder = "Share your thoughts...",
  buttonText = "Post Comment"
}: CommentFormProps) {
  const { data: session } = useSession()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userData, setUserData] = useState<{
    id: string
    name: string | null
    updatedAt?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const maxLength = 500

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          setIsLoading(true)
          const response = await fetch('/api/profile')
          
          if (!response.ok) {
            throw new Error('Failed to fetch user data')
          }
          
          const user = await response.json()
          setUserData({
            id: user.id,
            name: user.name || null,
            updatedAt: user.updatedAt
          })
        } catch (error) {
          console.error("Error fetching user data:", error)
          // Fallback to session data if API fails
          setUserData({
            id: session.user.id,
            name: session.user.name || null
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchUserData()
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) {
      setError('Comment cannot be empty')
      return
    }

    if (content.length > maxLength) {
      setError(`Comment must be ${maxLength} characters or less`)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          articleId,
          parentId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to post comment')
      }

      const newComment = await response.json()
      onCommentAdded(newComment)
      setContent('')
      
      if (onCancel) {
        onCancel()
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to post comment'
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setContent('')
    setError(null)
    if (onCancel) {
      onCancel()
    }
  }

  if (!session || isLoading) {
    return null
  }

  return (
    <Card className={parentId ? "ml-8 mt-4" : ""}>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              {userData?.id ? (
                <Image
                  src={`/api/profile/image/${userData.id}?v=${userData.updatedAt ? new Date(userData.updatedAt).getTime() : Date.now()}`}
                  alt={userData?.name || 'User'}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              ) : null}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {userData?.name || 'Anonymous'}
            </span>
          </div>

          {/* Comment Input */}
          <div className="space-y-2">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              className="min-h-[100px] resize-none"
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span className={content.length > maxLength ? 'text-red-500' : ''}>
                {content.length}/{maxLength}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim() || content.length > maxLength}
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Posting...' : buttonText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}