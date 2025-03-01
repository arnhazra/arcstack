import React, { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

const MarkdownRenderer = ({
  markdown,
  user,
}: {
  markdown: string
  user: ReactNode
}) => {
  return (
    <div className="gap-4 mb-4">
      <p className="text-zinc-400">{user}</p>
      <div className="block">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ className, children, ...props }) {
              const isInline = !className
              return isInline ? (
                <code className="bg-zinc-800 p-1 rounded">{children}</code>
              ) : (
                <pre className="bg-zinc-800 text-white p-4 rounded overflow-auto">
                  <code {...props} className={className}>
                    {children}
                  </code>
                </pre>
              )
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default MarkdownRenderer
