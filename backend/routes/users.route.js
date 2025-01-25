import express from "express";
import {  updateUser, userProfile } from "../controller/user.controller.js";
import { userLoginAuth, userRegisterAuth } from "../controller/auth.controller.js";


const router = express.Router();

router.get('/:id', userProfile);
router.post('/', userRegisterAuth);
router.post('/login', userLoginAuth);
router.put('/:id', updateUser);


export default router

/*
Auth Non Auth
Auth with Token
Admin Access with and without token
User on Admin Route
User on user route with and without token
*/