import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Auth() {
    const navigate = useNavigate();
    const path = window.location.pathname
    useEffect(() => {
        if (path == "/admin") {
            if (!localStorage.getItem("token") || localStorage.getItem("role") != "admin") {
                navigate("/login")
            }
        }
        else if (path == "/user") {
            if (!localStorage.getItem("token") || localStorage.getItem("role")!= "user") {
                navigate("/login")
            }
        }

        else {
            if (localStorage.getItem("role") == "admin") {
                navigate("/admin")
            }
            else if (localStorage.getItem("role") == "user") {
                navigate("/user")
            }
            else {
                navigate(path)
            }
        }
    }, [])
    return (<>

    </>)
}
export default Auth;