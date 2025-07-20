import React from 'react';
import { motion } from 'framer-motion';
import imgOne from '../assets/Illustration/safe-delivery.png';
import imgTwo from '../assets/Illustration/Transit warehouse.png';


// Removed direct image imports. Using placeholder URLs for demonstration.
// You should replace these with your actual image URLs or local paths once resolved.

const Features = () => {
    // Define the feature data
    const featuresData = [
        {
            id: 1,
            title: "Live Parcel Tracking",
            description: "Stay updated in real-time with a live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            image:imgOne, // Placeholder for photoOne
        },
        {
            id: 2,
            title: "100% Safe Delivery",
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            image: imgTwo, // Placeholder for photoTwo
        },
        {
            id: 3,
            title: "24/7 Call Center Support",
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            image: imgTwo, // Placeholder for photoThree
        },
    ];

    // Animation variants for Framer Motion
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

     return (
        <section className="py-16 light:bg-gray-50  font-inter">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Title - Optional, uncomment if you want a main title for the features */}
                {/* <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 rounded-lg">Our Awesome Features</h2> */}

                <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-1 gap-8">
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={itemVariants}
                        >
                            {/* Image/Icon Section - This div ensures the image is on the left in md and up */}
                            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-gray-100 dark:bg-gray-300 rounded-full flex items-center justify-center p-4">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full   object-contain"
                                    // The onError handler provides a fallback in case the image fails to load
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/128x128/E0E0E0/808080?text=Icon'; }}
                                />
                            </div>

                            {/* Content Section */}
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3 rounded-lg">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-200 leading-relaxed rounded-lg">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
