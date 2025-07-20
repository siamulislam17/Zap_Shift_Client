import React from 'react';
import { motion } from 'framer-motion';
import { FaBan } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <FaBan className="text-red-500 text-6xl mb-4 animate-bounce" />
            <h1 className="text-4xl font-bold text-red-600 mb-2">403 Forbidden</h1>
            <p className="text-lg text-gray-600 mb-6">You do not have permission to access this page.</p>
            <Link
                to="/"
                className="btn btn-error text-white hover:scale-105 transition-transform duration-200"
            >
                Go Back Home
            </Link>
        </motion.div>
    );
};

export default Forbidden;
