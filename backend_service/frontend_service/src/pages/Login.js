import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../../context/AuthContext";

const Login = () => {
    const {loginUser}= useContext(AuthContext)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    if(!credentials.email || credentials.password){
        toast.error("Please enter all the require Fields")
        return
    }

    loginUser(credentials)
  };

  return (
    <>
    <ToastContainer autoclose={2000}/>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="EmailInput">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="PasswordInput">Password</label>
          <input
            type="password" // This should be "password" instead of "email"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Enter your password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary my-3" /> {/* This should be "submit" instead of "subimt" */}
        <p>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
