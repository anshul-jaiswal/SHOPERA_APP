import './AddCategory.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { __categoryApiurl } from '../../Apiurl';
import {  toast } from 'react-hot-toast';


function AddCategory() {
    const navigate = useNavigate();
    const [catName, setcatName] = useState();

    const [file, setfile] = useState();
    const [output, setoutput] = useState();

    const handlechange = (event) => {
        setfile(event.target.files[0])
    }

    const handlesubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append("catnm", catName);
        formData.append("caticon", file)

        const config = {
            "content-type": "multipart/form-data"
        }

        axios.post(__categoryApiurl + "save", formData, config).then((respnse) => {
            setoutput("category registered successfully")
            setTimeout(() => setoutput(""), 3000);
            toast.success("category registered successfully")
            navigate("/addcategory")

        }).catch((error) => {
            setoutput("Error: " + (error.response?.data?.msg || error.message));

            setTimeout(() => setoutput(""), 3000);

            toast.error("category not registered successfully");
            navigate("/addcategory")

        })
    }

    return (<>

        {/* About Start */}
        <div class="container-xxl py-5 mb-4">
            <div class="container">
                <div class="row g-5 align-items-center mb-4">
                    <div class="col-lg mb-4">

                        <h1 class="mb-4">Add Category <span class="text-primary">Here!!!!! </span></h1>
                        <font class="text-center" style={{ "color": "blue" }}>{output}</font>
                        <form>
                            <div class="form-group">
                                <label>Category Name:</label>
                                <br />

                                <input type="text" class="form-control" value={catName} onChange={(e) => { setcatName(e.target.value) }} 
                                placeholder='Enter category name'/>
                            </div>
                            <br />
                            <div class="form-group">
                                <label>Category Icon:</label>
                                <br />
                                <input type="file" class="form-control" onChange={handlechange} />
                            </div>
                            <br />
                            <button class="btn btn-success" type="button" onClick={handlesubmit}>Add category</button>
                        </form>


                    </div>
                </div>
            </div>
        </div>
        {/* About End */}


    </>)
}
export default AddCategory;