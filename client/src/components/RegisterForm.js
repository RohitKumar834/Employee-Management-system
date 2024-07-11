import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '',mobile: '',gender: '',course: '',designation: '',image: '',username: ''});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/employee', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data); // Check if 'data' exists
            if (res.data) {
                // Handle successful registration
                navigate('/login'); // Redirect to login page
            } else {
                setError('Unexpected response from the server.');
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data?.message || 'An error occurred during registration.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <button type="submit">Register Employee</button>
            </form>
        </div>
    );
};

export default RegisterForm;
