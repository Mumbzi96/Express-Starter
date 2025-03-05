import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from "@uidotdev/usehooks";
import { useAuthContext } from '../../context/useAuthContext';

const Login = () => {
    const size = useWindowSize();

    const navigate = useNavigate()

    const { isAuthenticated, login } = useAuthContext()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated]);

    const validate = () => {
        let tempErrors = {};
        if (!formData.email) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            tempErrors.password = "Password is required";
        } 
        // else if (formData.password.length < 6) {
        //     tempErrors.password = "Password must be at least 6 characters";
        // }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            login(formData)
        }
    };

    return (
        <div style={{ textAlign: 'center', width: size.width }}>
            <div style={{ maxWidth: "300px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
                        />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
                        />
                        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                    </div>
                    <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#105d5e", color: "white", border: "none", borderRadius: "4px", marginTop: "10px" }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
