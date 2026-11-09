import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  href?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  withText = true,
  href = '/',
  className = '',
}) => {
  // Sizing definitions preserving the exact 1199:1312 (~0.914) aspect ratio
  const dimensions = {
    sm: { width: 22, height: 24 },
    md: { width: 32, height: 35 },
    lg: { width: 44, height: 48 },
    xl: { width: 64, height: 70 },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official β. Monogram from the supplied logo asset */}
      <div
        className="relative flex-shrink-0 flex items-center justify-center"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <Image
          src="/thebigbannerlogo1.png"
          alt="THE BIG BANNER β. Logo"
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {withText && (
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-sm tracking-tight text-[#171717] uppercase leading-none">
            THE BIG BANNER
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#707070] mt-0.5">
            1 Banner • 1 Owner
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block group focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};
