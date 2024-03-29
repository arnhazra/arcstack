"use client"
import { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"

export default function useConfirm() {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const [resolveCallback, setResolveCallback] = useState<(choice: boolean) => void>(() => { })

  const handleClose = () => setShow(false)

  const confirm = (message: string): Promise<boolean> => {
    setMessage(message)
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
      setResolveCallback(() => { })
    }
  }

  const confirmDialog = () => (
    <Modal show={show} centered keyboard={false} backdrop="static" className="blurred-background">
      <Modal.Header className="ps-4 pe-4">
        <h5>{message}</h5>
      </Modal.Header>
      <Modal.Body className="ps-4 pe-4">
        <p className="text-muted">This Action may not be undone, be sure before you click on continue, you can cancel if you do not want to proceed</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleConfirm(false)}>
          <CrossCircledIcon className="icon-left" />Cancel
        </Button>
        <Button variant="danger" onClick={() => handleConfirm(true)}>
          <CheckCircledIcon className="icon-left" />Continue
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return { confirmDialog, confirm }
}

export type ConfirmProps = {
  confirmDialog: () => React.ReactNode
  confirm: (message: string) => Promise<boolean>
}