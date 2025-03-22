"use client"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import ky from "ky"
import { useState } from "react"
import { toast } from "sonner"
import Show from "@/shared/components/show"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import LoaderIcon from "@/shared/components/loaderIcon"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { endPoints } from "@/shared/constants/api-endpoints"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import Header from "@/shared/components/header"
import { Bell } from "lucide-react"

interface AuthProviderProps {
  onAuthorized: (isAuthorized: boolean) => void
}

export default function AuthenticationPage({
  onAuthorized,
}: AuthProviderProps) {
  const [isAuthLoading, setAuthLoading] = useState<boolean>(false)
  const [authStep, setAuthStep] = useState(1)
  const [state, setState] = useState({ email: "", hash: "", otp: "" })
  const [alert, setAlert] = useState("")
  const [newUser, setNewUser] = useState(false)
  const [name, setName] = useState("")

  const generateOTP = async (event: any) => {
    event.preventDefault()
    setAlert(uiConstants.authVerificationMessage)
    setAuthLoading(true)

    try {
      const response: any = await ky
        .post(endPoints.generateOTP, { json: state, timeout: FETCH_TIMEOUT })
        .json()
      setState({ ...state, hash: response.hash })
      setNewUser(response.newUser)
      setAuthStep(2)
    } catch (error) {
      toast(uiConstants.notification, {
        icon: <Bell className="scale-75" />,
        description: uiConstants.connectionErrorMessage,
      })
    } finally {
      setAuthLoading(false)
    }
  }

  const validateOTP = async (event: any) => {
    event.preventDefault()
    setAlert(uiConstants.authVerificationMessage)
    setAuthLoading(true)

    try {
      const response: any = await ky
        .post(endPoints.validateOTP, {
          json: { ...state, name },
          timeout: FETCH_TIMEOUT,
        })
        .json()
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      onAuthorized(true)
    } catch (error: any) {
      toast(uiConstants.notification, {
        icon: <Bell className="scale-75" />,
        description: uiConstants.invalidOTP,
      })
      onAuthorized(false)
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="fixed inset-0 overflow-y-auto flex justify-center items-center auth-landing">
        <Card className="mx-auto max-w-sm bg-main border-none text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {brandName} Auth
            </CardTitle>
            <CardDescription className="text-white text-center">
              <Show
                condition={authStep === 1}
                fallback="Enter the OTP we sent to your email"
              >
                Enter your email to get started
              </Show>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Show condition={authStep === 1}>
                <form onSubmit={generateOTP}>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className="h-12 bg-background border-border text-white"
                      type="email"
                      placeholder="someone@example.com"
                      required
                      disabled={isAuthLoading}
                      onChange={(e) =>
                        setState({ ...state, email: e.target.value })
                      }
                      autoComplete={"off"}
                      minLength={4}
                      maxLength={40}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-11 mt-4 bg-primary hover:bg-primary"
                    disabled={isAuthLoading}
                  >
                    <Show
                      condition={!isAuthLoading}
                      fallback={
                        <>
                          <LoaderIcon /> {alert}
                        </>
                      }
                    >
                      Continue with Email
                    </Show>
                  </Button>
                </form>
              </Show>
              <Show condition={authStep === 2}>
                <form onSubmit={validateOTP}>
                  <div className="grid gap-4">
                    <Show condition={newUser}>
                      <div className="grid gap-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          className="h-11 bg-background border-border text-white"
                          type="text"
                          placeholder="Your Name"
                          required
                          disabled={isAuthLoading}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete={"off"}
                          maxLength={40}
                        />
                      </div>
                    </Show>
                    <div className="grid gap-2">
                      <Label htmlFor="otp">One Time Password</Label>
                      <Input
                        className="h-11 bg-background border-border text-white"
                        type="password"
                        placeholder="Enter OTP sent to your email"
                        required
                        disabled={isAuthLoading}
                        onChange={(e) =>
                          setState({ ...state, otp: e.target.value })
                        }
                        autoComplete={"off"}
                        minLength={6}
                        maxLength={6}
                      />
                    </div>
                    <Button
                      variant="default"
                      type="submit"
                      disabled={isAuthLoading}
                      className="w-full h-11 mt-4 bg-primary hover:bg-primary"
                    >
                      <Show
                        condition={!isAuthLoading}
                        fallback={
                          <>
                            <LoaderIcon /> {alert}
                          </>
                        }
                      >
                        <Show condition={newUser} fallback="Login">
                          Create new account
                        </Show>
                      </Show>
                    </Button>
                  </div>
                </form>
              </Show>
            </div>
            <div className="mt-4 text-center text-sm text-zinc-200">
              {uiConstants.privacyPolicyStatement}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
