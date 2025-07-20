import React, { use, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaPlus, FaEye, FaEyeSlash  } from "react-icons/fa";
import axios from 'axios';


import UseAsios from '../Contexts/useAsios';

const Register = () => {

  const UseAsiosUrl = UseAsios();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'; // Redirect path after login
  const navigate = useNavigate(); // Use navigate to redirect after login
  const { CreateAccountWithEmail, GoogleLogIn, UserUpdate } = use(AuthContext);
  const [profileImg, setProfileImg] = useState('')

  // State to manage password visibility
  const [showPassword, setShowPassword] = React.useState(false);


  // Initialize the form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();



  const handleUploadImg = async(event) => {
    const imgFile = event.target.files[0];
    // console.log(imgFile);
    const formData = new FormData();
    formData.append('image', imgFile);


   



    // Upload the image to imgbb
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`;
    const response = await axios.post(imageUploadUrl,formData);
    //  console.log(response.data.data.url);
     setProfileImg(response.data.data.url);
    
  };
   

  const onSubmit = data => {
    // console.log(data);
    CreateAccountWithEmail(data.email, data.password)
    .then(async () => {
       //user info to the DB
      const userInfo = {
        email: data.email,
        name: data.name,
        created_at: new Date().toISOString(),
        role: 'user',// default role
        profileImg: profileImg
      } 

      const userRes = await UseAsiosUrl.post('/users', userInfo);
      console.log(userRes.data);
      UserUpdate(data.name, profileImg); 
    })
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'User created successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
       navigate(from, { replace: true }); // Redirect to the previous page or home
      })
      .catch(error => {
        console.error("Error creating user:", error);
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        }); 
      });
  };

  const handleGoogleLogin =() => {
    GoogleLogIn()
      .then((result) => {
        Swal.fire({
          title: 'Success!',
          text: 'Google Login Successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
          created_at: new Date().toISOString(),
          role: 'user', // default role
          profileImg: result.user.photoURL // Use the photo URL from Google
        }

        // Send userInfo to your backend
       const userRes = UseAsiosUrl.post('/users', userInfo);
      console.log(userRes.data);

        navigate(from, { replace: true }); // Redirect to the previous page or home
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: `Google Login Failed: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md dark:bg-gray-700">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
     

    {/* Image Upload Field */}
    <div className="">
      <label className="inline-block cursor-pointer relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadImg}
          className="hidden"
        />
        <div className="w-20 h-20 mt-6 mx-auto rounded-full border-2 border-dashed border-green-400 flex items-center justify-center overflow-hidden relative group bg-white hover:opacity-80 transition">
          <FaPlus className="text-green-500 text-xl" />
        </div>
      </label>
      <p className="text-sm text-gray-500 mt-1">Upload Photo</p>
    </div>

        
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        

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
        <div className="relative">
      <label className="block text-sm font-medium mb-1">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            message: "Password must contain only A-Z and a-z ",
          },
        })}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
      />
      <div
        className="absolute right-3 top-10 cursor-pointer text-gray-600"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
      </div>


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn-primary text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Register
        </button>
        <p>Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link></p>
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

export default Register;
