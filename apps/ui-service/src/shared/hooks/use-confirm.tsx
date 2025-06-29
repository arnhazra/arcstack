"use client"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog"
import { Button } from "@/shared/components/ui/button"
import { uiConstants } from "@/shared/constants/global-constants"

interface ModalProps {
  title: string
  desc: string
}

export default function useConfirm() {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState<ModalProps>({ title: "", desc: "" })
  const [resolveCallback, setResolveCallback] = useState<
    (choice: boolean) => void
  >(() => {})

  const handleClose = () => setShow(false)

  const confirm = ({ title, desc }: ModalProps): Promise<boolean> => {
    setMessage({ title, desc })
    setShow(true)

    return new Promise((resolve) => {
      setResolveCallback(() => (choice: boolean) => {
        handleClose()
        resolve(choice)
      })
    })
  }

  const handleConfirm = (choice: boolean) => {
    if (resolveCallback) {
      resolveCallback(choice)
      setResolveCallback(() => {})
    }
  }

  const confirmDialog = () => (
    <AlertDialog open={show}>
      <AlertDialogContent className="bg-background text-white border-border">
        <AlertDialogHeader>
          <AlertDialogTitle>{message.title}</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-300">
            {message.desc ?? uiConstants.confirmDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={() => handleConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            className="bg-primary text-white hover:bg-primary"
            onClick={() => handleConfirm(true)}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { confirmDialog, confirm }
}

export type ConfirmProps = {
  confirmDialog: () => React.ReactNode
  confirm: (message: ModalProps) => Promise<boolean>
}
