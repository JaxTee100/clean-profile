'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  { name: 'Profile', path: '/profile' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
  { name: 'Articles', path: '/articles' },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className=''>
      <nav className='flex flex-col md:flex-row justify-between items-start md:items-center p-4'>
        <div className='flex'>
          <Link href='/' className='text-3xl font-bold text-gray-800 hover:text-gray-600 tracking-wider'>
            Tobias
          </Link>
        </div>
        <ul className='flex space-x-4'>
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`tracking-wide ${
                    isActive
                      ? 'text-gray-900 underline font-semibold'
                      : 'text-gray-600 hover:underline'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
