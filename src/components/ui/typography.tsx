import React from 'react';
import clsx from 'clsx';

export const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h1
    className={clsx(
      'font-sans text-4xl md:text-5xl lg:text-6xl font-bold mb-4',
      'text-visa-navy',
      className
    )}
    {...props}
  />
);

export const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2
    className={clsx(
      'font-sans text-3xl md:text-4xl font-bold mb-3',
      'text-visa-navy',
      className
    )}
    {...props}
  />
);

export const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3
    className={clsx(
      'font-sans text-2xl md:text-3xl font-bold mb-2',
      'text-visa-navy',
      className
    )}
    {...props}
  />
);

export const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h4
    className={clsx(
      'font-sans text-xl md:text-2xl font-semibold mb-2',
      'text-visa-navy',
      className
    )}
    {...props}
  />
);

export const Paragraph: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p
    className={clsx(
      'font-sans text-base md:text-lg text-gray-700 mb-4',
      className
    )}
    {...props}
  />
);

export const Lead: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p
    className={clsx(
      'font-sans text-lg md:text-xl text-gray-600 mb-6',
      className
    )}
    {...props}
  />
); 