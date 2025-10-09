import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './styles/NavBar.css';
import logo from '../assets/logo.png';
import { CiSearch } from "react-icons/ci";
import { TbUser } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const showMobileNavBAr = () => setIsOpen(!isOpen);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim() !== "") {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setIsOpen(false); // close menu if open
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className='home'>
        {/* Desktop Navbar */}
        <div className='navBar'>
          <ul className='navItemsLeft'>
            <li className='navItem'><Link to='/'><img className='logo' src={logo} alt="logo" /></Link></li>
            <li className='navItem'><Link to='/'>Home</Link></li>
            <li className='navItem'><Link to='/watchlist'>Watchlist</Link></li>
          </ul>

          <ul className='navItemsRight'>
            <li className='navItem'>
              <div className='searchBox'>
                <input
                  type='text'
                  placeholder='Search movies...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div onClick={handleSearch}><CiSearch size={18} /></div>
              </div>
            </li>
            <li className='navItem'>
              <Link to='/profile'><div className='userIconCont'><TbUser size={24} /></div></Link>
            </li>
          </ul>
        </div>

        {/* Mobile Navbar */}
        <div className='mobileNavbar'>
          <ul>
            <li className='navItem'><Link to='/'><img className='logo' src={logo} alt="logo" /></Link></li>
            <li className='navItem'>
              <div className='searchBox'>
                <input
                  type='text'
                  placeholder='Search movies...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />                <div onClick={handleSearch}><CiSearch size={18} /></div>

              </div>
            </li>
            <li className='navItem' onClick={showMobileNavBAr}><RxHamburgerMenu size={24} /></li>
          </ul>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <ul className='mobileMenu'>
            <li className='navItem' onClick={showMobileNavBAr}>
              <div className='userIconCont'><RxHamburgerMenu size={24} color='white' /></div>
            </li>
            <hr />
            <li className='navItem' onClick={showMobileNavBAr}><Link to='/'>Home</Link></li>
            <hr />
            <li className='navItem' onClick={showMobileNavBAr}><Link to='/profile'>Profile</Link></li>
            <hr />
            <li className='navItem' onClick={showMobileNavBAr}><Link to='/watchlist'>Watchlist</Link></li>
          </ul>
        )}
      </div>
    </>
  );
}

export default NavBar;
