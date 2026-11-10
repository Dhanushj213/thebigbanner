import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'masthead';
  withText?: boolean;
  textSize?: string;
  href?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  withText = true,
  textSize,
  href = '/',
  className = '',
}) => {
  // Sizing definitions preserving the exact 1199:1312 (~0.914) aspect ratio
  if (size === 'masthead') {
    const content = (
      <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 ${className}`}>
        {/* Official β. Monogram with responsive scaling for masthead */}
        <div className="relative flex-shrink-0 flex items-center justify-center w-[30px] h-[33px] sm:w-[38px] sm:h-[42px] md:w-[46px] md:h-[50px] lg:w-[54px] lg:h-[59px] xl:w-[60px] xl:h-[66px]">
          <Image
            src="/thebigbannerlogo1.png"
            alt="THE BIG BANNER β. Logo"
            fill
            sizes="(max-width: 640px) 30px, (max-width: 768px) 38px, (max-width: 1024px) 46px, 60px"
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {withText && (
          <span
            className={`font-sans font-black tracking-tight text-[#171717] uppercase leading-none select-none ${
              textSize || 'text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'
            }`}
          >
            THE BIG BANNER
          </span>
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
  }

  // Standard fixed sizes for footer, dialogs, certificates, etc.
  const dimensions = {
    sm: { width: 22, height: 24, text: 'text-xs font-bold' },
    md: { width: 32, height: 35, text: 'text-sm font-bold' },
    lg: { width: 44, height: 48, text: 'text-lg sm:text-xl font-black' },
    xl: { width: 56, height: 61, text: 'text-2xl sm:text-3xl font-black' },
    '2xl': { width: 68, height: 74, text: 'text-3xl sm:text-4xl font-black' },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-3 ${className}`}>
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
        <span
          className={`font-sans tracking-tight text-[#171717] uppercase leading-none ${
            textSize || dimensions.text
          }`}
        >
          THE BIG BANNER
        </span>
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
