import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Img from '../../assets/agent-pending.png';
import axios from 'axios';
import UseAxiosSecure from '../../Contexts/UseAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router';

const BeARider = () => {
const navigate = useNavigate();
   const  UseAxiosSecureUrl = UseAxiosSecure();
    const { user } = use(AuthContext);
  const [data, setData] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [voterIdAvailable, setVoterIdAvailable] = useState(true);
  const [ageWarning, setAgeWarning] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchAge = watch('age');

  useEffect(() => {
    fetch('/public/areaName.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error loading regions:', err));
  }, []);

  const onSubmit = (formData) => {
    if (formData.age < 18) {
      setAgeWarning('You must be at least 18 years old to apply as a rider.');
      return;
    }
    setAgeWarning('');
    console.log('Form submitted:', formData);

    // Send data to backend here
    UseAxiosSecureUrl.post('/riders', formData)
      .then(() => {
        Swal.fire({
          title: 'Application Submitted',
          text: 'Your application has been submitted successfully.',
          icon: 'success',
        });
        navigate('/'); // Redirect to home or another page after submission
      })
      .catch(() => {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while submitting your application.',
          icon: 'error',
        });
      });
  };

  const districts = data.find((d) => d.division === selectedDivision)?.districts || [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-10">
      <div className="max-w-6xl mx-auto flex flex-col-reverse dark:bg-gray-800 bg-white p-3 lg:p-10 rounded-2xl py-7 shadow-xl lg:flex-row items-center gap-10">
        {/* Left section: Text and Form */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-4xl font-bold mb-3">Be a Rider</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <input
              type="email"
              placeholder="Email"
              className="input w-full"
              defaultValue={user?.email || ''}
              {...register('email', { required: true })}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="input w-full"
              {...register('name', { required: true })}
            />
            <textarea
              placeholder="Address"
              className="input w-full lg:col-span-2"
              rows={3}
              {...register('address', { required: true })}
            />

            <input
              type="number"
              placeholder="Age"
              className="input w-full"
              {...register('age', { required: true, min: 1 })}
            />

            {ageWarning && (
              <p className="text-red-500 text-sm lg:col-span-2">{ageWarning}</p>
            )}

            {/* Division = Warehouse */}
            <select
              className="input w-full"
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Warehouse (Division)
              </option>
              {data.map((div, idx) => (
                <option key={idx} value={div.division}>
                  {div.division}
                </option>
              ))}
            </select>

            {/* District = Region */}
            <select
              className="input w-full"
              {...register('district', { required: true })}
              disabled={!selectedDivision}
            >
              <option value="" disabled>
                Select Region (District)
              </option>
              {districts.map((district, idx) => (
                <option key={idx} value={district}>
                  {district}
                </option>
              ))}
            </select>

            {/* Voter ID or Birth Certificate */}
            <div className="lg:col-span-2">
              <label className="inline-flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={voterIdAvailable}
                  onChange={() => setVoterIdAvailable(!voterIdAvailable)}
                  className="form-checkbox"
                />
                <span>Do you have a Voter ID?</span>
              </label>

              {voterIdAvailable ? (
                <input
                  type="text"
                  placeholder="Voter ID Number"
                  className="input w-full"
                  {...register('voterId', { required: voterIdAvailable })}
                />
              ) : (
                <input
                  type="text"
                  placeholder="Birth Certificate Number"
                  className="input w-full"
                  {...register('birthCert', { required: !voterIdAvailable })}
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-lime-400 hover:bg-lime-500 text-white font-semibold py-2 px-6 rounded-md transition lg:col-span-2"
            >
              Continue
            </button>
          </form>
        </div>

        {/* Right section: Image */}
        <div className="lg:w-1/3 w-2/3">
          <img src={Img} alt="Be A Rider" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
