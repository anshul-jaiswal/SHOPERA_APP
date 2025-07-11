
import rs from 'randomstring';


import SubCategoryschemamodel from '../models/SubCategory.model.js';
import cloudinary from '../utils/CloudinaryConfig.js';

export var save = async (req, res) => {

  


  try {
    var scList = await SubCategoryschemamodel.find();
    var l = scList.length;
    var _id = (l == 0) ? 1 : scList[l - 1]._id + 1;
  
    var caticon = req.files.caticon;
    if (!caticon.mimetype.startsWith("image/")) {
      return res.status(400).json({ "status": false, "error": "Only image files allowed" })
    }

    const uploadImage = await cloudinary.uploader.upload(`data:${caticon.mimetype};base64,${caticon.data.toString("base64")}`, {
      folder: 'SHOPERA_SubCategories',
      public_id: rs.generate() + "-" + Date.now() + "-" + caticon.name
    })


    var scDetails = { ...req.body, "subcaticonnm": uploadImage.secure_url, "_id": _id };

    await SubCategoryschemamodel.create(scDetails);

    res.status(201).json({ "status": true, url: uploadImage.secure_url });
  }
  catch (error) {
    // console.log(error);
    res.status(500).json({ "status": false, error: error.message });
  }
};


export var fetch = async (req, res) => {
  try {
    var condition_obj = req.query;
    // console.log(condition_obj)
    var scList = await SubCategoryschemamodel.find(condition_obj);
    if (scList.length != 0)
      res.status(200).json(scList);
    else
      res.status(404).json({ "status": false, "msg": "No subCategory found" });
  } catch (error) {
    res.status(500).json({ "status": false, "msg": "Server error", "error": error.message })
  }
};

/*export var update=async(req,res)=>{
  let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
  if(userDetails){
      let user=await UserSchemaModel.updateOne(req.body.condition_obj,{$set: req.body.content_obj});   
      if(user)
        res.status(200).json({"msg":"success"});
      else
        res.status(500).json({"status": "Server Error"});
  }
  else
    res.status(404).json({"status":"Requested resource not available"});       
};

export var deleteUser=async(req,res)=>{
  let userDetails = await UserSchemaModel.findOne(req.body);
  if(userDetails){
      let user=await UserSchemaModel.deleteOne(req.body);   
      if(user)
        res.status(200).json({"msg":"success"});
      else
        res.status(500).json({"status": "Server Error"});
  }
  else
    res.status(404).json({"status":"Requested resource not available"});      
   
};
*/
