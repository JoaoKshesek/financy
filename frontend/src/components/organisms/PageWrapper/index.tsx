import * as React from "react"

export type PageWrapperProps = {
  children?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
}

export function PageWrapper({
  children,
  title,
  description,
  action,
}: PageWrapperProps) {
  const hasHeader = Boolean(title || description || action)

  return (
    <div className="flex min-h-[calc(100vh-9rem)] flex-col gap-8 py-[48px]">
      {hasHeader && (
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            {title && (
              <h1 className="text-2xl leading-8 font-bold text-gray-800">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-base leading-6 font-normal text-gray-600">
                {description}
              </p>
            )}
          </div>

          {action}
        </div>
      )}

      {children}
    </div>
  )
}
