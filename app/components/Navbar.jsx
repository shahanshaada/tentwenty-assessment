"use client"
import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data';

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 50, delay: 0.1 } 
  },
};

const navContainerVariants = {
  hidden: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  visible: { transition: { staggerChildren: 0.05 } }
};

const navItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "tween", ease: "easeOut" } 
  }
};

const mobileMenuVariants = {
  hidden: { height: 0, opacity: 0, y: -10, transition: { duration: 0.25 } },
  visible: { 
    height: "auto", 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.35, 
      when: "beforeChildren", 
      staggerChildren: 0.08 
    } 
  },
};


const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);


const ContactButton = () => (
  <motion.a
    href="#contact"
    className="
      flex items-center space-x-2 
      px-4 py-2 
      text-sm  font-normal text-black
      border-2 border-black
      hover:bg-gray-50 transition duration-300
      focus:outline-none
    "
    aria-label="Contact us"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span>Contact us</span>
    <ArrowRightIcon className="w-4 h-4" />
  </motion.a>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const DesktopLinks = () => (
    <motion.div 
      className="hidden md:block"
      variants={navContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex space-x-6 lg:space-x-10">
        {NAV_LINKS.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            className="text-[14px] leading-[140%] font-normal text-black  hover:text-indigo-600 transition duration-150"
            onClick={closeMenu}
            variants={navItemVariants}
          >
            {link.name}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
  const MobileMenu = () => (
    <motion.div 
      className="md:hidden absolute w-full bg-white border-t border-gray-200 shadow-xl origin-top"
      id="mobile-menu"
      aria-hidden={!isMenuOpen}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={mobileMenuVariants}
    >
      <motion.div 
        className="px-2 pt-2 pb-3 space-y-2 sm:px-3 flex flex-col items-start"
        variants={navContainerVariants}
      >
        {NAV_LINKS.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            onClick={closeMenu}
            className="
              block w-full px-3 py-2 
              text-base font-medium text-gray-700 
              rounded-md hover:bg-indigo-50 hover:text-indigo-600
            "
            variants={navItemVariants}
          >
            {link.name}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <motion.header 
        className="sticky top-0  z-50 bg-white md:top-5 md:mx-4"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
    >
      <nav className="h-[100px] flex items-center justify-between px-4 sm:h-[80px] sm:px-6 lg:px-8" aria-label="Main navigation">
        <DesktopLinks />
        <div className="flex items-center space-x-4 w-[100%] justify-between md:w-[unset]">

        <ContactButton />

            <motion.button
                type="button"
                className="
                    md:hidden p-2 
                    rounded-lg text-gray-700 bg-gray-50 
                    hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500
                    border border-gray-300
                "
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
            >
                <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                {isMenuOpen ? (
                    <XIcon className="w-6 h-6" />
                ) : (
                    <MenuIcon className="w-6 h-6" />
                )}
            </motion.button>
        </div>

      </nav>
      <AnimatePresence>
        {isMenuOpen && <MobileMenu />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
