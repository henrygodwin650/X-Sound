import React from 'react'
import LoginPage from './LoginPage'
import ForgottenPage from './ForgottenPage'
import CreateAccount from './CreateAccount'
import VerifyEmail from './VerifyEmail'
import { Routes, Route, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <Outlet />
  )
}

export default AuthLayout