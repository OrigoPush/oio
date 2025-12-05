import { cn } from '@/lib/utils'

interface LayoutContainerProps {
  children: React.ReactNode
  className?: string
}

export function LayoutContainer({ children, className }: LayoutContainerProps) {
  return (
    <div className={cn('w-full px-4 lg:px-6', className)}>
      {children}
    </div>
  )
}
