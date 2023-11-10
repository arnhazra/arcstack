"use client"
import Error from "@/_components/ErrorComp"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useConfirm from "@/_hooks/useConfirm"
import useFetch from "@/_hooks/useFetch"
import { ArchiveIcon, CopyIcon } from "@radix-ui/react-icons"
import axios from "axios"
import moment from "moment"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { toast } from "react-hot-toast"
import Constants from "@/_constants/appConstants"
import GenericHero from "@/_components/GenericHero"

export default function Page() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get("projectId")
  const project = useFetch("view project", `${endPoints.frostlakeViewProjectEndpoint}?projectId`, HTTPMethods.POST, { projectId }, true)
  const router = useRouter()
  const { confirmDialog, confirm } = useConfirm()

  const analyticsToDisplay = project?.data?.analytics?.map((ant: any) => {
    return (
      <tr key={ant._id}>
        <td>{ant.component}</td>
        <td>{ant.event}</td>
        <td>{ant.info}</td>
        <td>{ant.statusCode}</td>
        <td>{moment(ant.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
      </tr>
    )
  })

  const archiveProject = async () => {
    const userConsent = await confirm("Are you sure to archive this project?")

    if (userConsent) {
      await axios.delete(`${endPoints.frostlakeDeleteProjectEndpoint}?projectId=${projectId}`)
      router.push("/apps/frostlake")
    }
  }

  const copyClientId = (): void => {
    navigator.clipboard.writeText(`${project?.data?.project?.clientId}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  const copyClientSecret = (): void => {
    navigator.clipboard.writeText(`${project?.data?.project?.clientSecret}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  return (
    <Fragment>
      <Show when={!project?.isLoading}>
        <Show when={!project.error || !!projectId}>
          <Container>
            <GenericHero>
              <p className="display-6 text-capitalize">{project?.data?.project?.name}</p>
              <p className="lead mt-3">Your Project Analytics will be displayed below (if any)</p>
              <Button onClick={copyClientId}>Copy Client Id<CopyIcon className="icon-right" /></Button>
              <Button onClick={copyClientSecret}>Copy Client Secret<CopyIcon className="icon-right" /></Button>
              <Button onClick={archiveProject}>Archive Project<ArchiveIcon className="icon-right" /></Button>
            </GenericHero>
            <Show when={!!project?.data?.analytics && project?.data?.analytics.length}>
              <h4 className="text-white">Analytics</h4>
              <Table responsive hover variant="light">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Event</th>
                    <th>Info</th>
                    <th>Status Code</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsToDisplay}
                </tbody>
              </Table>
            </Show>
            {confirmDialog()}
          </Container>
        </Show>
        <Show when={!!project.error || !projectId}>
          <Error />
        </Show>
      </Show>
      <Show when={project?.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}