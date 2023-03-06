import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../../context/AuthContext";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!credentials.email || !credentials.password || !credentials.confirmPassword) {
      toast.error("Please enter all the required fields");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Password doesn't match!");
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <form onSubmit={handleSubmit}>
        <h3>Create your account</h3>
        <div className="form-group">
          <label htmlFor="nameInput">Full names</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="Full names"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="name@example.com"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Enter your password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPasswordInput">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPasswordInput"
            placeholder="Confirm Your Password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary my-3" />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
