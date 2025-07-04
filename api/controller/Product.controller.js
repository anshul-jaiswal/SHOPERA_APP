
import url from 'url'
import path from 'path'
import rs from 'randomstring'
import ProductSchemamodel from '../models/Product.model.js'
export var save = async (req, res) => {
    //  console.log("its working")

    var clist = await ProductSchemamodel.find();
    var len = clist.length;
    // console.log(len)
    var _id = (len == 0) ? 1 : clist[len - 1]._id + 1;

    var caticon = req.files.caticon;
    var producticonnm = rs.generate() + " " + Date.now() + " " + caticon.name;
    const cDetail = { ...req.body, "producticonnm": producticonnm, "_id": _id }
    // console.log(cDetail)
    try {
        await ProductSchemamodel.create(cDetail)
        var __dirname = url.fileURLToPath(new URL('.', import.meta.url));
        var uploadpath = path.join(__dirname, "../../ui/public/assets/uploads/producticons", producticonnm);
        caticon.mv(uploadpath);
        res.status(201).json({ "status": true });
    } catch (error) {
        console.log(error)
        res.status(500).json({ "status": false })
    }
}

export var fetch = async (req, res) => {
    var condition_obj = url.parse(req.url, true).query;
    var clist = await ProductSchemamodel.find(condition_obj);
    // console.log(clist);
    if (clist.length != 0) {
        res.status(200).json(clist);
    }

    else {
        res.status(500).json({ "status": "Resource not found" });

    }
};