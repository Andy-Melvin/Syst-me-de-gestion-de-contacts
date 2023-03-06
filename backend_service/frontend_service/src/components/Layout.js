import Navbar from "./Navbar";

const Layout =(navbar=true, children) =>{
    return (
        <>
        {navabar &&  <Navbar /> } 
        <div classname="container mt-3">{children}</div>
    </>
    );
};

export default Layout;
