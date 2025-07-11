
import rs from 'randomstring'
import url from 'url'

import categoryschemamodel from '../models/category.model.js'
import cloudinary from '../utils/CloudinaryConfig.js';
export const save = async (req, res) => {


    try {
        const categorylist = await categoryschemamodel.find();
        const len = categorylist.length;
        const _id = (len == 0) ? 1 : categorylist[len - 1]._id + 1;

        if (!req.files || !req.files.caticon) {
            return res.status(400).json({
              status: false,
              error: "Category image is required"
            });
          }

        const caticon = req.files.caticon;

        if (!caticon.mimetype.startsWith("image/")) {
            return res.status(400).json({ "status": false, "error": "Only image files allowed" })
        }

        const uploadImage = await cloudinary.uploader.upload(`data:${caticon.mimetype};base64,${caticon.data.toString("base64")}`,
            {
                folder: 'SHOPERA_Categories',
                public_id: rs.generate() + "-" + Date.now() + "-" + caticon.name
            })


        const catagorydetails = { ...req.body, "caticonname": uploadImage.secure_url, "_id": _id, };
        // console.log(catagorydetails);

        await categoryschemamodel.create(catagorydetails);

        res.status(201).json({ "status": true, url: uploadImage.secure_url });
    }
    catch (error) {
        // console.log(err);
        res.status(500).json({ "status": false, "msg": "Servor error",error: error.message })

    }
};



export const fetch = async (req, res) => {
    try {
        const condition_obj = req.query;
        // console.log(condition_obj);
        const categorylist = await categoryschemamodel.find(condition_obj);
        // console.log(categorylist)
        if (categorylist.length != 0) {
            res.status(200).json(categorylist);
        }
        else {
            res.status(404).json({ "status": false, "msg": "No Category data found" });
        }
    } catch (error) {
        res.status(500).json({ "status": false, "msg": "Servor error", "error": error.message })
    }
};


export const update = async (req, res) => {
    const { condition_obj, content_obj } = req.body;
    const categorylist = await categoryschemamodel.findOne((condition_obj));
    // console.log(categorylist);
    if (categorylist) {
        const category = await categoryschemamodel.updateOne((condition_obj), { $set: (content_obj) });
        if (category) {
            res.status(200).json({ "msg": "update successfully" })
        }
        else {
            res.status(500).json({ "msg": "Category not update" });
        }
    }
    else {
        res.status(404).json({ "msg": "Resouce not found" });
    }
};



export const deletecategory = async (req, res) => {

    const { condition_obj } = req.body;

    const categorylist = await categoryschemamodel.findOne((condition_obj));
    if (categorylist) {
        const catagorydelete = await categoryschemamodel.deleteOne((condition_obj));
        if (catagorydelete) {
            res.status(200).json({ "msg": "category delete succesfully" });

        }
        else {
            res.status(500).json({ "msg": "category not delete" });
        }
    }
    else {
        res.status(404).json({ "msg": "Resource not found" });
    }

}