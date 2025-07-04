import './manageuser.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { __userApi } from '../../Apiurl';
import { toast } from 'react-hot-toast';
function Manageuser() {
    const [usedetail, setuserdetail] = useState()
    const [output, setoutput] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(__userApi + "fetch?role=user").then((response) => {
            setuserdetail(response.data)
        }).catch((error) => {
            setoutput(error?.response?.data?.message || error.message || "Something went wrong");
        })
    })

    const handlechange = (_id, s) => {
        if (s == 'verify') {
            const updateDetail = { "condition_obj": { "_id": _id }, "content_obj": { "status": 1 } }
            axios.patch(__userApi + "update", updateDetail).then((response) => {
                setoutput("Verified")
                toast.success("Verified")

                navigate("/manageuser")
            }).catch((error) => {
                setoutput(error?.response?.data?.message || error.message || "Something went wrong");
            })
        }
        else if (s == 'block') {
            const updateDetail = { "condition_obj": { "_id": _id }, "content_obj": { "status": 0 } }
            axios.patch(__userApi + "update", updateDetail).then((response) => {
                setoutput("User Blocked Successfully")
                toast.error("User Blocked Successfully")
                navigate("/manageuser")
            }).catch((error) => {
                setoutput(error?.response?.data?.message || error.message || "Something went wrong");
            })
        }
        else {
            const deletuser = { "condition_obj": { "_id": _id } }
            axios.delete(__userApi + "delete", deletuser).then((response) => {
                setoutput("user Deleted")
                toast.success("user Deleted")
                navigate("/manageuser")
            }).catch((error) => {
                setoutput(error?.response?.data?.message || error.message || "Something went wrong");
            })
        }
    }
    return (<>

        {/* About Start */}
        <div class="container-xxl py-5 mb-4">
            <div class="container-xxl">
                <div class="row g-5 align-items-center mb-4">
                    <div class=" col-lg mb-4">

                        <h1 class="mb-4">Show & <span class="text-primary ">Manage user Details!!!!!</span></h1>
                        <br />
                        <h3 className='text-center justify-content-center'>{output}</h3>
                        <table className=' table table-bordered border-dark justify-content-center text-center flex-wrap ' border={2}>
                            <tr>
                                <th className='border border-dark ' border={2}>Regid</th>
                                <th className='border border-dark ' border={2}>Name</th>
                                <th className='border border-dark ' border={2}>Email</th>
                                <th className='border border-dark ' border={2}>Mobile</th>
                                <th className='border border-dark ' border={2}>Address</th>
                                <th className='border border-dark ' border={2}>City</th>
                                <th className='border border-dark ' border={2}>Gender</th>
                                <th className='border border-dark ' border={2}>Role</th>
                                <th className='border border-dark ' border={2}>Info</th>
                                <th className='border border-dark ' border={2}>Status</th>
                                <th className='border border-dark ' border={2}>
                                    Action
                                </th>
                            </tr>
                            {
                                usedetail?.map((row) => (
                                    <tr key={row._id}>
                                        <td key={row._id} className='border border-dark ' border={2}>{row._id}</td>
                                        <td key={row.name} className='border border-dark ' border={2}>{row.name}</td>
                                        <td key={row.email} className='border border-dark ' border={2}>{row.email}</td>
                                        <td key={row.mobile} className='border border-dark ' border={2}>{row.mobile}</td>
                                        <td key={row.address} className='border border-dark ' border={2}>{row.address}</td>
                                        <td key={row.city} className='border border-dark ' border={2}>{row.city}</td>
                                        <td key={row.gender} className='border border-dark ' border={2}>{row.gender}</td>
                                        <td key={row.role} className='border border-dark ' border={2}>{row.role}</td>
                                        <td key={row.info} className='border border-dark ' border={2}>{row.info}</td>
                                        <td key={row.status} className='border border-dark ' border={2}>{(row.status == 0) ? <font style={{ "color": "green" }} onClick={() => handlechange(row._id, 'verify')}>verify</font> : <font style={{ "color": "orange" }} onClick={() => handlechange(row._id, 'block')}>Block</font>}</td>
                                        <td style={{ "color": "red" }} className='border border-dark' border={2}
                                            onClick={() => handlechange(row._id, 'delete')}>Delete</td>


                                    </tr>
                                ))
                            }
                        </table>

                    </div>
                </div>
            </div>
        </div>
        {/* About End */}


    </>)
}
export default Manageuser;