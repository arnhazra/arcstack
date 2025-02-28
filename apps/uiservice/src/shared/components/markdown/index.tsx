import React, { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { Button } from "../ui/button"

const MarkdownRenderer = ({
  markdown,
  user,
}: {
  markdown: string
  user: ReactNode
}) => {
  return (
    <div className="flex gap-4 mb-4">
      <Button
        size={"icon"}
        variant={"default"}
        className="bg-zinc-800 border-lightborder rounded-full -mt-2"
      >
        {user}
      </Button>
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
