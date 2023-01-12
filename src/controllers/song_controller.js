const {User, Note, JBCUser, Song} = require('../db.js');
const { uploadFileToCloudinary, deleteFileFromCloud } = require('../utils/cloudinary');

const getSongs = async (req, res) => {
    try {
        const songs = Song.findAll();

        res.status(200).json({
            success: true,
            count: songs.length,
            data: songs,
            msg: 'successfully...'
        });

    } catch (error) {
        res.status(400).send({success: false, msg: error});
    }
};

const createSong = async (req, res) => {
    const { name, artist, album, genre, songB64, imageB64 } = req.body;
    try {
        if(!name) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: 'name is require...'
        });

        if(!songB64) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: 'song is require...'
        });

        if(!genre) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: 'genre is require...'
        });

        const song = await uploadFileToCloudinary(songB64);
        let image;
        if(imageB64) {
            image = await uploadFileToCloudinary(imageB64);
        }
        
        const newSong = await Song.create({
            name: name,
            artist: artist || 'Artista desconocido',
            album: album || 'Album desconocido',
            genre: genre,
            urlsong: song.secure_url,
            publicidsong: song.public_id,
            urlimage: image.secure_url || '',
            publicidimage: image.public_id || '',
        });

        res.status(200),json({
            success: true,
            count: 1,
            data: newSong,
            msg: 'successfully...'
        })

    } catch (error) {
        res.status(400).send({success: false, msg: error});
    }
}

const deleteSong = async (req, res) => {
    const { id } = req.params;
    try {
        if(!id) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: 'id is require...'
        });

        const song = await Song.findByPk(id);
        if(!song) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: 'song is not found...'
        });

        const response = await deleteFileFromCloud(song.publicidsong, song.publicidimage);
        if(response.result !== 'ok') return res.status(400).json({success: false, data: response.result });

        res.status(400).json({success: true, data: response.result });

    } catch (error) {
        res.status(400).send({success: false, msg: error});
    }
}

module.exports = { getSongs, createSong, deleteSong };