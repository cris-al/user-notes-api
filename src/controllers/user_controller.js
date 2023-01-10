const {User, Note, JBCUser, Song} = require('../db.js');
const {SECRET_JWT} = process.env;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({
            success: true,
            count: users.length,
            data: users,
            msg: 'successfully..'});

    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
};

const register = async (req, res) => {
    let {email, password, name, lastName} = req.body;
    try {
        if(!email) return res.status(404).json({
                                            success: false,
                                            count: 0,
                                            data: {},
                                            msg: 'email is require...'});
        if(!password) return res.status(404).json({
                                            success: false,
                                            count: 0,
                                            data: {},
                                            msg: 'password is require...'});
        if(!name) return res.status(404).json({
                                            success: false,
                                            count: 0,
                                            data: {},
                                            msg: 'name is require...'});
        if(!lastName) return res.status(404).json({
                                            success: false,
                                            count: 0,
                                            data: {},
                                            msg: 'lastName is require...'});
        
        let salt = await bcryptjs.genSalt(10);
        password = await bcryptjs.hash(password,salt);
        
        const user = await User.create({email, name, password, lastName});
        res.status(200).json({
                        success: true,
                        count: 1,
                        data: user,
                        msg: 'successfully...'});

    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        if(!email) return res.json({
                                success: false,
                                count: 0,
                                data: {},
                                msg: 'email is require...'});
        if(!password) return res.json({
                                success: false,
                                count: 0,
                                data: {},
                                msg: 'password is require...'});
        
        let user = await User.findOne({where: {email: email}});

        if(!user) return res.json({
                                success: false,
                                count: 0,
                                data: {},
                                msg: 'email is not found...'});
        
        let passwordCorrect = await bcryptjs.compare(password, user.password);

        if(!passwordCorrect) return res.json({
                                success: false,
                                count: 0,
                                data: {},
                                msg: 'incorrect password...'});
        
        const payload = {email: user.email, name: user.name}
        const token = jwt.sign(payload, SECRET_JWT, {expiresIn: '1d'});
        
        userLogId = user.id;
        res.json({
            success: true,
            count: 1,
            data:{user, token},
            msg: 'successfully..'});

    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
};

const registerJBC = async (req, res) => {
    let { username, password } = req.body;
    try {
        if(!username) return res.status(404).json({
                                            success: false,
                                            count: 0,
                                            data: {},
                                            msg: 'username is require...'});
        if(!password) return res.status(404).json({
                                            success: false,
                                            count: 0,
                                            data: {},
                                            msg: 'password is require...'});
        
        let salt = await bcryptjs.genSalt(10);
        password = await bcryptjs.hash(password, salt);
        
        const user = await JBCUser.create({ username, password });
        res.status(200).json({
                        success: true,
                        count: 1,
                        data: user,
                        msg: 'successfully...'});

    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
};

const loginJBC = async (req, res) => {
    const {username, password} = req.body;
    
    try {
        if(!username) return res.json({
                                success: false,
                                count: 0,
                                data: {},
                                msg: 'username is require...'});
        if(!password) return res.json({
                                success: false,
                                count: 0,
                                data: {},
                                msg: 'password is require...'});
        
        let user = await User.findOne({where: {username: username}});

        if(!user) return res.json({
                                success: false,
                                count: 0,
                                data: {},
                                msg: 'username is not found...'});
        
        let passwordCorrect = await bcryptjs.compare(password, user.password);

        if(!passwordCorrect) return res.json({
                                success: false,
                                count: 0,
                                data: {},
                                msg: 'incorrect password...'});
        
        const payload = {username: user.username};
        const token = jwt.sign(payload, SECRET_JWT, {expiresIn: '1d'});
        
        res.json({
            success: true,
            count: 1,
            data:{user, token},
            msg: 'successfully..'});

    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
}

module.exports = { getUsers, register, login, registerJBC, loginJBC };