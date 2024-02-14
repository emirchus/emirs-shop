import { Facebook, Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface SocialIconProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const SocialIcon = ({ href, icon, label }: SocialIconProps) => {
  return (
    <li>
      <a
        href={href}
        target='_blank'
        className='flex flex-row items-center justify-start hover:text-secondary-foreground'
      >
        <span className='mr-2'>{icon}</span>
        {label}
      </a>
    </li>
  );
};

export const Footer = () => {
  return (
    <footer className='grid w-full gap-4 border-t-2 border-border p-5 md:grid-cols-3 md:grid-rows-2'>
      <div className='flex items-center justify-center md:col-span-1 md:row-span-2 flex-col'>
        <h3 className='font-semibold'>Contact Us!</h3>
        <ul className='flex flex-row flex-wrap justify-center space-x-4 md:justify-start'>
          <SocialIcon href='/#' icon={<Facebook size={20} />} label='Facebook' />
          <SocialIcon
            href='https://www.linkedin.com/in/emir-ali-31aa711ab/'
            icon={<Linkedin size={20} />}
            label='LinkedIn'
          />
          <SocialIcon
            href='https://twitter.com/emirchus/'
            icon={<Twitter size={20} />}
            label='X (Twitter)'
          />
          <SocialIcon
            href='https://github.com/emirchus'
            icon={<Github size={20} />}
            label='GitHub'
          />
        </ul>
      </div>
      <div className='flex w-full items-center justify-center md:col-span-1  md:row-span-2'>
        Copyright © {new Date().getFullYear()} Emir. All rights reserved
      </div>

      <div className='flex w-full flex-col items-center justify-center md:col-span-1 md:row-span-2'>
        <Image src='/logo.svg' alt='Logo' width={80} height={80} priority />
      </div>
    </footer>
  );
};
