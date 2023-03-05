import { Route, Switch, Route} from "react-router-dom";
import AuthContext, { AuthContextProvider } from "../context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = ()=>{
  return(
    <AuthContextProvider>
            <Layout>
        <Switch>
          <Route path="/" element={<Home/>}/>
          <Route path="login" element={< Login/>}/>
          <Route path="/register" element={< Register/>}/>
        </Switch>
      </Layout>
    </AuthContextProvider>

    );
};

export default App;