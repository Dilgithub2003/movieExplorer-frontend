import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './styles/NavBar.css' ;
import logo from '../assets/logo.png'
import { CiSearch } from "react-icons/ci";
import { TbUser } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';


function NavBar() {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const showMobileNavBAr = ()=>{
        setIsOpen(!isOpen);
        // window.alert(isOpen)
    }
    const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submission if inside form
      if (searchQuery.trim() !== "") {
        // Navigate to search page with query param
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            }
        }
    };

    const handleSearch = (e)=>{
        e.preventDefault(); // prevent form submission if inside form
        if (searchQuery.trim() !== "") {
        // Navigate to search page with query param
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    }

    return (
        <>
        <div className='home'>
        <div className='navBar'>
            <ul className='navItemsLeft'>
                <li className='navItem'> <Link to = '/'><img className='logo' src={logo}></img></Link> </li>
                <li className='navItem'> <Link to = '/'>Home</Link> </li>
                <li className='navItem'> <Link to = '/watchlist'>Watchlist</Link> </li>
            </ul>
            <ul className='navItemsRight'>
                <li className='navItem'>
                    <div className='searchBox'  onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown}>
                        <div onClick={handleSearch}><CiSearch size={18}  /></div>
                        <input type='text' placeholder='Search movies...'></input>
                    </div>
                 </li>
                <li className='navItem'> <Link to = '/profile'><div className='userIconCont'><TbUser size={24} /></div></Link> </li>
            </ul>
        </div>
        <div className='mobileNavbar'>
            <ul>
                <li className='navItem'> <Link to = '/'><img className='logo' src={logo}></img></Link> </li>
                <li className='navItem'> <Link to = '/search'>
                    <div className='searchBox'>
                        <CiSearch size={18}/>
                        <input type='text' placeholder='Search movies...'></input>
                    </div>
                </Link> </li>
                <li className='navItem' onClick={showMobileNavBAr} > <RxHamburgerMenu size={24} /></li>                
            </ul>
        </div>
        {isOpen && (
        <ul className='mobileMenu'>
            <li className='navItem' onClick={showMobileNavBAr}> <div className='userIconCont'><RxHamburgerMenu size={24} color='white'/></div></li>                
            <hr></hr>
            <li className='navItem' onClick={showMobileNavBAr}> <Link to = '/'>Home</Link> </li>
            <hr></hr>
            <li className='navItem'> <Link to = '/profile'><div className=''>Profile</div></Link> </li>
            <hr></hr>
            <li className='navItem'> <Link to = '/watchlist'>Watchlist</Link> </li>
        </ul>
        )}
        </div>
        </>
    );
}

export default NavBar
