"use client"
import { BoxIcon, BoxesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useContext, useState } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import axios from "axios"
import { usePromptContext } from "@/context/providers/prompt.provider"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import MaskText from "@/components/mask"
import Error from "@/components/error"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const [{ userState, appState }, dispatch] = useContext(GlobalContext)
  const workspaces = useQuery(["workspaces", appState.refreshId], endPoints.findMyWorkspaces, HTTPMethods.GET)
  const { prompt } = usePromptContext()

  const createWorkspace = async () => {
    const { hasConfirmed, value } = await prompt("New Workspace Name")

    if (hasConfirmed && value) {
      try {
        await axios.post(endPoints.createWorkspace, { name: value })
        dispatch("setAppState", { refreshId: Math.random().toString() })
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">Workspace created</p>,
          action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
        })
      }

      catch (error) {
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">Creating workspace failed</p>,
          action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
        })
      }
    }
  }

  const switchWorkspace = async (workspaceId: string) => {
    try {
      await axios.post(`${endPoints.switchWorkspace}?workspaceId=${workspaceId}`)
      dispatch("setAppState", { refreshId: Math.random().toString(36).substring(7) })
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">Workspace switched</p>,
        action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
      })
    }

    catch (error) {
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">Workspace switching failed</p>,
        action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
      })
    }
  }

  const renderWorkspaces = workspaces?.data?.myWorkspaces?.map((workspace: any) => {
    return (
      <TableRow className="cursor-pointer" key={workspace._id}>
        <TableCell>
          <div className="font-medium">{workspace?.name}</div>
        </TableCell>
        <TableCell className="text-neutral-500 hidden md:table-cell"><MaskText value={workspace?.clientId} /></TableCell>
        <TableCell className="text-neutral-500 hidden md:table-cell"><MaskText value={workspace?.clientSecret} /></TableCell>
        <TableCell className="text-right">
          <Button variant="outline" disabled={userState.selectedWorkspaceId === workspace?._id} className="btn-block" onClick={(): Promise<void> => switchWorkspace(workspace._id)}>
            <Suspense condition={userState.selectedWorkspaceId !== workspace?._id} fallback={<>Selected</>}>
              Switch
            </Suspense>
          </Button>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!workspaces.isLoading} fallback={<Loading />}>
      <Suspense condition={!workspaces.error} fallback={<Error />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Workspace
                  </CardTitle>
                  <BoxIcon className="h-4 w-4 text-muted-foreground scale-150" />
                </CardHeader>
                <CardContent>
                  <p className="text-md text-slate-600">
                    A workspace in {uiConstants.brandName} is a place where you can
                    collaborate and make collective decisions using data.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="flex items-center" onClick={createWorkspace}>Create Workspace</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Workspace Count
                  </CardTitle>
                  <BoxesIcon className="h-4 w-4 text-muted-foreground scale-150" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{workspaces.data?.myWorkspaces?.length}</div>
                  <p className="text-sm text-slate-600">
                    Total number of workspaces
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Selected Workspace
                  </CardTitle>
                  <BoxesIcon className="h-4 w-4 text-muted-foreground scale-150" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{workspaces.data?.myWorkspaces?.find((item: any) => item._id === userState.selectedWorkspaceId).name}</div>
                  <p className="text-sm text-slate-600">
                    Your current selected workspace
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Workspaces</CardTitle>
                  <CardDescription>
                    Your List of Workspaces
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Display Name</TableHead>
                      <TableHead className="hidden md:table-cell">Client ID</TableHead>
                      <TableHead className="hidden md:table-cell">Client Secret</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {renderWorkspaces}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}
