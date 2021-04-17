import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './Footer.css';

const Footer = () => {
    return ( 
        <footer className="footer bg-dark">
            <div className="container h-100 d-flex align-items-center justify-content-between">
                <b className="text-white-50">Receipts CRUD</b>

                <span className="text-white-50 ml-3">
                    <span>Made with <FontAwesomeIcon icon={faHeart} /> by </span>
                    <a href="https://github.com/gerardormz98/" target="_blank" rel="noopener noreferrer">
                        <span className="d-none d-sm-inline-block">Gerardo Ramírez</span>
                        <span className="d-inline-block d-sm-none">GR</span>
                    </a>
                </span>
            </div>
        </footer>
    );
}
 
export default Footer;