import { Check } from "lucide-react"
import { Button } from "../ui/button"

export function TeachCard() {
  return (
    <div className="bg-background border-white p-8 rounded-lg">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl">Teach</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white bg-primary hover:bg-primary"
        >
          <Check className="h-4 w-4 text-white" />
          <span className="sr-only">Learn more about teaching</span>
        </Button>
      </div>
      <div className="flex gap-8 mb-8 justify-center">
        <div className="w-16 h-16 bg-main rounded-full" />
        <div className="w-16 h-16 bg-zinc-100 rounded-full" />
      </div>
      <p className="text-md leading-relaxed">
        We start by teaching our AI right from wrong, filtering harmful content
        and responding with empathy.
      </p>
    </div>
  )
}

export function TestCard() {
  return (
    <div className="bg-background border-border p-8 rounded-lg">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl">Test</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-primary hover:bg-primary"
        >
          <Check className="h-4 w-4 text-white" />
          <span className="sr-only">Learn more about testing</span>
        </Button>
      </div>
      <div className="flex justify-center mb-8">
        <div className="w-64 h-32 relative">
          <div className="absolute top-0 left-0 bg-primary p-2 rounded-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute top-12 left-4 w-48 h-4 bg-zinc-100 rounded" />
          <div className="absolute top-20 left-4 w-36 h-4 bg-zinc-100 rounded" />
        </div>
      </div>
      <p className="text-md leading-relaxed">
        We conduct internal evaluations and work with experts to test real-world
        scenarios, enhancing our safeguards.
      </p>
    </div>
  )
}

export function ShareCard() {
  return (
    <div className="bg-background p-8 rounded-lg">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl">Share</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-primary hover:bg-primary"
        >
          <Check className="h-4 w-4 text-white" />
          <span className="sr-only">Learn more about sharing</span>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8 max-w-[200px] mx-auto">
        <div className="space-y-4">
          <div className="w-16 h-16">
            <div className="w-16 h-8 bg-zinc-100 rounded-t-full" />
            <div className="w-16 h-8 bg-main rounded-b-full" />
          </div>
          <div className="w-16 h-16">
            <div className="w-16 h-8 bg-zinc-100 rounded-t-full" />
            <div className="w-16 h-8 bg-main rounded-b-full" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="w-16 h-16">
            <div className="w-16 h-8 bg-zinc-100 rounded-t-full" />
            <div className="w-16 h-8 bg-main rounded-b-full" />
          </div>
          <div className="w-16 h-16 relative">
            <div className="w-16 h-8 bg-zinc-100 rounded-t-full" />
            <div className="w-16 h-8 bg-main rounded-b-full" />
            <div className="absolute bottom-0 right-0 bg-primary p-1 rounded-lg">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="text-md leading-relaxed">
        We use real-world feedback to help make our AI safer and more helpful.
      </p>
    </div>
  )
}
