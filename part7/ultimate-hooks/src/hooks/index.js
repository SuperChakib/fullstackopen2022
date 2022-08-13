import { useState, useEffect } from "react"
import axios from "axios"

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  const props = {
    type,
    value,
    onChange
  }

  return {
    props,
    reset
  }
}

export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => setResources(response.data))
  }, [baseUrl])

  const create = resource => {
    axios
      .post(baseUrl, resource)
      .then(response => setResources(resources.concat(response.data)))
  }

  const update = (resource, id) => {
    axios
      .put(`${baseUrl}/${id}`, resource)
      .then(response =>
        setResources(resources.map(resource => resource.id === id ? response.data : resource)))
  }

  const service = {
    create,
    update
  }

  return [
    resources, service
  ]
}