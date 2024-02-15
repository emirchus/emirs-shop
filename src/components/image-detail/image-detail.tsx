'use client';
import Image from 'next/image';
import React from 'react';

interface Props {
  src: string;
  alt: string;
}

export const ImageDetail = ({ alt, src }: Props) => {
  const [xPosition, setXPosition] = React.useState(0);
  const [yPosition, setYPosition] = React.useState(0);
  const [isHover, setIsHover] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setXPosition(e.clientX - e.currentTarget.getBoundingClientRect().left);
    setYPosition(e.clientY - e.currentTarget.getBoundingClientRect().top);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setXPosition(0);
    setYPosition(0);
  };

  return (
    <div
      className='h-full w-full'
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className='h-full w-full origin-center object-cover transition-transform duration-300 ease-in-out'
        style={{
          objectFit: 'cover',
          transformOrigin: `${xPosition}px ${yPosition}px`,
          transform: isHover ? 'scale(2)' : 'scale(1)'
        }}
      />
    </div>
  );
};
