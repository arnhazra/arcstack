"use client"
import { Fragment, useState } from "react"
import axios from "axios"
import { Button, Form } from "react-bootstrap"
import { uiConstants } from "@/constants/global-constants"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import { toast } from "react-hot-toast"
import { ArrowRightIcon } from "@radix-ui/react-icons"

interface IdentityGuardProps {
  onIdentitySuccess: () => void
  onIdentityFailure: () => void
}

export default function IdentityGuard({ onIdentitySuccess, onIdentityFailure }: IdentityGuardProps) {
  const [identityStep, setIdentityStep] = useState(1)
  const [state, setState] = useState({ email: "", hash: "", passKey: "" })
  const [alert, setAlert] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [identityAlert, setIdentityAlert] = useState("")

  const generatePassKey = async (event: any) => {
    event.preventDefault()
    setAlert(uiConstants.identityVerificationMessage)
    setLoading(true)

    try {
      const response = await axios.post(endPoints.generatePassKey, state)
      setState({ ...state, hash: response.data.hash })
      toast.success(response.data.message)
      setIdentityStep(2)
      setLoading(false)
    }

    catch (error) {
      toast.error(uiConstants.connectionErrorMessage)
      setLoading(false)
    }
  }

  const verifyPassKey = async (event: any) => {
    event.preventDefault()
    setIdentityAlert("")
    setAlert(uiConstants.identityVerificationMessage)
    setLoading(true)

    try {
      const response = await axios.post(endPoints.verifyPassKey, state)
      localStorage.setItem("accessToken", response.data.accessToken)
      toast.success(uiConstants.identityVerificationSuccess)
      setLoading(false)
      onIdentitySuccess()
    }

    catch (error: any) {
      setIdentityAlert(uiConstants.invalidPasskey)
      setLoading(false)
      onIdentityFailure()
    }
  }

  return (
    <Fragment>
      <Suspense condition={identityStep === 1} fallback={null}>
        <form className="box" onSubmit={generatePassKey}>
          <p className="branding">Identity</p>
          <p className="muted-text">Enter the email address to get started</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control disabled={isLoading} autoFocus type="email" placeholder="someone@example.com" onChange={(e) => setState({ ...state, email: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={40} />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading} className="mt-1 btn-block">
            <Suspense condition={!isLoading} fallback={<><i className="fas fa-circle-notch fa-spin"></i> {alert}</>}>
              Get Identity Passkey <ArrowRightIcon className="icon-right" />
            </Suspense>
          </Button>
          <p className="muted-text mt-1">By using {uiConstants.brandName}, you agree to our Terms of Service and Privacy Policy.</p>
        </form>
      </Suspense>
      <Suspense condition={identityStep === 2} fallback={null}>
        <form className="box" onSubmit={verifyPassKey}>
          <p className="branding">Identity</p>
          <p className="muted-text">Please verify your identity by entering the identity passkey we sent to your inbox.</p>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Identity Passkey</Form.Label>
            <Form.Control type="password" disabled={isLoading} name="passKey" placeholder="XXXX-XXXX" onChange={(e) => setState({ ...state, passKey: e.target.value })} required autoComplete={"off"} />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading} className="mt-4 btn-block">
            <Suspense condition={!isLoading} fallback={<><i className="fas fa-circle-notch fa-spin"></i> {alert}</>}>
              Continue <ArrowRightIcon className="icon-right" />
            </Suspense>
          </Button>
          <p id="alert" className="mt-1 mb-1">{identityAlert}</p>
        </form>
      </Suspense>
    </Fragment >
  )
}