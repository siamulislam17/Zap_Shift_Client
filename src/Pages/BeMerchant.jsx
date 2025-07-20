import React from 'react';
import Swal from 'sweetalert2';
import Bgimg from '../assets/Be a merchant/be-a-merchant-bg.png';
import location from '../assets/Be a merchant/location-merchant.png';

const BeMerchant = () => {
  const handleMerchantClick = () => {
    Swal.fire({
      title: 'Become a Merchant',
      text: 'Please contact our team at merchant@profast.com or fill out the form on our website!',
      icon: 'info',
      confirmButtonText: 'Okay!',
      confirmButtonColor: '#CAEB66',
    });
  };

  const handleEarnClick = () => {
    Swal.fire({
      title: 'Earn with Profast',
      text: 'You can earn by joining our delivery partner program. Visit the careers section.',
      icon: 'success',
      confirmButtonText: 'Got it!',
      confirmButtonColor: '#CAEB66',
    });
  };

  return (
    <div
      className="rounded-4xl bg-top md:bg-center my-20 max-w-6xl mx-3 md:mx-auto bg-no-repeat bg-cover text-white"
      style={{
        backgroundImage: `url(${Bgimg})`,
      }}
    >
      <div className="flex rounded-4xl flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 md:py-20 bg-[#003B3A]/90 dark:bg-gray-800/90 backdrop-blur-sm">
        {/* Text Section */}
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold leading-snug mb-4">
            Merchant and Customer Satisfaction<br /> is Our First Priority
          </h2>
          <p className="text-gray-100 mb-8 text-sm md:text-base">
            We offer the lowest delivery charge with the highest value along with
            100% safety of your product. Profast Courier delivers your parcels in every
            corner of Bangladesh right on time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={handleMerchantClick}
              className="bg-[#CAEB66] text-black font-semibold px-6 py-2 rounded-full hover:bg-lime-400 transition"
            >
              Become a Merchant
            </button>
            <button
              onClick={handleEarnClick}
              className="border border-[#CAEB66] text-[#CAEB66] font-semibold px-6 py-2 rounded-full hover:bg-lime-300 hover:text-black transition"
            >
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-10 md:mt-0">
          <img src={location} alt="location graphic" className="max-w-sm w-full" />
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
