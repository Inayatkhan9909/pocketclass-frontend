// src/Register.js
import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    gender: '',
    dob: '',
    password: '',
    role: '', // for Student or Instructor
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.firstname) errors.firstname = "First name is required";
    if (!formData.lastname) errors.lastname = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.contact) errors.contact = "Contact is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.dob) errors.dob = "Date of birth is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.role) errors.role = "Role selection is required";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/register`, formData);

      if (response.data.message === 'Registration successful') {
        toast.success(response.data.message);
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          contact: '',
          gender: '',
          dob: '',
          password: '',
          role: '',
        });
        navigate('/login')
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
      />

      <div className="max-w-screen-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <form onSubmit={handleSubmit} >

          <div className='grid grid-cols-2 gap-x-8'>

            <div className="mb-4">
              <label className="block text-gray-700">First Name:</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contact:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.contact && <p className="text-red-500">{errors.contact}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.dob && <p className="text-red-500">{errors.dob}</p>}
            </div>

          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Please select whether you are a Student or an Instructor</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
            {errors.role && <p className="text-red-500">{errors.role}</p>}
          </div>
          <div className='flex justify-center'>
            <button
              type="submit"
              className=" m-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

 
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </>
  );
};

export default Register;
