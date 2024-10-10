"use client";

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-xl font-bold">My App</Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="text-gray-300 hover:text-white">Main</Link></li>
          <li><Link href="/users" className="text-gray-300 hover:text-white">Users</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;