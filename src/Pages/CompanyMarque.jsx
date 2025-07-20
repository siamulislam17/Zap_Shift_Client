import React from 'react';
import Marquee from 'react-fast-marquee';

import logoone from '../assets/brands/amazon.png';
import logotwo from '../assets/brands/amazon_vector.png';
import logothree from '../assets/brands/casio.png';
import logofour from '../assets/brands/moonstar.png';
import logofive from '../assets/brands/randstad.png';
import logosix from '../assets/brands/start-people 1.png';
import logoseven from '../assets/brands/start.png';

const CompanyMarque = () => {
  const logos = [
    logoone,
    logotwo,
    logothree,
    logofour,
    logofive,
    logosix,
    logoseven,
  ];

  return (
    <div className="py-10   max-w-6xl mx-auto text-center transition-colors duration-300">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        We've helped thousands of sales teams
      </h1>
      <Marquee gradient={false} speed={40} className="bg-transparent my-9">
        {logos.map((logo, idx) => (
            <img
            key={idx}
            src={logo}
            
            className="h-6 sm:h-12 md:h-8 mx-4 md:mx-6 lg:mx-8  duration-300"
            />
        ))}
        </Marquee>

    </div>
  );
};

export default CompanyMarque;
