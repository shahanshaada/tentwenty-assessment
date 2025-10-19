"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function TextParagraph({ title, paragraph }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      className="mt-0 mx-4 md:mt-[20px] md:w-[748px] md:mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} 
    >
      <motion.h1 
        className="text-[56px] leading-[72px] tracking-[-1px] text-center mb-4" 
        variants={itemVariants}
      >
        {title}
      </motion.h1>
      <motion.p 
        className="text-center text-[#7A7777] text-lg" 
        variants={itemVariants}
      >
        {paragraph}
      </motion.p>
    </motion.div>
  );
}