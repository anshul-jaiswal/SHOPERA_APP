import url from 'url';
import rs from 'randomstring';
import jwt from 'jsonwebtoken';
import sendMail from './email.controller.js';




//link models to controller
import userschemamodel from '../models/user.model.js'

export const save = async (req, res) => {
    
  var userlist = await userschemamodel.find();
    var len = userlist.length;
    var _id = (len == 0) ? 1 : userlist[len - 1]._id + 1;
    var userdetails = { ...req.body, "_id": _id, "role": "user", "status": 0, "info": Date() };
    try {
        var user=await userschemamodel.create(userdetails)
        sendMail(user.email,user.password)
        res.status(201).json({ "msg": "user register successfuly" });

    }
    catch (error) {
       
        res.status(500).json({ "msg": "user not successfuly" });
    }
};
export const login = async (req, res) => {
    var condition_obj = { ...req.body, "status": 1 };
    //console.log(condition_obj);
    var userList = await userschemamodel.find(condition_obj);
    //console.log(userList);
    if (userList.length != 0) {
        const payload = { "subject": userList[0].email };
        // console.log(payload);
        const key = rs.generate();
        const token = jwt.sign(payload, key);
        res.status(201).json({ "token": token, "userList": userList[0] });
    }
    else {
        res.status(500).json({ "error": "token error" });
    }
};
export const fetch = async (req, res) => {
    
    var condition_obj = url.parse(req.url, true).query;
    //  console.log(condition_obj);
    var userlist = await userschemamodel.find(condition_obj);
    // console.log(userlist);
    if (userlist.length != 0) {
        res.status(200).json(userlist)
    }
    else {

        res.status(500).json({ "msg": "user not found" });
    }

};
export const update = async (req, res) => {
    //  console.log("its work")
    var userlist = await userschemamodel.findOne(req.body.condition_obj);
//    console.log(userlist)
    if (userlist) {
        var users = await userschemamodel.updateOne(req.body.condition_obj, { $set:req.body.content_obj })
        if (users) {
            res.status(200).json({ "msg": "user updated succesfully" });
        }
        else {
            res.status(500).json({ "msg": "users not updated" })
        }
    }
    else {
        res.status(404).json({ "msg": "resource not found" });
    }
};
export const deleteuser = async (req, res) => {
    const userlist = await userschemamodel.findOne(req.body);
    // console.log(userlist);
    if (userlist) {
        var user = await userschemamodel.deleteOne(req.body);
        // console.log(user); 
        if (user) {

            res.status(200).json({ "msg": "user delete successfully" });
        }
        else {
            res.status(404).json({ "msg": "user not delete successfully" });
        }
    }
    else {
        res.status(500).json({ "msg": "resource not found" });
    }
};