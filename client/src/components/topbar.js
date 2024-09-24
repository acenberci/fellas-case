import React from 'react';
import { GlobeEuropeAfricaIcon, TagIcon } from '@heroicons/react/24/solid';

export default function TopBar() {
    return (
        <header className='z-10 w-full py-1 px-6 max-sm:px-2 box-border bg-w flex justify-between items-center'>
            <a href='/#' className='flex items-center gap-3'>
                <div className='size-10 rounded-full bg-mainPurple overflow-hidden p-2 relative border border-white'>
                    <img 
                        className='h-5/6 w-5/6 absolute -left-[2px] -translate-y-1/2 top-1/2' 
                        src={require("../assets/icons/airplane.png")} 
                        alt="Airplane Icon" 
                    />
                </div>
                <h4 className='font-semibold text-lg max-sm:hidden'>PLANE SCAPE</h4>
            </a>
            <div className='flex gap-10 max-sm:gap-2'>
                <div className='flex h-14 items-center gap-5'>
                    <button className="py-4 hover:scale-105 hover:brightness-105 flex items-center gap-1">
                        <TagIcon className='text-mainPurple size-5' />
                        <h4 className='text-md font-semibold'>Deals</h4>
                    </button>
                    <button className="py-4 hover:scale-105 hover:brightness-105 flex items-center gap-1">
                        <GlobeEuropeAfricaIcon className='text-mainPurple size-5' />
                        <h4 className='text-md font-semibold'>Discover</h4>
                    </button>
                </div>
                <div className='flex h-14 items-center'>
                    <div className='px-2 flex items-center'>
                        <div className='flex size-9 aspect-square rounded-full bg-blue-500 text-white font-semibold text-md justify-center items-center'>
                            <img 
                                src={require("../assets/images/profilePhoto.jpg")} 
                                alt="Profile" 
                                className="w-full h-full object-cover object-center rounded-full" 
                            />
                        </div>
                        <div className='flex flex-col px-2 max-sm:hidden'>
                            <h4 className='font-semibold text-md text-[rgb(41,41,41)]'>Joane Smith</h4>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
