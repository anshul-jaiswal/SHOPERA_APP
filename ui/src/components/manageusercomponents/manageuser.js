import './manageuser.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

import { __userApi } from '../../Apiurl';
import { toast } from 'react-hot-toast';
function Manageuser() {
    const [usedetail, setuserdetail] = useState()
    const [output, setoutput] = useState();


    const fetchUser = () => {
        axios.get(__userApi + "fetch?role=user").then((response) => {
            setuserdetail(response.data)
        }).catch((error) => {
            setoutput(error?.response?.data?.message || error.message || "Something went wrong");
            setTimeout(() => setoutput(""), 3000);
        })
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const handlechange = (_id, s) => {
        if (s == 'verify') {
            const updateDetail = { "condition_obj": { "_id": _id }, "content_obj": { "status": 1 } }
            axios.patch(__userApi + "update", updateDetail).then((response) => {
                setoutput("Verified")
                setTimeout(() => setoutput(""), 3000);

                toast.success("Verified")
                fetchUser()

            }).catch((error) => {
                setoutput(error?.response?.data?.message || error.message || "Something went wrong");
                setTimeout(() => setoutput(""), 3000);

            })
        }
        else if (s == 'block') {
            const updateDetail = { "condition_obj": { "_id": _id }, "content_obj": { "status": 0 } }
            axios.patch(__userApi + "update", updateDetail).then((response) => {
                setoutput("User Blocked Successfully")
                setTimeout(() => setoutput(""), 3000);

                toast.error("User Blocked Successfully")
                fetchUser()
            }).catch((error) => {
                setoutput(error?.response?.data?.message || error.message || "Something went wrong");
                setTimeout(() => setoutput(""), 3000);

            })
        }
        else {
            const deletuser = { "condition_obj": { "_id": _id } }
            axios.delete(__userApi + "delete", deletuser).then((response) => {
                setoutput("user Deleted")
                setTimeout(() => setoutput(""), 3000);

                toast.success("user Deleted")
                fetchUser()
            }).catch((error) => {
                setoutput(error?.response?.data?.message || error.message || "Something went wrong");
                setTimeout(() => setoutput(""), 3000);

            })
        }
    }
    return (<>

        {/* manageuser Start */}
        <div class="container-xxl py-5 mb-4">
            <div class="container-xxl">
                <div class="row g-5 align-items-center mb-4">
                    <div class=" col-lg mb-4">

                        <h1 class="mb-4">Show & <span class="text-primary ">Manage user Details!!!!!</span></h1>
                        <br />
                        <h3 className='text-center justify-content-center'>{output}</h3>
                        <div className='table-responsive'>
                            <table className=' table table-bordered border-dark justify-content-center text-center flex-wrap ' border={2}>
                                <thead>
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
                                </thead>
                                <tbody>
                                    {
                                        usedetail?.map((row) => (
                                            <tr key={row._id}>
                                                <td key className='border border-dark ' border={2}>{row._id}</td>
                                                <td key className='border border-dark ' border={2}>{row.name}</td>
                                                <td key className='border border-dark ' border={2}>{row.email}</td>
                                                <td key className='border border-dark ' border={2}>{row.mobile}</td>
                                                <td key className='border border-dark ' border={2}>{row.address}</td>
                                                <td key className='border border-dark ' border={2}>{row.city}</td>
                                                <td key className='border border-dark ' border={2}>{row.gender}</td>
                                                <td key className='border border-dark ' border={2}>{row.role}</td>
                                                <td key className='border border-dark ' border={2}>{row.info}</td>
                                                <td key className='border border-dark ' border={2}>{(row.status == 0) ? <font style={{ "color": "green" }} onClick={() => handlechange(row._id, 'verify')}>verify</font> : <font style={{ "color": "orange" }} onClick={() => handlechange(row._id, 'block')}>Block</font>}</td>
                                                <td style={{ "color": "red" }} className='border border-dark' border={2}
                                                    onClick={() => handlechange(row._id, 'delete')}>Delete</td>


                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        {/* manageuser End */}


    </>)
}
export default Manageuser;