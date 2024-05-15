import { BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./view/Register"
import Login from "./view/Login"
import App from "./app"
export default function Main() {

    return (
            <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Login/>}/>
                <Route path="/home" element={<App/>}/>
                <Route path="/register"  element={<Register/>}/>   
            </Routes>
            </BrowserRouter>
        )
    };

