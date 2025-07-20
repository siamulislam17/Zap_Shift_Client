// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaShippingFast, FaMapMarkerAlt, FaBoxOpen } from 'react-icons/fa';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: 'spring',
    },
  }),
};

const About = () => {
  const infoCards = [
    {
      icon: <FaShippingFast className="text-3xl text-blue-500" />,
      title: 'What We Do',
      description:
        'We provide fast, secure, and reliable parcel delivery services across Bangladesh. From e-commerce deliveries to personal packages, we’ve got you covered.',
    },
    {
      icon: <FaBoxOpen className="text-3xl text-yellow-400" />,
      title: 'Our Services',
      description:
        '• Real-time Tracking\n• Cash-on-Delivery\n• Return Management\n• Same-day & Next-day Delivery\n• Business Dashboard',
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-red-400" />,
      title: 'Our Location',
      description:
        'Our head office is located in Dhaka, Bangladesh. We operate nationwide with 24/7 support and dedicated pickup/drop-off points.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12"
      >
        About Us
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {infoCards.map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md dark:shadow-lg hover:shadow-blue-500/40 transition-shadow"
          >
            <div className="mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
