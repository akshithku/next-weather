"use client";
import { Button } from '@/components/ui/button';
import React from 'react'
import { github } from '../utils/Icons';
import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import SearchDialog from './SearchDialog/SearchDialog';
import { useGlobalContext } from '../context/globalContext';
import Link from 'next/link';
function Navbar() {
  const state = useGlobalContext();
  // console.log(state);
  return (
    <div className='w-full py-4 flex items-center justify-between'>
        <div className="left"></div>
        <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
          <SearchDialog/>
         <div className="btn-group flex items-center gap-2">

         <ThemeDropdown/>
          <Button className="source-code flex items-center gap-3" >
          <Link className='flex items-center gap-3' href={'https://github.com/akshithku'}>
            {github}Source code
            </Link>
            </Button>
         </div>
        </div>
    </div>
  )
}

export default Navbar