// src/components/HeroSection.js
import React from 'react';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';
import { Separator } from './ui/separator';

const HeroSection = () => {
    return (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white h-screen flex items-center justify-center ">
            <div className="text-center -mt-10 md:mt-0 p-2">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">Western By-pass Transport App</h1>
                <p className="text-md md:text-lg">This directive exclusively applies to personnel within the Western By-pass. </p>
                <p className="text-sm mt-2">It is intended solely for all Western By-pass members and purposely for transport reservation for all our occasion</p>
                <div className="flex justify-center items-center md:pt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                        <div className="shadow-inner hidden md:block">
                            <Image
                                src="/bus.png"
                                height={250}
                                width={230}
                                alt='bus'
                            />
                        </div>
                        {/* ring ring-gray-300 ring-inset rounded-lg */}
                        <div className="shadow-inner ">
                            <Image
                                src="/van.png"
                                height={250}
                                width={230}
                                alt='van'
                            />
                        </div>
                    </div>
                </div>
                <Separator />


            </div>
        </div>
    );
};

export default HeroSection;
