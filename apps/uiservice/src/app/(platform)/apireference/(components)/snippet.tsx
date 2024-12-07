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
import HTTPMethods from "@/shared/constants/http-methods"
import { Badge } from "@/shared/components/ui/badge"
import Show from "@/shared/components/show"
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs"
import CopyToClipboard from "@/shared/components/copy"

interface SnippetPanelProps {
  title: string
  method: HTTPMethods
  url: string
  request: Object
  response: Object
}

export default function SnippetPanel({
  title,
  url,
  method,
  request,
  response,
}: SnippetPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Badge variant="outline">{method}</Badge>
        <Input value={url} disabled />
        <CopyToClipboard value={url} />
      </CardContent>
      <CardFooter className="block">
        <Show condition={!!request}>
          <p className="text-sm mb-3">Sample Request</p>
          <SyntaxHighlighter
            language="json"
            style={stackoverflowLight}
            customStyle={{ maxHeight: "15rem" }}
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
            customStyle={{ maxHeight: "15rem" }}
          >
            {JSON.stringify(response, null, 2)}
          </SyntaxHighlighter>
        </Show>
      </CardFooter>
    </Card>
  )
}
