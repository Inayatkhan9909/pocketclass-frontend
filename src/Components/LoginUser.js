// src/Login.js
import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { auth } from '../Config/firebase.config'; // Import auth after Firebase has been initialized
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!formData.email) errors.email = "Email is required";
        if (!formData.password) errors.password = "Password is required";
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
            const { email, password } = formData;

            // Firebase Authentication Sign-In
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            const user = userCredential.user;
            
            // Get the Firebase ID token
            const idToken = await user.getIdToken();

            // Send the token to the backend for validation
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`, // Attach token to Authorization header
                },
                body: JSON.stringify({
                    token: idToken,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Token validated:', data);
                navigate('/');

            } else {
                console.error('Error validating token:', data.message);
            }
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password. Please try again.');
            } else if (error.code === 'auth/user-not-found') {
                toast.error('No user found with this email.');
            } else if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email format.');
            } else if (error.code === 'auth/invalid-credential') {
                toast.error('Invalid email or password. Please try again.');
            } else {
                console.error('Error during login:', error.message);
                toast.error('Login failed');
            }
        }
         finally{
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign in to your account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={loading}
                    >

                       {loading ? 'sign in...' : 'Sign in'} 
                    </button>
                </form>
                <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
           Create Account
          </a>
        </p>
            </div>
        </div>

        </>
    );
};

export default Login;
