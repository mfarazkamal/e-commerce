import express from "express";
import {  updateUser, userProfile } from "../controller/user.controller.js";
import { adminRegisterAuth, userLoginAuth, userRegisterAuth } from "../controller/auth.controller.js";


const router = express.Router();

router.get('/:id', userProfile);
router.post('/', userRegisterAuth);
router.post('/login', userLoginAuth);
router.put('/:id', updateUser);
router.post('/admin', adminRegisterAuth)

export default router;