"use client"
import { Fragment } from "react"
import endPoints from "@/constants/apiEndpoints"
import Show from "@/components/Show"
import { Card, Container, Row, Table, Col } from "react-bootstrap"
import Loading from "@/components/Loading"
import HTTPMethods from "@/constants/httpMethods"
import withAuth from "@/utils/withAuth"
import { NextPage } from "next"
import useFetch from "@/hooks/useFetch"
import moment from "moment"
import Link from "next/link"
import { ExternalLinkIcon } from "@radix-ui/react-icons"

const WealthnowPortfoliosPage: NextPage = () => {
    const portfolios = useFetch("portfolios", endPoints.wealthnowGetPortfoliosEndpoint, HTTPMethods.POST)

    const portfoliosToDisplay = portfolios?.data?.portfolios?.map((portfolio: any) => {
        return (
            <tr key={portfolio._id}>
                <td>{portfolio.name}</td>
                <td>{moment(portfolio.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
                <td><Link href={`/wealthnow/portfolio?id=${portfolio._id}`}>Open Portfolio<ExternalLinkIcon className="icon-right" /></Link></td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Show when={!portfolios.isLoading}>
                <Container>
                    <Show when={portfolios?.data?.portfolios?.length > 0}>
                        <Link className="btn" href={'/wealthnow/createportfolio'}>Create Portfolio</Link>
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                                <Card className="p-4 mb-2 product-card-wealthnow">
                                    <p className="lead text-capitalize">Consolidated Asset</p>
                                    <p className="display-6 text-capitalize">₹ {portfolios?.data?.consolidatedAsset.toLocaleString()}</p>
                                </Card>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                                <Card className="p-4 mb-2 product-card-wealthnow">
                                    <p className="lead text-capitalize">Total Portfolios</p>
                                    <p className="display-6 text-capitalize">{portfolios?.data?.portfolios.length}</p>
                                </Card>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                                <Card className="p-4 mb-2 product-card-wealthnow">
                                    <p className="lead text-capitalize">Oldest Portfolio</p>
                                    <p className="display-6 text-capitalize">{portfolios?.data?.portfolios[0].name}</p>
                                </Card>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={3}>
                                <Card className="p-4 mb-2 product-card-wealthnow">
                                    <p className="lead text-capitalize">Latest Portfolio</p>
                                    <p className="display-6 text-capitalize">{portfolios?.data?.portfolios[portfolios?.data?.portfolios.length - 1].name}</p>
                                </Card>
                            </Col>
                        </Row>
                        <h4 className="text-white text-center mt-2">Portfolios</h4>
                        <Table responsive hover variant="light">
                            <thead>
                                <tr>
                                    <th>Portfolio Name</th>
                                    <th>Created At</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfoliosToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={portfolios?.data?.portfolios?.length === 0}>
                        <div className="box">
                            <p className="branding">Portfolios</p>
                            <p className="lead">No Portfolios to display</p>
                        </div>
                    </Show>
                </Container>
            </Show >
            <Show when={portfolios.isLoading}>
                <Loading />
            </Show>
        </Fragment >
    )
}

export default withAuth(WealthnowPortfoliosPage)