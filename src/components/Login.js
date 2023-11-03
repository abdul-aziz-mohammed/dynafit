import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setCurrentUser } = useAuth();

 const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            setMessage(response.data.message);
            if (response.data.message === "Logged in successfully") {
                setCurrentUser({ email });  // Set the user as logged in
            }
        } catch (error) {
            setMessage("Failed to login. Check your credentials.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <div>
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );    
}

export default Login;