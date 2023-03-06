import { createContext, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Toast, ToastContainer } from "react-toastify/dist/components";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // login Request
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error){
        localStorage.setItem("token", result.token);
        setUser(result.user)
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Register Request

  const registerUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error){
        localStorage.setItem("token", result.token);
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser,user, Setuser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
