"use client"
import ErrorComponent from "@/components/error"
import LoadingComponent from "@/components/loading"
import Suspense from "@/components/suspense"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { format } from "date-fns"
import CurrentOrgCard from "@/components/currentorgcard"
import CurrentProductCard from "@/components/currentproductcard"
import { DataModal } from "@/components/datamodal"

export default function Page() {
  const dataList = useQuery(["datalist"], `${endPoints.httpnosqlReadData}`, HTTPMethods.GET)

  const renderData = dataList?.data?.map((data: any) => {
    return (
      <TableRow className="cursor-pointer" key={data._id}>
        <TableCell><div className="font-medium">{data?.key}</div></TableCell>
        <TableCell className="text-slate-500"><DataModal dataObj={data} /></TableCell>
        <TableCell className="text-right text-slate-500 hidden md:table-cell">{format(new Date(data.createdAt), "MMM, do yyyy, h:mm a")}</TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!dataList.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!dataList.error} fallback={<ErrorComponent />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <CurrentProductCard />
              <CurrentOrgCard />
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Data Count</CardDescription>
                  <CardTitle className="text-4xl">{dataList?.data?.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Total number of data
                    in this organization
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
            </div>
            <Card>
              <CardHeader className="px-7">
                <CardTitle>Database</CardTitle>
                <CardDescription>
                  Your Datalist list in this organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense condition={dataList?.data?.length > 0} fallback={<p className="text-center">No data to display</p>}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="text-right hidden md:table-cell">Created At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderData}
                    </TableBody>
                  </Table>
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}