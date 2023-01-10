const {User, Note, JBCUser, Song} = require('../db.js');

var userLogId = 0;

const getUserNotes = async (req, res) => {
    const id = req.params.id;
    try {
        if(!id) return res.status(404).json({
                                    success: false,
                                    count: 0,
                                    data: {},
                                    msg: 'id is require...'});
        const user = await User.findByPk(id);
        
        if(!user) return res.status(404).json({
                                    success: false,
                                    count: 0,
                                    data: {},
                                    msg: 'user is not found...'});
        
        const userNotes = await Note.findAll({where: {userId: id}})
        res.status(200).json({
            success: false,
            count: userNotes.length,
            data: userNotes,
            msg: 'successfully...'
        });

    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
}

const createNote = async (req, res)=>{
    const {title, contents} = req.body;
    
    try {
        if(!title) return res.json({
                    success: false,
                    count: 0,
                    data: {},
                    msg: 'title is require...'});
        if(!contents) return res.json({
                    success: false,
                    count: 0,
                    data: {},
                    msg: 'contents is require...'});

        const note = await Note.create({title, contents, userId: userLogId});
        res.status(200).json({
                success: true,
                count: 1,
                data: note,
                msg: 'successfully...'
        });
    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
}

module.exports = { getUserNotes, createNote, };