import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Middleware() {
  return (
    <div>
      HI
      <Outlet />
    </div>
  )
}
