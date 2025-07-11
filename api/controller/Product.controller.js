

import rs from 'randomstring'
import ProductSchemamodel from '../models/Product.model.js'
import cloudinary from '../utils/CloudinaryConfig.js'
export var save = async (req, res) => {

  

    try {
        var plist = await ProductSchemamodel.find();
        var len = plist.length;
        // console.log(len)
        var _id = (len == 0) ? 1 : plist[len - 1]._id + 1;
    
        var caticon = req.files.caticon;
    

        if (!caticon.mimetype.startsWith("image/")) {
            return res.status(400).json({ "Status": false, "error": "Only image files allowed" })
        }

        const uploadImage = await cloudinary.uploader.upload(`data:${caticon.mimetype};base64,${caticon.data.toString("base64")}`, {
            folder: 'SHOPERA_Products',
            public_id: rs.generate() + "-" + Date.now() + "-" + caticon.name
        })

        const pDetail = { ...req.body, "producticonnm": uploadImage.secure_url, "_id": _id }
        // console.log(pDetail)
        await ProductSchemamodel.create(pDetail)

        res.status(201).json({ "status": true, url: uploadImage.secure_url });
    } catch (error) {
        // console.log(error)
        res.status(500).json({ "status": false, "error": error.message })
    }
}

export var fetch = async (req, res) => {
    try {
        var condition_obj = req.query;
        var plist = await ProductSchemamodel.find(condition_obj);
        // console.log(clist);
        if (plist.length != 0) {
            res.status(200).json(plist);
        }

        else {
            res.status(404).json({ "status": false, "msg": "Product not found" });

        }
    } catch (error) {
        res.status(500).json({ "status": false, "msg": "Server error", "error": error.message })
    }
};