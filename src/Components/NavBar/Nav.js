import React, { useEffect, useState } from 'react'
import './Nav.css';
import logo from '../Images/what-to-watch.png';
function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
    }, []);

    return (
        <div className={`Nav ${show && "nav__black"}`} >
            <img src={logo} alt="" className="nav__logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" className="nav__avatar" />
        </div>
    )
}

export default Nav