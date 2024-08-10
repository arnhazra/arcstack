import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { JsonView, allExpanded } from "react-json-view-lite"
import "react-json-view-lite/dist/index.css"

export function ViewEvent({ eventObj }: { eventObj: any }) {
  const { _id, event, createdAt } = eventObj

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>View Event</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Event</DialogTitle>
          <DialogDescription>
            This event was created on {format(new Date(createdAt), "MMM, do yyyy, h:mm a")}
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4">
          <div className="items-center gap-4">
            <Label htmlFor="name" className="text-right pb-3">
              Event Id
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={_id}
              className="col-span-3"
            />
          </div>
          <div className="items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Event
            </Label>
            <JsonView data={event ?? {}} shouldExpandNode={allExpanded} />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="secondary">Close</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}