import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Roles(props) {
  let history = useNavigate()
  useEffect(() => {
    if (
      localStorage.getItem('role') === null ||
      localStorage.getItem('role') !== props.role
    ) {
      localStorage.removeItem('role')
      history('/login')
    }
  }, [])
  return <></>
}
