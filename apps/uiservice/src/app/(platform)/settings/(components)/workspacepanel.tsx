"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { CheckCircle2, Key, Recycle, Trash } from "lucide-react"
import { format } from "date-fns"
import Show from "@/shared/components/show"
import SectionPanel from "./sectionpanel"
import CopyToClipboard from "@/shared/components/copy"

interface WorkspacePanelProps {
  workspaceId: string
  displayName: string
  createdAt: string
  apiKey: string
  onRegenCred: (workspaceId: string) => void
  onDelete: (workspaceId: string) => void
}

export default function WorkspacePanel({
  workspaceId,
  displayName,
  createdAt,
  apiKey,
  onRegenCred,
  onDelete,
}: WorkspacePanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md flex gap-2">{displayName}</CardTitle>
        <CardDescription className="text-sm">
          {format(new Date(createdAt), "MMM, do yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <SectionPanel
          icon={<Key className="scale-75" />}
          title="Access Key"
          content={apiKey}
          masked
          actionComponent={<CopyToClipboard value={apiKey} />}
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="default"
          size="icon"
          className="rounded-full"
          onClick={() => onRegenCred(workspaceId)}
        >
          <Recycle className="scale-75" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={() => onDelete(workspaceId)}
        >
          <Trash className="scale-75" />
        </Button>
      </CardFooter>
    </Card>
  )
}
