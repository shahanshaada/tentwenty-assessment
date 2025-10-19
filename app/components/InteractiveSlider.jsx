"use client";

import { useState, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import Image from "next/image";


const wrap = (min, max, v) => {
  const range = max - min;
  if (range === 0) return min;
  return ((((v - min) % range) + range) % range) + min;
};


const cardVariants = {
  center: {
    x: "0%",
    scale: 1,
    rotate: "0deg",
    opacity: 1,
    transition: { type: "spring", stiffness: 40, damping: 8, duration: 2.0 },
  },
  left: {
    x: "-146%",
    y: "12%",
    scale: 0.85,
    rotate: "-6deg",
    opacity: 1,
    transition: { type: "spring", stiffness: 40, damping: 8, duration: 2.5 },
  },
  right: {
    x: "146%",
    y: "12%",
    scale: 0.85,
    rotate: "6deg",
    opacity: 1,
    transition: { type: "spring", stiffness: 40, damping: 8, duration: 2.5 },
  },
  hidden: (direction) => ({
    x: direction > 0 ? "120%" : "-120%",
    scale: 0.7,
    rotate: direction > 0 ? "15deg" : "-15deg",
    opacity: 0,
    transition: { type: "spring", stiffness: 60, damping: 10, duration: 1.5 },
  }),
};

export function InteractiveSlider({sliderData}) {
  const [currentIndex, setCurrentIndex] = useState(2);
  const totalSlides = sliderData.length;
  if (totalSlides === 0) {
    return null;
  }

  const containerRef = useRef(null);
  const dragThreshold = 70;

  const [transitionDirection, setTransitionDirection] = useState(0);

  const getPosition = (index, current) => {
    if (index === current) return "center";
    const isNext = index === wrap(0, totalSlides, current + 1);
    const isPrev = index === wrap(0, totalSlides, current - 1);
    if (isPrev) return "left";
    if (isNext) return "right";
    return { variant: "hidden", direction: transitionDirection };
  };

  const controls = useDragControls();
  const handleDragEnd = (event, info) => {
    const swipe = info.offset.x;
    const velocity = info.velocity.x;
    const deltaY = Math.abs(info.offset.y);
    const deltaX = Math.abs(info.offset.x);
    if (deltaX < deltaY * 2) {
      return;
    }

    let newIndex = currentIndex;
    let direction = 0;

    if (swipe < -dragThreshold || velocity < -100) {
      direction = 1;
      newIndex = wrap(0, totalSlides, currentIndex + 1);
    } else if (swipe > dragThreshold || velocity > 100) {
      direction = -1;
      newIndex = wrap(0, totalSlides, currentIndex - 1);
    } else {
      return;
    }
    setTransitionDirection(direction);
    setCurrentIndex(newIndex);
  };

  return (
    <div
      ref={containerRef}
      className="w-full py-20 bg-[#fefefe] overflow-x-clip"
    >
      <div className="relative h-[330px] md:h-[531px] w-full  max-w-[332px] md:max-w-[435px] mx-auto flex justify-center items-center px-40">
        {sliderData.map((item, index) => {
          const positionProps = getPosition(index, currentIndex);
          const animateVariant =
            typeof positionProps === "string"
              ? positionProps
              : positionProps.variant;
          const customDirection =
            typeof positionProps === "object" ? positionProps.direction : 0;

          return (
            <motion.div
              key={item.id}
              className={`absolute w-full max-w-sm h-[330px] md:h-[531px]`}
              variants={cardVariants}
              custom={customDirection}
              initial="hidden"
              animate={animateVariant}
            >
              <div className="relative w-full h-full  overflow-hidden shadow-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 384px"
                  objectFit="cover"
                  className="w-full h-full"
                  priority={animateVariant === "center"}
                />
              </div>
            </motion.div>
          );
        })}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <motion.div
            drag
            dragControls={controls}
            dragConstraints={containerRef}
            onDragEnd={handleDragEnd}
            animate={{ x: 0, y: 0, scale: 1 }} 
            layout
            className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center shadow-lg cursor-grab pointer-events-auto"
          >
            Drag
          </motion.div>
        </div>
      </div>

      <motion.div
        key={sliderData[currentIndex].id + "data"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-12 text-center relative max-w-md mx-auto flex flex-col items-center"
      >
        <div className="text-2xl leading-[40px]  text-gray-900 mb-5 md:text-4xl md:leading-[60px]">
          {sliderData[currentIndex].title}
        </div>

        <p className="text-base leading-[22px] text-[#7A7777] md:text-2xl md:leading-[100%]">
          {sliderData[currentIndex].subtitle} 
        </p>
      </motion.div>
    </div>
  );
}

export default InteractiveSlider;
