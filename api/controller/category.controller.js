
import rs from 'randomstring'
import url from 'url'
import path from 'path';
import categoryschemamodel from '../models/category.model.js'
export const save = async (req, res) => {
    // console.log("itss working");
    const categorylist = await categoryschemamodel.find();
    const len = categorylist.length;
    const _id = (len == 0) ? 1 : categorylist[len - 1]._id + 1;

    const caticon=req.files.caticon;
    const caticonname=rs.generate()+"-"+Date.now()+"-"+caticon.name; 
    const catagorydetails = { ...req.body,"caticonname":caticonname,"_id": _id, };
    // console.log(catagorydetails);
    try {
        await categoryschemamodel.create(catagorydetails);
        const __dirname=url.fileURLToPath(new URL('.',import.meta.url));
        const uploadpath=path.join(__dirname,"../../ui/public/assets/uploads/caticons",caticonname);
        caticon.mv(uploadpath)
        res.status(201).json({"status":true});
    }
    catch (err) {
        console.log(err);
        res.status(404).json({"status":false})

    }
};
export const fetch = async (req, res) => {
    const condition_obj = url.parse(req.url, true).query;
    // console.log(condition_obj);
    const categorylist = await categoryschemamodel.find(condition_obj);
    // console.log(categorylist)
    if (categorylist.length != 0) {
        res.status(200).json(categorylist);
    }
    else {
        res.status(500).json({ "msg": "not found data" });
    }
};
export const update = async (req, res) => {
    const categorylist = await categoryschemamodel.findOne((req.body.condition_obj));
    // console.log(categorylist);
    if (categorylist) {
        const category = await categoryschemamodel.updateOne((req.body.condition_obj), { $set: (req.body.content_obj) });
        if (category) {
            res.status(200).json({ "msg": "update successfully" })
        }
        else {
            res.status(500).json({ "msg": "user not update" });
        }
    }
    else {
        res.send(404).json({ "msg": "resouce not found" });
    }
};
export const deletecategory = async (req, res) => {
    const categorylist = await categoryschemamodel.findOne((req.body.condition_obj));
    if (categorylist) {
        const catagorydelete = await categoryschemamodel.deleteOne((req.body.condition_obj));
        if (catagorydelete) {
            res.status(200).json({ "msg": "category delete succesfully" });

        }
        else {
            res.status(500).json({ "msg": "category not delete" });
        }
    }
    else {
        res.status(404).json({ "msg": "resource not found" });
    }

}