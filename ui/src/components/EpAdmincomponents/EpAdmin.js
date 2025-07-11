import './EpAdmin.css'
import { __userApi } from '../../Apiurl'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
function EpAdmin() {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [address, setaddress] = useState()
    const [city, setcity] = useState()
    const [gender, setgender] = useState();
    const [m, setm] = useState()
    const [f, setf] = useState()
    const [mobile, setmobile] = useState();
    const [output, setoutput] = useState();

    useEffect(() => {
        axios.get(__userApi + "fetch?email=" + localStorage.getItem("email")).then((response) => {
            const users = response.data[0];
            setname(users.name)
            setemail(users.email)
            setaddress(users.address)
            setcity(users.city)
            setmobile(users.mobile)
            if (users.gender == "male")
                setm("checked");
            else
                setf("checked");

        }).catch((error) => {
            setoutput("Error: " + (error.response?.data?.msg || error.message));
            setTimeout(() => setoutput(""), 3000);
            toast.error("Profile not update successfully")
            
        })
    }, [])

    const handlesubmit = () => {
        const userdetail = { "condition_obj": { "email": email }, "content_obj": { "name": name, "address": address, "mobile": mobile, "city": city, "gender": gender, } }
        axios.patch(__userApi + "update", userdetail).then((response) => {
            setoutput("Profile Edit successfully")
            setTimeout(() => setoutput(""), 3000);
            toast.success("Profile Edit successfully")

        }).catch((error) => {
            setoutput("Profile not edit successfully");
            setTimeout(() => setoutput(""), 3000);
            toast.error("Profile not edit successfully");
        
        })



    }
    return (<>

        {/* About Start */}
        <div class="container-xxl py-5 mb-4">
            <div class="container">
                <div class="row g-5 align-items-center mb-4">
                    <div class="col-lg mb-4">

                        <h1 class="mb-4">Edit <span class="text-primary text-uppercase">Profile Here!!!!!</span></h1>
                        <font>{output}</font>
                        <form>

                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" class="form-control" value={name}
                                    onChange={(e) => { setname(e.target.value) }}
                                />
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" value={email}
                                    onChange={(e) => { setemail(e.target.value) }}
                                />
                            </div>
                            <br />

                            
                            <div class="form-group">
                                <label for="address">Address:</label>
                                <textarea class="form-control" value={address}
                                    onChange={(e) => { setaddress(e.target.value) }}
                                ></textarea>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="mobile">Mobile:</label>
                                <input type="text" class="form-control" value={mobile}
                                    onChange={(e) => { setmobile(e.target.value) }}
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
                                Male :<input type="radio" value="male" checked={m} name="gender" onChange={(e) => { setgender(e.target.value) }} />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                Female :<input type="radio" value="female"
                                    name="gender" checked={f} onChange={(e) => { setgender(e.target.value) }} />
                            </div>
                            <br />
                            <button type="button" onClick={handlesubmit} class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* About End */}


    </>)
}
export default EpAdmin;