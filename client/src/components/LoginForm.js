import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data); // Check if 'data' exists
            if (res.data && res.data.token) {
                // Handle successful login
                localStorage.setItem('token', res.data.token);
                navigate('/employees'); // Redirect to profile page
            } else {
                setError('Unexpected response from the server.');
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data?.message || 'An error occurred during login.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={onSubmit}>
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={formData.username} onChange={onChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={onChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
