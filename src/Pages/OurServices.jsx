import React from "react";
import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaGlobeAsia,
  FaBoxOpen,
  FaHandHoldingUsd,
  FaWarehouse,
  FaUndoAlt,
} from "react-icons/fa";

const services = [
  {
    title: "Express & Standard Delivery",
    desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast />,
  },
  {
    title: "Nationwide Delivery",
    desc: "We deliver parcels nationwide with home delivery in every district; ensuring your products reach customers within 48–72 hours.",
    icon: <FaGlobeAsia />,
    
  },
  {
    title: "Fulfillment Solution",
    desc: "We also offer customized service with inventory management support, order online processing, packaging, and other sales support.",
    icon: <FaBoxOpen />,
  },
  {
    title: "Cash on Home Delivery",
    desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaHandHoldingUsd />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    desc: "Customized corporate services which include warehouse and inventory management support.",
    icon: <FaWarehouse />,
  },
  {
    title: "Parcel Return",
    desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndoAlt />,
  },
];

const OurServices = () => {
  return (
    <div className="bg-[#03373D]  dark:bg-gray-900 shadow-xl max-w-6xl my-20 rounded-4xl p-3 md:p-20 mx-3 md:mx-auto text-white py-12 px-4 rounded-t-3xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-4">Our Services</h2>
        <p className="text-center text-gray-200 mb-10">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to
          business shipments — we deliver on time, every time.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
            data-aos="fade-up"
              key={idx}
              whileHover={{ scale: 1.03 }}
             
              className={`p-6 rounded-xl bg-white dark:bg-gray-800  shadow-md hover:bg-[#CAEB66] dark:hover:bg-gray-700`}
            >
              <div className="text-4xl mb-4 text-teal-600 dark:text-teal-300 flex justify-center">{service.icon}</div>
              <h3 className="text-xl text-gray-800 dark:text-white font-semibold text-center mb-2">{service.title}</h3>
              <p className="text-sm text-center dark:text-gray-50 text-gray-700">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
