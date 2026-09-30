import * as React from "react"

type UseControlledInputParams = {
  id?: string
  type?: React.HTMLInputTypeAttribute
  errorMessage?: string
}

export function useControlledInput({
  id,
  type = "text",
  errorMessage,
}: UseControlledInputParams) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const hasError = Boolean(errorMessage)

  const isPassword = type === "password"
  const [visible, setVisible] = React.useState(false)
  const inputType = isPassword ? (visible ? "text" : "password") : type

  const toggleVisible = () => setVisible((value) => !value)

  return { inputId, hasError, isPassword, visible, toggleVisible, inputType }
}
