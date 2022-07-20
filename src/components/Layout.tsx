import React from 'react'
import Footer from './Footer';
import { Navbar } from './Navbar';



const Layout = (components: any) => {
    return (
        <>
            <Navbar></Navbar>
            {components.children}
            <Footer></Footer>
        </>
    )
}
export default Layout
