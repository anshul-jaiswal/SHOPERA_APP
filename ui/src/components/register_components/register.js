import './register.css'
import { useState } from 'react';
import axios from 'axios';
import { __userApi } from '../../Apiurl'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
function Register() {
    const [name, setname] = useState();
    const [password, setpassword] = useState();
    const [email, setemail] = useState();
    const [address, setaddress] = useState();
    const [city, setcity] = useState();
    const [mobile, setmobile] = useState();
    const [gender, setgender] = useState();
    const [output, setoutput] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const handlesubmit = () => {
        const userdetail = { "name": name, "email": email, "password": password, "address": address, "mobile": mobile, "city": city, "gender": gender }

        axios.post(__userApi + "save", userdetail).then((response) => {
            setoutput("user Register successfully")
            toast.success("user Register successfully");
            setname("");
            setemail("");
            setpassword("");
            setaddress("");
            setmobile("");
            setcity("");
            setTimeout(() => setoutput(""), 3000);
        }).catch((error) => {
            setoutput("Error: " + (error.response?.data?.msg || error.message));
            toast.error("user Register not successfully");
            setTimeout(() => setoutput(""), 3000);
        })
    }
    return (<>
        {/* About Start */}
        <div class="container-xxl py-5 mb-4">
            <div class="container ">
                <div class="row g-5 align-items-center mb-4">
                    <div class="col-lg-12  mb-4">

                        <h1 class="mb-4 text-center">Register <span class="text-primary">Here!!!!!</span></h1>
                        <div className='text-center mt-2 '><h6>Already have an account? <Link to="/login">Login</Link> </h6></div>
                        <font style={{ color: "blue" }}>{output}</font>
                        <form>

                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" class="form-control" value={name}
                                    onChange={(e) => { setname(e.target.value) }}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" value={email}
                                    onChange={(e) => { setemail(e.target.value) }}
                                    placeholder="Enter your Email"
                                />
                            </div>
                            <br />
                            <div class="form-group" id="password">
                                <label for="password">Password:</label>
                                <input type={showPassword ? "text" : "password"} class="form-control"
                                    value={password}
                                    onChange={(e) => { setpassword(e.target.value) }}
                                    placeholder="Create a strong password"
                                />
                                <span id="passwordIcon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={` fa fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="address">Address:</label>
                                <textarea class="form-control" value={address}
                                    onChange={(e) => { setaddress(e.target.value) }}
                                    placeholder="Enter your full address"
                                ></textarea>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="mobile">Mobile:</label>
                                <input type="text" class="form-control" value={mobile}
                                    onChange={(e) => { setmobile(e.target.value) }}
                                    placeholder="Enter your 10-digit mobile number"
                                />
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="city">City:</label>
                                <input list='city-option' class="form-control" value={city} onChange={(e) => { setcity(e.target.value) }}
                                    placeholder="Select or type your city" />
                                <datalist id='city-option'
                                >
                                    <option>select city</option>
                                    <option>Indore</option>
                                    <option>Ujjain</option>
                                    <option>Bhopal</option>
                                    <option>Dewas</option>
                                </datalist>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="gender">Gender:</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                Male :<input type="radio" value="male" name="gender" onChange={(e) => { setgender(e.target.value) }} />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                Female :<input type="radio" value="female"
                                    name="gender" onChange={(e) => { setgender(e.target.value) }} />
                            </div>
                            <br />
                            <button type="button" onClick={handlesubmit} class="btn btn-success">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        {/* About End */}</>)
}
export default Register;