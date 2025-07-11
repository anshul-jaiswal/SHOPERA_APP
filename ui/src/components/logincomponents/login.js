import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { __userApi } from '../../Apiurl';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [output, setoutput] = useState('');
    const [showPassword, setShowPassword] = useState(false);



    const handlesubmit = () => {
        const userdetail = { "email": email, "password": password }
        if (!email) {
            setoutput("Email is required");
            return
        }
        else if (!password) {
            setoutput("Password is required")
            return
        }
        else {
            axios.post(__userApi + "login", userdetail).then((response) => {
                const users = response.data.userList;
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("name", users.name);
                localStorage.setItem("email", users.email);
                localStorage.setItem("password", users.password);
                localStorage.setItem("mobile", users.mobile);
                localStorage.setItem("city", users.city);
                localStorage.setItem("address", users.address);
                localStorage.setItem("_id", users._id);
                localStorage.setItem("role", users.role);
                localStorage.setItem("info", users.info);
                localStorage.setItem("gender", users.gender);
                localStorage.setItem("status", users.status);
                (users.role === "admin") ? navigate("/admin") : navigate("/user")
                // setoutput("user login successfull")
                toast.success("User loged in ")
            }).catch((error) => {
                setoutput("Error: " + (error.response?.data?.msg || error.message));
                setTimeout(() => setoutput(""), 3000);
            })
        }
    }
    return (<>
        {/* About Start */}
        <div class="container-xxl py-5 mb-4">
            <div class="container">
                <div class="row g-5 align-items-center mb-4">
                    <div class="col-lg-12 mb-4">

                        <h1 class="mb-4 text-center">Login<span class="text-primary ">Here!!!!!</span></h1>
                        <div className='text-center mt-2 '><h6>Don't have an account? <Link to="/register">Register</Link> </h6></div>
                        <font class="text-center" style={{ "color": "blue" }}>{output}</font>
                        <form>
                            <div class="form-group">
                                <label>Email:</label>
                                <input type="email" class="form-control" value={email} onChange={(e) => { setemail(e.target.value) }}
                                    placeholder="Enter your Email"
                                />
                            </div>
                            <br />
                            <div class="form-group" id="password">
                                <label>Password:</label>
                                <input type={showPassword ? "text" : "password"} class="form-control" value={password} onChange={(e) => {
                                    setpassword(e.target.value)
                                }}
                                    placeholder="Enter your Password" />
                                <span id="passwordIcon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={` fa fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                            <br />
                            <button class="btn btn-success" type="button" onClick={handlesubmit}>submit</button>
                        </form>


                    </div>

                </div>
            </div>
        </div>
        {/* About End */}</>)
}
export default Login;