import React, { use } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
  const { SignIn, GoogleLogIn } = use(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'; // Redirect path after login
  const navigate = useNavigate(); // Use navigate to redirect after login


  // Initialize the form methods from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    SignIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Login Successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate(from, { replace: true }); // Redirect to the previous page or home
      })
      .catch(error => {
        console.error("Login Failed", error);
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };
// Handle Google Login
  const handleGoogleLogin = () => {
    GoogleLogIn()
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Google Login Successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate(from, { replace: true }); // Redirect to the previous page or home
      })
      .catch(error => {
        console.error("Google Login Failed", error);
        Swal.fire({
          title: 'Error!',
          text: 'Google Login Failed!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow- dark:bg-gray-700">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Forgot Password */}
        <p className="text-sm text-right text-green-600 cursor-pointer hover:underline">
          Forgot password?
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn-primary text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Login
        </button>
        <p>Don't have an account? <Link to="/register" className="text-green-600 hover:underline">Register</Link></p>
      </form>
      <div className="mt-6 text-center">
        <div className='divider'>or</div>
        <button onClick={handleGoogleLogin} className="btn bg-white w-full text-black border-[#e5e5e5]">
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
        Login with Google
      </button>
      </div>
    </div>
  );
};

export default Login;
