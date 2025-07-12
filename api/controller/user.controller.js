import url from 'url';
import rs from 'randomstring';
import jwt from 'jsonwebtoken';
import sendMail from './email.controller.js';




//link models to controller
import userschemamodel from '../models/user.model.js'

export const save = async (req, res) => {


    try {
        var userlist = await userschemamodel.find();
        var len = userlist.length;
        var _id = (len == 0) ? 1 : userlist[len - 1]._id + 1;
        var userdetails = { ...req.body, "_id": _id, "role": "user", "status": 0, "info": Date() };

        var user = await userschemamodel.create(userdetails)
        sendMail(user.email, user.password)
        res.status(201).json({ "msg": "user register successfuly" });

    }
    catch (error) {

        res.status(500).json({
            "msg": "user Registration failed",
            "error": error.message || error
        });
    }
};



export const login = async (req, res) => {
    try {
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
            res.status(401).json({ "msg": "Invalid credentials or inactive account" });
        }
    } catch (error) {
        res.status(500).json({
            "msg": "Login failed due to server error",
            "error": error.message || error
        })
    }
};


export const fetch = async (req, res) => {

    try {
        var condition_obj = req.query;
        //  console.log(condition_obj);
        var userlist = await userschemamodel.find(condition_obj);
        // console.log(userlist);
        if (userlist.length != 0) {
            res.status(200).json(userlist)
        }
        else {

            res.status(404).json({ "msg": "No user  found" });
        }
    } catch (error) {
        res.status(500).json({
            "msg": "failed to fetch user",
            "error": error.message || error
        })
    }

};


export const update = async (req, res) => {
    try {
        const { condition_obj, content_obj } = req.body;
        var userlist = await userschemamodel.findOne(condition_obj);
        //    console.log(userlist)

        if (userlist) {
            var users = await userschemamodel.updateOne(condition_obj, { $set: content_obj })
            if (users.modifiedCount != 0) {
                res.status(200).json({ "msg": "user updated succesfully" });
            }
            else {
                res.status(200).json({ "msg": "users not updated" })
            }
        }
        else {
            res.status(404).json({ "msg": "User not found for update" });
        }
    } catch (error) {
        res.status(500).json({
            "msg": "Failed to update user",
            "error": error.message || error
        })
    }
};



export const deleteuser = async (req, res) => {
    try {
        const userlist = await userschemamodel.findOne(req.body);
        // console.log(userlist);
        if (userlist) {
            var user = await userschemamodel.deleteOne(req.body);
            // console.log(user); 
            if (user.deletedCount != 0) {

                res.status(200).json({ "msg": "user delete successfully" });
            }
            else {
                res.status(202).json({ "msg": "user not delete successfully" });
            }
        }
        else {
            res.status(404).json({ "msg": "User not found" });
        }
    } catch (error) {
        res.status(500).json({
            "msg": "Failed to delete user",
            "error": error.message || error
        })
    }
};