import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/logo.png'
import '../components/styles/footer.css'

function Footer() {
    return (
        <>
        <div className="footer">
            <hr className='footer-devider'></hr>
            <div className="footer-top">
                <div className="footer-top-left">
                    <Link to = '/'><img className='logo' src={logo}></img></Link>
                    <h2>MovieHub</h2>
                </div>
                <div className="footer-top-right">
                    <div>Terms</div>
                    <div>Privacy</div>
                    <div>Help</div>
                </div>
            </div>
            <div className="footer-bottom">
                <h4>© 2025 MovieHub. All rights reserved.</h4>
            </div>
        </div>    
        </>
    )
}

export default Footer
