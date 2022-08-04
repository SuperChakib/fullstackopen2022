import { useState } from "react"

const useField = type => {
  const [value, setvalue] = useState('')

  const onChange = e => {
    setvalue(e.target.value)
  }

  const reset = () => setvalue('')

  return {
    btnAttributes: {
      type,
      value,
      onChange
    },
    reset
  }
}

export default useField