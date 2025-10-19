"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const HeroBanner = ({heroData}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroData.length]);

  const currentItem = heroData[currentIndex];
  const nextItem = heroData[currentIndex + 1] || heroData[0];
  const totalItems = heroData.length;

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };


  const incomingImageVariants = {
    initial: {
      scale: 1,
      opacity: 1,
      zIndex: 20,
      clipPath: "inset(50% 0% 50% 0%)",
    },
    animate: {
      scale: 1,
      opacity: 1,
      zIndex: 20, 
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      opacity: 0.5,
      scale: 1,
      zIndex: 10,
      transition: { duration: 0.8, delay: 0.5 },
    },
  };
  return (
    <header className="relative h-[100vh] top-[-100px] z-[4] w-full md:h-[110vh]">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentItem.id}
          className="absolute inset-0"
          variants={incomingImageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            priority={true}
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute top-[300px] z-20 flex flex-col justify-end pb-24 md:pb-32 px-4 md:inset-0 md:top-[unset] sm:px-10 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id + "content"} 
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-white max-w-full  md:max-w-md"
          >
            <p className="text-[14px] leading-[130%] mb-4 text-[#EEF4F9]  md:text-[16px] md:leading-[150%] md:mb-6">
              {currentItem.subtitle}
            </p>
     
            <h1 className="text-4xl  md:text-6xl  leading-[100%]">
            {currentItem.title}
            </h1>
          </motion.div>
        </AnimatePresence>

<div className="mt-[196px] flex items-center space-x-4 md:mt-12">
  <div 
    className="relative w-[92px] h-[92px] md:w-[92px] md:h-[92px] cursor-pointer"
    onClick={() =>
      handleThumbnailClick((currentIndex + 1) % heroData.length)
    }
  >
    <motion.svg
      key={currentIndex + "svg"}
      className="absolute inset-0 z-30"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%" }}
    >
      <motion.rect
        x="2"
        y="2"
        width="96"
        height="96"
        stroke="white"
        strokeWidth="8" 
        fill="none"
        strokeDasharray="400"
        initial={{ strokeDashoffset: 400 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          duration: 5,
          ease: "linear",
        }}
      />
    </motion.svg>
    <AnimatePresence initial={false}>
      <motion.div
        key={currentItem.id + "thumbnail"}
        className="absolute inset-0 p-4"
        variants={incomingImageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        
        <div className="relative w-full h-full">
            <Image
                src={nextItem.thumbnail}
                alt="Thumbnail"
                fill
                sizes="(max-width: 640px) 76px, 76px"
                className="object-cover"
            />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center text-white
           text-base border-1 border-[#EEF4F9] m-[1px]"
        >
          Next
        </div>
      </motion.div>
    </AnimatePresence>
  </div>

  <div className="flex-1 flex flex-col justify-center pb-1">
    <div className="flex items-center space-x-2">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={currentIndex}
        className="text-[16px] leading-[110%] text-white inline-block"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.17, 0.55, 0.55, 1] }}
      >
        {(currentIndex + 1).toString().padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
      <div className="h-[1px] w-[103px] bg-white/50  relative"> 
      </div>
      <span className="font-[16px] leading-[110%] text-white">
        {totalItems.toString().padStart(2, "0")}
      </span>
    </div>
  </div>
</div>
      </div>
    </header>
  );
};

export default HeroBanner;
