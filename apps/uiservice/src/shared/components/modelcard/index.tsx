import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { BaseModel, DerivedModel } from "@/shared/types"
import { AudioLines, Brain, CircleFadingPlus, Globe } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"
import Show from "../show"

interface BaseModelCardProps {
  model: BaseModel
}

interface DerivedModelCardProps {
  model: DerivedModel
}

export function BaseModelCard({ model }: BaseModelCardProps) {
  const {
    displayName,
    architecture,
    contextWindow,
    defaultTemperature,
    genericName,
    parameters,
    series,
    provider,
  } = model

  return (
    <Link href="/catalog">
      <Card className="w-full max-w-xs mx-auto h-[23rem] flex flex-col relative hover:shadow-md transition-shadow bg-background border-border text-white">
        <CardHeader className="pb-2">
          <div className="flex items-start">
            <Brain className="w-8 h-8 text-primary mr-3 mt-1 text-primary" />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center space-x-2">
                <CardTitle
                  className="text-lg font-bold truncate"
                  title={displayName}
                >
                  {displayName}
                </CardTitle>
              </div>
              <div className="flex items-center space-x-2 text-xs mt-1">
                <div className="flex items-center" title="Number of Parameters">
                  <AudioLines className="w-3 h-3 mr-1 text-primary" />
                  <span>{parameters}</span>
                </div>
                <div className="flex items-center" title="Context Window">
                  <CircleFadingPlus className="w-3 h-3 mr-1 text-secondary" />
                  <span>{contextWindow}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow py-2">
          <dl className="grid gap-3">
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">
                Architecture
              </dt>
              <dd className="text-sm font-semibold">{architecture}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">Provider</dt>
              <dd className="text-sm font-semibold capitalize">{provider}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">Series</dt>
              <dd className="text-sm font-semibold">{series}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">
                Generic Name
              </dt>
              <dd className="text-sm font-semibold capitalize">
                {genericName}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">
                Default Temperature
              </dt>
              <dd className="text-sm font-semibold">{defaultTemperature}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </Link>
  )
}

export function DerivedModelCard({ model }: DerivedModelCardProps) {
  const { _id, baseModel, category, displayName, hasWebSearchCapability } =
    model

  return (
    <Link href={`/model/${_id}`}>
      <Card className="w-full max-w-xs mx-auto h-[23rem] flex flex-col relative hover:shadow-md transition-shadow bg-background border-border text-white">
        <CardHeader className="pb-2">
          <div className="flex items-start">
            <Brain className="w-8 h-8 text-primary mr-3 mt-1 text-primary" />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center space-x-2">
                <CardTitle
                  className="text-lg font-bold truncate"
                  title={displayName}
                >
                  {displayName}
                </CardTitle>

                <Show condition={baseModel?.isPro || false}>
                  <Badge className="bg-primary hover:bg-primary ">Pro</Badge>
                </Show>
                <Show condition={hasWebSearchCapability}>
                  <Globe className="scale-75 text-cyan-400" />
                </Show>
              </div>
              <div className="flex items-center space-x-2 text-xs mt-1">
                <div className="flex items-center" title="Number of Parameters">
                  <AudioLines className="w-3 h-3 mr-1 text-primary" />
                  <span>{model?.baseModel?.parameters}</span>
                </div>
                <div className="flex items-center" title="Context Window">
                  <CircleFadingPlus className="w-3 h-3 mr-1 text-secondary" />
                  <span>{model?.baseModel?.contextWindow}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow py-2">
          <dl className="grid gap-3">
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">Category</dt>
              <dd className="text-sm font-semibold">{category}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">Base Model</dt>
              <dd className="text-sm font-semibold capitalize">
                {baseModel?.displayName}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">Provider</dt>
              <dd className="text-sm font-semibold capitalize">
                {baseModel?.provider}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">Series</dt>
              <dd className="text-sm font-semibold">{baseModel?.series}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">
                Architecture
              </dt>
              <dd className="text-sm font-semibold">
                {baseModel?.architecture}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </Link>
  )
}
