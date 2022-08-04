import { useState } from "react"

export const useField = type => {
  const [value, setvalue] = useState('')

  const onChange = e => {
    setvalue(e.target.value)
  }


  return {
    type,
    value,
    onChange
  }
}