import React from 'react';
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineMail, AiOutlineUserAdd } from 'react-icons/ai';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container bg-primary text-white py-3">
      <div className="footer-column order-2 order-md-1 col-12 col-md-4">
        <h4 className="footer-title">Explore</h4>
        <ul className="footer-menu">
          <li><a href="/"><AiOutlineHome className="me-2" />Home</a></li>
          <li><a href="/aboutus"><AiOutlineInfoCircle className="me-2" />About Us</a></li>
          <li><a href="/contactpage"><AiOutlineMail className="me-2" />Contact</a></li>
          <li><a href="/joinus"><AiOutlineUserAdd className="me-2" />Join Us</a></li>
        </ul>
      </div>
      <div className="footer-column order-1 order-md-2 col-12 col-md-4">
        <div className="footer-logo">
          <img src="/src/components/footer/c52e09056cc94eea84fcb9abc780c46d.png" alt="Company Logo" className="img-logo" />
        </div>
      </div>
      <div className="footer-column order-3 col-12 col-md-4">
        <h4 className="footer-title">Contact</h4>
        <div className="footer-contact">
          <p>info@company.com</p>
          <p>(123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
