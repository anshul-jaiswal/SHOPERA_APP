import './CpAdmin.css'
import { __userApi } from '../../Apiurl'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function CpAdmin() {
    const [oldpass, setoldpass] = useState();
    const [newpass, setnewpass] = useState();
    const [output, setoutput] = useState()
    const [cnpass, setcnpass] = useState();
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const handlesubmit = () => {
        axios.get(__userApi + "fetch?email=" + localStorage.getItem('email') + "&password=" + oldpass).then((response) => {
            if (newpass == cnpass) {
                const userdetail = { "condition_obj": { "email": localStorage.getItem('email') }, "content_obj": { "password": cnpass } }
                axios.patch(__userApi + "update", userdetail).then((response) => {
                    setoutput("password updated successfully");
                    toast.success("password updated successfully");
                    setoldpass("")
                    setnewpass("")
                    setcnpass("")
                }).catch((error) => {
                    setoutput("error", error)
                    toast.error("password not updated successfully")

                    setoldpass("")
                    setnewpass("")
                    setcnpass("")

                })
            }
            else {
                setoutput("old and new password not match")
                toast.error("old and new password not match")

                setoldpass("")
                setnewpass("")
                setcnpass("")
            }
        }).catch((error) => {
            setoutput("old password is not matched")
            toast.error("old password is not matched")

        })


    }

    return (<>

        {/* About Start */}
        <div class="container-xxl py-5 mb-4">
            <div class="container">
                <div class="row g-5 align-items-center mb-4">
                    <div class="col-lg mb-4">
                        <h1 class="mb-4">Welcome to <span class="text-primary text-uppercase">CpAdmin Dashboard</span></h1>
                        <font class="text-center" style={{ "color": "blue" }}>{output}</font>
                        <form>
                            <div class="form-group password-wrap">
                                <label>Old Password:</label>
                                <input type={showOld ? "text" : "password"} class="form-control" value={oldpass} onChange={(e) => { setoldpass(e.target.value) }}
                                    placeholder='Enter old password'
                                />
                                <span
                                    className="password-toggle"
                                    onClick={() => setShowOld(!showOld)}
                                >
                                    <i className={`fas ${showOld ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                            <br />
                            <div class="form-group password-wrap">
                                <label>New Password:</label>
                                <input type={showNew ? "text" : "password"} class="form-control" value={newpass} onChange={(e) => { setnewpass(e.target.value) }}
                                placeholder='Enter new password' />
                                <span
                                    className="password-toggle"
                                    onClick={() => setShowNew(!showNew)}
                                >
                                    <i className={`fas ${showNew ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                            <br />
                            <div class="form-group password-wrap">
                                <label>Confirm Password:</label>
                                <input type={showConfirm ? "text" : "password"} class="form-control" value={cnpass} onChange={(e) => { setcnpass(e.target.value) }} 
                                placeholder='Enter confirm password' />
                                <span
                                    className="password-toggle"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                >
                                    <i className={`fas ${showConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                            <br />
                            <button class="btn btn-success" type="button" onClick={handlesubmit}>Update password</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        {/* About End */}


    </>)
}
export default CpAdmin;