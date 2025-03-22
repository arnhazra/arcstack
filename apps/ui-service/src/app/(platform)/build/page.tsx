"use client"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Label } from "@/shared/components/ui/label"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { BaseModel } from "@/shared/types"
import { useContext, useState } from "react"
import ky from "ky"
import { uiConstants } from "@/shared/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { SubscriptionModal } from "@/shared/components/subscriptionmodal"

const categories = [
  "General",
  "Education",
  "Entertainment",
  "Healthcare",
  "Lifestyle",
  "Productivity",
  "Programming",
  "Research",
  "Social Media",
  "Sports",
  "Travel",
  "Writing",
  "Others",
]

export default function Page() {
  const [{ isSubscriptionActive, user }] = useContext(GlobalContext)
  const [state, setState] = useState({
    baseModel: "",
    category: "",
    description: "",
    systemPrompt: "",
    displayName: "",
    isPublic: false,
  })
  const [isLoading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const baseModels = useQuery<BaseModel[]>({
    queryKey: ["base-models"],
    queryUrl: endPoints.baseModel,
    method: HTTPMethods.GET,
  })

  const submitForm = async (event: any) => {
    event.preventDefault()

    try {
      setLoading(true)
      setMessage("")
      await ky.post(endPoints.createDerivedModel, { json: state })
      setMessage(uiConstants.modelCreated)
    } catch (error) {
      setMessage(uiConstants.modelCreationFailed)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SubscriptionModal
        open={!isSubscriptionActive}
        customMessage="You need Pro subscription to build custom model"
        onOpenChange={(): void => undefined}
      />
      <Card className="w-full max-w-2xl mx-auto bg-background border-border text-white">
        <CardHeader>
          <CardTitle>Create a Model</CardTitle>
          <CardDescription className="text-zinc-300">
            Fill out the form below to create a new model.
          </CardDescription>
        </CardHeader>
        <form onSubmit={submitForm}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                disabled={isLoading}
                autoComplete="off"
                className="bg-border border-lightborder"
                id="displayName"
                name="displayName"
                placeholder="Enter a name for your model"
                onChange={(e): void =>
                  setState({ ...state, displayName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                disabled={isLoading}
                id="description"
                name="description"
                placeholder="Describe your model's purpose and capabilities"
                className="min-h-[100px] bg-border border-lightborder"
                required
                onChange={(e): void =>
                  setState({ ...state, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                disabled={isLoading}
                name="category"
                required
                onValueChange={(value) =>
                  setState({ ...state, category: value })
                }
              >
                <SelectTrigger
                  id="category"
                  className="bg-border border-lightborder"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-border border-lightborder">
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-white"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="baseModel">Base Model</Label>
              <Select
                disabled={isLoading}
                name="baseModel"
                required
                onValueChange={(value) =>
                  setState({ ...state, baseModel: value })
                }
              >
                <SelectTrigger
                  id="baseModel"
                  className="bg-border border-lightborder"
                >
                  <SelectValue placeholder="Select a base model" />
                </SelectTrigger>
                <SelectContent className="bg-border border-lightborder">
                  {baseModels?.data?.map((model) => (
                    <SelectItem
                      key={model?._id}
                      value={model?._id}
                      className="text-white"
                    >
                      {model?.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea
                disabled={isLoading}
                id="systemPrompt"
                name="systemPrompt"
                placeholder="Enter the system prompt for your model"
                className="min-h-[100px] bg-border border-lightborder"
                required
                onChange={(e): void =>
                  setState({ ...state, systemPrompt: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isPublic">Visibility</Label>
              <Select
                value={state.isPublic ? "true" : "false"}
                disabled={isLoading || user.role === "user"}
                name="isPublic"
                required
                onValueChange={(value) =>
                  setState({ ...state, isPublic: value === "true" })
                }
              >
                <SelectTrigger
                  id="isPublic"
                  className="bg-border border-lightborder"
                >
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent className="bg-border border-lightborder">
                  <SelectItem value={"true"} className="text-white">
                    Public
                  </SelectItem>
                  <SelectItem value="false" className="text-white">
                    Private
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-md text-white block">{message}</p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary"
            >
              Create Model
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}
