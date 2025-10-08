import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../NavBar'
import Footer from '../Footer'
function RootLayout() {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}
// Layout without navbar
function AuthLayout() {
  return <Outlet />;
}

export default RootLayout
