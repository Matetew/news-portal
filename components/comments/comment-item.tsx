'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { MoreHorizontal, Edit, Trash2, Reply, Save, X, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import CommentForm from './comment-form'

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

interface CommentItemProps {
  comment: Comment
  articleId: string
  currentUserId?: string
  onCommentUpdated: (comment: Comment) => void
  onCommentDeleted: (commentId: string) => void
  onReplyAdded: (parentId: string, reply: Comment) => void
  isReply?: boolean
}

export default function CommentItem({
  comment,
  articleId,
  currentUserId,
  onCommentUpdated,
  onCommentDeleted,
  onReplyAdded,
  isReply = false
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isOwner = currentUserId === comment.user.id
  const maxLength = 500

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`
    }
  }

  const handleEdit = async () => {
    if (!editContent.trim()) {
      setError('Comment cannot be empty')
      return
    }

    if (editContent.length > maxLength) {
      setError(`Comment must be ${maxLength} characters or less`)
      return
    }

    setIsUpdating(true)
    setError(null)

    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editContent.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update comment')
      }

      const updatedComment = await response.json()
      onCommentUpdated(updatedComment)
      setIsEditing(false)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update comment'
      setError(errorMessage)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete comment')
      }

      onCommentDeleted(comment.id)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete comment'
      setError(errorMessage)
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleReplyAdded = (newReply: Comment) => {
    onReplyAdded(comment.id, newReply)
    setIsReplying(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditContent(comment.content)
    setError(null)
  }

  return (
    <div className={`space-y-4 ${isReply ? 'ml-8 border-l-2 border-gray-100 pl-4' : ''}`}>
      <Card>
        <CardContent className="p-4">
          {/* Comment Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {comment.user.id ? (
                  <Image
                    src={`/api/profile/image/${comment.user.id}?v=${Date.now()}`}
                    alt={comment.user.name || 'User'}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                ) : (
                  <User className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {comment.user.name || 'Anonymous'}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(comment.createdAt)}
                  {comment.updatedAt !== comment.createdAt && (
                    <span className="ml-1">(edited)</span>
                  )}
                </p>
              </div>
            </div>

            {/* Actions Menu */}
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Comment Content */}
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[80px] resize-none"
                disabled={isUpdating}
              />
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className={editContent.length > maxLength ? 'text-red-500' : ''}>
                  {editContent.length}/{maxLength}
                </span>
              </div>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleEdit}
                  disabled={isUpdating || !editContent.trim() || editContent.length > maxLength}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isUpdating ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={isUpdating}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-800 whitespace-pre-wrap mb-3">
                {comment.content}
              </p>
              
              {/* Reply Button */}
              {currentUserId && !isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Reply Form */}
      {isReplying && (
        <CommentForm
          articleId={articleId}
          parentId={comment.id}
          onCommentAdded={handleReplyAdded}
          onCancel={() => setIsReplying(false)}
          placeholder="Write a reply..."
          buttonText="Post Reply"
        />
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              articleId={articleId}
              currentUserId={currentUserId}
              onCommentUpdated={onCommentUpdated}
              onCommentDeleted={onCommentDeleted}
              onReplyAdded={onReplyAdded}
              isReply={true}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}