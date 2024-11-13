import React, { useEffect, useState } from 'react';
import { auth, db } from '../Config/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';
import InstructorDashboard from './instructorsComponents/InstructorDashboard';
import StudentDashboard from './studentComponents/StudentDashboard';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchProfile = () => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    setUserId(user.uid);
                    // Set up Firestore real-time listener on the user's document
                    const userDocRef = doc(db, 'users', user.uid);
                    const unsubscribe = onSnapshot(userDocRef, (userDoc) => {
                        if (userDoc.exists()) {
                            setProfile(userDoc.data()); // Update profile with real-time data
                            setLoading(false);
                        } else {
                            console.error('No user profile data found');
                            setLoading(false);
                        }
                    });

                    // Cleanup the listener when the component unmounts or user changes
                    return () => unsubscribe();
                } else {
                    setLoading(false);
                }
            });
        };
        fetchProfile();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="flex justify-center items-center space-x-2">
                <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                <span className="text-xl font-semibold text-gray-700">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-gray-100 flex align-middle p-8">
            <div className="flex w-full space-x-8">
                <div className="w-1/3 h-1/2 mt-10 bg-white rounded-lg shadow-md p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Profile</h2>
                    {profile ? (
                        <div className="space-y-4">
                            <p><strong>Name:</strong> {profile.firstname} {profile.lastname}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Contact:</strong> {profile.contact}</p>
                            <p><strong>Gender:</strong> {profile.gender}</p>
                            <p><strong>Date of Birth:</strong> {profile.dob}</p>
                            <p><strong>Role:</strong> {profile.role}</p>
                        </div>
                    ) : (
                        <p>No profile data available.</p>
                    )}
                </div>
                
                <div className="w-2/3">
                    {profile?.role === 'instructor' ? (
                        <InstructorDashboard profile={profile} userId={userId} />
                    ) : (
                        <StudentDashboard profile={profile} userId={userId} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
