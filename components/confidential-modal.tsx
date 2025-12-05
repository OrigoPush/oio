'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ConfidentialModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ConfidentialModal({ isOpen, onClose }: ConfidentialModalProps) {
  const [copied, setCopied] = useState(false)
  const email = 'hello@rodrigosanchez.design'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center px-6 transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-card border border-border rounded-lg p-8 md:p-12 max-w-lg w-full shadow-2xl transition-all duration-300',
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-balance">
            This project is confidential.
          </h3>
          <p className="text-muted-foreground text-lg">
            If you want to know more, contact me:
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="font-mono text-sm md:text-base">{email}</p>
            </div>

            <Button
              onClick={copyEmail}
              className="w-full"
              size="lg"
            >
              {copied ? 'Copied!' : 'Copy email'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
