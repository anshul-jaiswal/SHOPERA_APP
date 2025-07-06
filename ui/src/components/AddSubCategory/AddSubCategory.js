import './AddSubCategory.css'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { __categoryApiurl, __subcategoryapiurl } from '../../Apiurl.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


function AddSubCategory() {
    const navigate = useNavigate();
    const [catnm, setcatname] = useState();
    const [Subcatnm, setSubcatname] = useState();
    const [cDetails, setCdetails] = useState([])
    const [file, setfile] = useState();
    const [output, setoutput] = useState();


    useEffect(() => {
        axios.get(__categoryApiurl + "fetch").then((response) => {
            //    alert(response.data.catname);
            setCdetails(response.data);
            //   console.log(response.data)
        }).catch((error) => {
            console.log(error);
        })
    });

    const handlechange = (event) => {
        setfile(event.target.files[0])
    }

    const handlesubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append('catnm', catnm);
        formData.append('caticon', file);
        formData.append('Subcatnm', Subcatnm)

        const config = {
            'content-type': 'multipart/form-data'
        }

        axios.post(__subcategoryapiurl + "save", formData, config).then((response) => {
            setoutput("subCategory Added Successfully");
            toast.success("subCategory Added Successfully");
            navigate("/addsubcategory");
        }).catch((error) => {
            // setoutput(error)
            setoutput("Sub Category not Added Successfully");
            toast.error("Sub Category not Added Successfully");
            navigate("/addsubcategory");

        })
    }



    return (<>

        {/* About Start */}
        <div class="container-xxl py-5 mb-4">
            <div class="container">
                <div class="row g-5 align-items-center mb-4">
                    <div class="col-lg mb-4">

                        <h1 class="mb-4">Add SubCategory <span class="text-primary">Here!!!!! </span></h1>
                        <font style={{ "color": "blue" }}>{output}</font>
                        <br /><br />
                        <form>
                            <div class="form-group">
                                <label for="catname">CatName:</label><br />
                                <select class="form-control" value={catnm} onChange={e => setcatname(e.target.value)}>
                                    <option>Select Category</option>
                                    {
                                        cDetails?.map((row) => (
                                            <option key={row}>{row.catnm}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="SubCatnm">SubCatName:</label><br />
                                <input type="text" class="form-control" value={Subcatnm} onChange={e => setSubcatname(e.target.value)}
                                placeholder='Enter subCategory name' />
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="subcaticon">SubCatIcon:</label><br />
                                <input type="file" class="form-control" onChange={handlechange} />
                            </div>
                            <br />
                            <button type="button" onClick={handlesubmit} class="btn btn-success">Add Category</button>
                        </form>


                    </div>
                </div>
            </div>
        </div>
        {/* About End */}


    </>)
}
export default AddSubCategory;