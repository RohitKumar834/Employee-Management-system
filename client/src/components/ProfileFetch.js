import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileFetch = () => {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/employees', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                console.log(res.data); // Check if 'data' exists
                if (res.data) {
                    setProfiles(res.data); // Assuming the response is an array of profiles
                } else {
                    setError('Unexpected response from the server.');
                }
            } catch (err) {
                console.error(err.response?.data || err.message);
                setError(err.response?.data?.message || 'An error occurred while fetching the profiles.');
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div>
            <h2>Employee Details</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {profiles.length > 0 ? (
                <div>
                    {profiles.map((profile) => (
                        <div key={profile.id}>
                            <p><strong>Name:</strong> {profile.name}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Mobile:</strong> {profile.mobile}</p>
                            <p><strong>Designation:</strong> {profile.designation}</p>
                            <p><strong>Gender:</strong> {profile.gender}</p>
                            <p><strong>Course:</strong> {profile.course}</p>
                            <p><strong>Image:</strong> {profile.image}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading Employee Details...</p>
            )}
        </div>
    );
};

export default ProfileFetch;
