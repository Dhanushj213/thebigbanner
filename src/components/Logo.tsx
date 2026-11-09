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
      <div className={`inline-flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 ${className}`}>
        {/* Official β. Monogram with responsive scaling for masthead */}
        <div className="relative flex-shrink-0 flex items-center justify-center w-[36px] h-[40px] sm:w-[46px] sm:h-[51px] md:w-[56px] md:h-[62px] lg:w-[64px] lg:h-[70px] xl:w-[72px] xl:h-[79px]">
          <Image
            src="/thebigbannerlogo1.png"
            alt="THE BIG BANNER β. Logo"
            fill
            sizes="(max-width: 640px) 36px, (max-width: 768px) 46px, (max-width: 1024px) 56px, 72px"
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {withText && (
          <span
            className={`font-sans font-black tracking-tight text-[#171717] uppercase leading-none select-none ${
              textSize || 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.65rem]'
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
