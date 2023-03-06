import { useContext } from 'react';
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext';

const Navbar = ({ title = "CNS" }) => {
  const {user} = useContext(AuthContext);
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/">
          <a class="navbar-brand">{title}</a>
          </Link>
         
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ms-auto">
              {user ? <><li className="nav-item"
              <button className='btn btn-danger'>Logout</button>
              </li></>:<>
               </>}
               <li className="nav-item">
                <Link to="/login"></Link>
                <a className="nav-link active" href="#">Connexion</a>
              </li>
              <li className="nav-item">
                <Link to="/register"><a className="nav-link" href="#">S'inscrire</a></Link>
              <li/>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  