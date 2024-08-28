"use client"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import axios from "axios"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Suspense from "@/components/suspense"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoaderIcon from "@/components/loaderIcon"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

interface AuthProviderProps {
  onAuthorized: (isAuthorized: boolean) => void
}

export default function AuthProvider({ onAuthorized }: AuthProviderProps) {
  const [isAuthLoading, setAuthLoading] = useState<boolean>(false)
  const [authStep, setAuthStep] = useState(1)
  const [state, setState] = useState({ email: "", hash: "", passKey: "" })
  const [alert, setAlert] = useState("")
  const [newUser, setNewUser] = useState(false)
  const [name, setName] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const generatePassKey = async (event: any) => {
    event.preventDefault()
    setAlert(uiConstants.authVerificationMessage)
    setAuthLoading(true)

    try {
      const response = await axios.post(endPoints.generatePassKey, state)
      setState({ ...state, hash: response.data.hash })
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{response.data.message}</p>
      })

      setNewUser(response.data.newUser)
      setAuthStep(2)
    }

    catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.connectionErrorMessage}</p>
      })
    }

    finally {
      setAuthLoading(false)
    }
  }

  const verifyPassKey = async (event: any) => {
    event.preventDefault()
    setAlert(uiConstants.authVerificationMessage)
    setAuthLoading(true)

    try {
      const response = await axios.post(endPoints.verifyPassKey, { ...state, name })
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.authVerificationSuccess}</p>
      })
      onAuthorized(true)
    }

    catch (error: any) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.invalidPasskey}</p>
      })
      onAuthorized(false)
    }

    finally {
      setAuthLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 overflow-y-hidden flex justify-center items-center auth-landing">
      <Suspense condition={authStep === 1} fallback={null}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">{uiConstants.brandName}</CardTitle>
            <CardDescription>
              Enter your email to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={generatePassKey}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input className="h-12" type="email" placeholder="someone@example.com" required disabled={isAuthLoading} onChange={(e) => setState({ ...state, email: e.target.value })} autoComplete={"off"} minLength={4} maxLength={40} />
                </div>
                <Button type="submit" size="lg" className="w-full h-12" disabled={isAuthLoading}>
                  <Suspense condition={!isAuthLoading} fallback={<><LoaderIcon /> {alert}</>}>
                    Get Auth Passkey
                  </Suspense>
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-slate-600">
              {uiConstants.privacyPolicyStatement}
            </div>
          </CardFooter>
        </Card>
      </Suspense>
      <Suspense condition={authStep === 2} fallback={null}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">{uiConstants.brandName}</CardTitle>
            <CardDescription>
              {uiConstants.verifyEmailStatement}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={verifyPassKey}>
              <div className="grid gap-4">
                <Suspense condition={newUser} fallback={null}>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Your Name</Label>
                    <Input className="h-12" type="name" placeholder="Your Name" required disabled={isAuthLoading} onChange={(e) => setName(e.target.value)} autoComplete={"off"} maxLength={40} />
                  </div>
                </Suspense>
                <div className="grid gap-2">
                  <div className="flex justify-center items-center">
                    <InputOTP maxLength={8} disabled={isAuthLoading} name="passKey" onChange={(value) => setState({ ...state, passKey: value })} required>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className="text-center text-sm">
                    Enter your one-time passkey
                  </div>
                </div>
                <Button variant="default" type="submit" disabled={isAuthLoading} className="mt-4 w-full h-12">
                  <Suspense condition={!isAuthLoading} fallback={<><LoaderIcon /> {alert}</>}>
                    Continue
                  </Suspense>
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-slate-600">
              {uiConstants.privacyPolicyStatement}
            </div>
          </CardFooter>
        </Card>
      </Suspense>
    </div>
  )
}