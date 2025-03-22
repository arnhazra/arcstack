"use client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { Input } from "@/shared/components/ui/input"
import { Badge } from "@/shared/components/ui/badge"
import Show from "@/shared/components/show"
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs"
import CopyToClipboard from "@/shared/components/copy"
import Link from "next/link"

interface SnippetPanelProps {
  title: string
  description: string
  method: string
  url: string
  request: Object
  response: Object
}

export default function SnippetPanel({
  title,
  description,
  url,
  method,
  request,
  response,
}: SnippetPanelProps) {
  return (
    <Card className="mt-2 bg-background border-border text-white">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-zinc-300">{description}</p>
        <div className="text-secondary">
          You must add your API Key in x-api-key header, get your API Key{" "}
          <Link className="underline" href="/settings/apikey">
            here
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Badge variant="destructive">{method}</Badge>
        <Input
          value={url}
          disabled
          className="bg-background border-border text-white"
        />
        <CopyToClipboard value={url} />
      </CardContent>
      <CardFooter className="block">
        <Show condition={!!request}>
          <p className="text-sm mb-3">Sample Request</p>
          <SyntaxHighlighter
            language="json"
            style={stackoverflowLight}
            customStyle={{
              maxHeight: "15rem",
              background: "#18181b",
              color: "#ffffff",
              borderColor: "#27272a",
              border: "1px solid #27272a",
              borderRadius: "0.5rem",
            }}
          >
            {JSON.stringify(request, null, 2)}
          </SyntaxHighlighter>
        </Show>
        <Show condition={!!response}>
          <p className="text-sm mt-3 mb-3">Sample Response</p>
          <SyntaxHighlighter
            wrapLongLines
            language="json"
            style={stackoverflowLight}
            customStyle={{
              maxHeight: "15rem",
              background: "#18181b",
              color: "#ffffff",
              borderColor: "#27272a",
              border: "1px solid #27272a",
              borderRadius: "0.5rem",
            }}
          >
            {JSON.stringify(response, null, 2)}
          </SyntaxHighlighter>
        </Show>
      </CardFooter>
    </Card>
  )
}
