"use client"
import { Fragment, useContext, useState, useEffect } from "react"
import { Button, Col, Row } from "react-bootstrap"
import endPoints from "@/constants/apiEndpoints"
import { useRouter } from "next/navigation"
import { AppContext } from "@/context/appStateProvider"
import axios from "axios"
import { toast } from "react-hot-toast"
import Constants from "@/constants/appConstants"
import withAuth from "@/utils/withAuth"
import { NextPage } from "next"
import Web3 from "web3"
import Show from "@/components/Show"
import Loading from "@/components/Loading"
import Link from "next/link"
import useFetch from "@/hooks/useFetch"
import HTTPMethods from "@/constants/httpMethods"
import { AvatarIcon, BookmarkIcon, CopyIcon, ExitIcon, ExternalLinkIcon } from "@radix-ui/react-icons"

const AccountPage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const contractAddress = useFetch("contract-address", endPoints.getContractAddressList, HTTPMethods.POST)
    const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraApiKey}`)
    const [walletLoading, setWalletLoading] = useState(true)
    const [accountAddress, setAccountAddress] = useState("")
    const [maticBalance, setMaticBalance] = useState("0")
    const router = useRouter()

    useEffect(() => {
        (async () => {
            if (!contractAddress.isLoading) {
                try {
                    const { privateKey } = userState
                    const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
                    setAccountAddress(walletAddress)
                    const maticBalanceInWei = await web3Provider.eth.getBalance(walletAddress)
                    const maticBalance = web3Provider.utils.fromWei(maticBalanceInWei, "ether")
                    setMaticBalance(maticBalance)
                } catch (error) {
                    toast.error(Constants.ErrorMessage)
                } finally {
                    setWalletLoading(false)
                }
            }
        })()
    }, [userState, contractAddress.isLoading])

    const signOutFromThisDevice = () => {
        localStorage.removeItem("accessToken")
        router.push("/")
    }

    const signOutFromAllDevices = async () => {
        try {
            await axios.post(endPoints.signOutEndpoint)
            localStorage.removeItem("accessToken")
            router.push("/")
        } catch (error) {
            toast.error(Constants.ToastError)
        }
    }

    const showWalletAddress = (address: string) => {
        const displayAddress = `(${address.substring(0, 3)}...${address.substring(address.length - 3)})`
        return displayAddress
    }

    const copyWalletAddress = (): void => {
        navigator.clipboard.writeText(`${accountAddress}`)
        toast.success(Constants.CopiedToClipBoard)
    }

    return (
        <Fragment>
            <Show when={walletLoading}>
                <Loading />
            </Show>
            <Show when={!walletLoading}>
                <div className="box">
                    <p className="branding">Account</p>
                    <Row className="mb-2 mt-4">
                        <Col className="categorycol">
                            <AvatarIcon />
                        </Col>
                        <Col>
                            <p className="boxcategorytext">Hello, {userState.name.split(" ")[0]}</p>
                            <div className="boxcategorytext">
                                Wallet Address {showWalletAddress(accountAddress)}<CopyIcon className="icon-right" onClick={copyWalletAddress} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-2 mt-4">
                        <Col className="categorycol">
                            <BookmarkIcon />
                        </Col>
                        <Col>
                            <p className="boxcategorytext">Wallet Balance</p>
                            <div className="boxcategorytext">
                                <Show when={!!userState.apiKey}>
                                    {Number(maticBalance).toFixed(2)} MATIC
                                </Show>
                                <Show when={!userState.apiKey}>
                                    No API Key
                                </Show>
                            </div>
                        </Col>
                    </Row>
                    <Link className="btn btn-block" passHref href={"https://faucet.polygon.technology/"} target="_blank">Fund my wallet<ExternalLinkIcon className="icon-right" /></Link>
                    <Button className="btn-block" onClick={signOutFromThisDevice}>Sign Out<ExitIcon className="icon-right" /></Button>
                    <Button className="btn-block btn-red" onClick={signOutFromAllDevices}>Sign out from all devices<ExitIcon className="icon-right" /></Button>
                </div>
            </Show>
        </Fragment >
    )
}

export default withAuth(AccountPage)