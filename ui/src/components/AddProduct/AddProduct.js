import './AddProuct.css'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { __categoryApiurl, __subcategoryapiurl, __Productapiurl } from '../../Apiurl';
import { toast } from 'react-hot-toast';

function AddProduct() {
    const [file, setfile] = useState();
    const [title, setTitle] = useState();
    const [catnm, setcatName] = useState();
    const [Subcatnm, setSubcatname] = useState();
    const [Description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [size, setSize] = useState();
    const [output, setoutput] = useState();
    const [cDetails, setCdetails] = useState([])
    const [scDetails, setSubCategoryDetails] = useState([]);
    


    useEffect(() => {
        axios.get(__categoryApiurl + "fetch").then((response) => {
            setCdetails(response.data)
        }).catch((error) => {
            console.log(error);
        })
    });

    const fetchSubCat = (catnm) => {
        setcatName(catnm);
        axios.get(__subcategoryapiurl + "fetch?catnm=" + catnm).then((response) => {
            setSubCategoryDetails(response.data);
        }).catch((error) => {
            setSubCategoryDetails([]);
        });
    }

    const handlechange = (event) => {
        setfile(event.target.files[0])
    }

    const handlesubmit = (event) => {

        event.preventDefault();
        var formData = new FormData();
        formData.append('title', title)
        formData.append('catnm', catnm);
        formData.append('Subcatnm', Subcatnm)
        formData.append('description', Description)
        formData.append('price', price)
        formData.append('size', size)
        formData.append('caticon', file);



        const config = {
            'content-type': 'multipart/form-data'
        };

        axios.post(__Productapiurl + "save", formData, config).then((response) => {

            setTitle("")
            setcatName("")
            setSubcatname("")
            setDescription("")
            setPrice("")
            setSize("")
            setoutput("Product Added Successfully");
            toast.success("Product Added Successfully");
        }).catch((error) => {

            // console.log(error)
            setoutput("product not Added")
            toast.error("product not Added")
            
        })
    }



    return (<>

        {/* About Start */}
        <div class="container-xxl py-5 mb-4">
            <div class="container">
                <div class="row g-5 align-items-center mb-4">
                    <div class="col-lg mb-4">

                        <h1 class="mb-4">Add Product <span class="text-primary">Here!!!!! </span></h1>
                        <font style={{ "color": "blue" }}>{output}</font>
                        <br /><br />
                        <form>
                            <div class="form-group">
                                <label for="title">Title:</label>
                                <input type="text" class="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="catnm">Category Name:</label>
                                <select class="form-control" value={catnm} onChange={e => fetchSubCat(e.target.value)}>
                                    <option>Select Category</option>
                                    {
                                        cDetails?.map((data) => (
                                            <option key={data}>{data.catnm}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="Subcatname">Sub Category Name:</label>
                                <select class="form-control" value={Subcatnm} onChange={e => setSubcatname(e.target.value)}>
                                    <option>Select Sub Category</option>
                                    {
                                        scDetails?.map((row) => (
                                            <option key={row}>{row.Subcatnm}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <input type="text" class="form-control" value={Description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="price">Price:</label>
                                <input type="text" class="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="size">Size:</label>
                                <select class="form-control" value={size} onChange={e => setSize(e.target.value)}>
                                    <option>Select Size</option>
                                    <option>XXL</option>
                                    <option>XL</option>
                                    <option>L</option>
                                    <option>M</option>
                                    <option>S</option>
                                </select>
                            </div>
                            <br />

                            <div class="form-group">
                                <label for="producticonname">Product Icon:</label>
                                <input type="file" class="form-control" onChange={handlechange} />
                            </div>
                            <br />
                            <button onClick={handlesubmit} type="button" class="btn btn-success">Add Product</button>
                            <br /><br />
                        </form>


                    </div>
                </div>
            </div>
        </div>
        {/* About End */}


    </>)
}
export default AddProduct;