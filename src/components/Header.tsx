'use client';

import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 430); // Updated to iPhone 15 Pro Max width
        };

        // Initial check
        checkMobile();

        // Add listener for window resize
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <header className="w-full bg-gray-100">
            <Image
                src={isMobile ? "/images/header-bg-mobile.png" : "/images/header-bg.png"}
                alt="The Social Worker Hub header"
                width={isMobile ? 430 : 1920}
                height={isMobile ? 120 : 250}
                className={`w-full ${isMobile ? 'h-[120px]' : 'h-[250px]'} object-cover`}
                priority
            />
        </header>
    );
};

export default Header;
