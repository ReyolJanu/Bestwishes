import React from 'react';
import Image from 'next/image';
import logo from '../../assets/logo.png';

function Page() {
  return (
    <div className='background min-h-screen flex justify-center items-center drop-shadow-lg'>
      <div className='bg-white w-[581px] rounded-[12px] pt-[50px] pb-[50px] flex flex-col items-center space-y-[15px]'>
        <div className='w-[500px] relative'>
          <Image src={logo} alt='Logo' />
        </div>

        <span className='font-extra-large mb-4 font-semibold'>Dashboard</span>
        
    </div>
    </div>
  );
}

export default Page;
