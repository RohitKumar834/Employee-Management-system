import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProfileUpdateForm = () => {
    const { id } = useParams(); 
    const [formData, setFormData] = useState({ name: '', email: '', password: '',mobile: '',gender: '',course: '',designation: '',image: '',username: ''});
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();


    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`/employee/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token // Assuming 'token' is a variable containing the JWT token
                }
            });
            console.log(res.data); // Check if 'data' exists
            if (res.data) {
                setMessage('Profile updated successfully.');
            } else {
                setError('Unexpected response from the server.');
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data?.message || 'An error occurred during profile update.');
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={onSubmit}>
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={formData.username} onChange={onChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={onChange} required />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={onChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={onChange} />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={onChange} />
                </div>
                <div>
                    <label>Designation:</label>
                    <input type="text" name="designation" value={formData.designation} onChange={onChange} />
                </div>
                <div>
                    <label>Gender:</label>
                    <input type="text" name="gender" value={formData.gender} onChange={onChange} />
                </div>
                <div>
                    <label>Course:</label>
                    <input type="text" name="course" value={formData.course} onChange={onChange} />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" name="image" value={formData.image} onChange={onChange} />
                </div>
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
};

export default ProfileUpdateForm;
