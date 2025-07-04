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
                    setoutput("password not updated successfully")
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
                            <div class="form-group">
                                <label>Old Password:</label>
                                <input type="password" class="form-control" value={oldpass} onChange={(e) => { setoldpass(e.target.value) }} />
                            </div>
                            <br />
                            <div class="form-group">
                                <label>New Password:</label>
                                <input type="password" class="form-control" value={newpass} onChange={(e) => { setnewpass(e.target.value) }} />
                            </div>
                            <br />
                            <div class="form-group">
                                <label>New Password:</label>
                                <input type="password" class="form-control" value={cnpass} onChange={(e) => { setcnpass(e.target.value) }} />
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