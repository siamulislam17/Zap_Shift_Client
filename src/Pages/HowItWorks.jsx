import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaTruckMoving } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const steps = [
  { title: "Booking Pick & Drop", desc: "From personal packages to business shipments — we deliver on time, every time." },
  { title: "Cash On Delivery", desc: "From personal packages to business shipments — we deliver on time, every time." },
  { title: "Delivery Hub", desc: "From personal packages to business shipments — we deliver on time, every time." },
  { title: "Booking SME & Corporate", desc: "From personal packages to business shipments — we deliver on time, every time." },
];

const HowItWorks = () => {
  useEffect(() => {
      AOS.init({
        duration: 800, // animation duration
        // once: true, // animation only once when scrolling
      });
    }, []);
  return (
    <div className=" py-10 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8 text-center">How it Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            data-aos="fade-up"
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center"
          >
            <div className="flex justify-center mb-4 text-3xl text-teal-700 dark:text-teal-300">
              <FaTruckMoving />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
