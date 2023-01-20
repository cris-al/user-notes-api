const { Router } = require('express');
require('dotenv').config();
const { getUsers, register, login, registerJBC, loginJBC } = require('../controllers/user_controller');
const { getUserNotes, createNote } = require('../controllers/note_controller');
const { getSongs, createSong, deleteSong, showOrNotShow } = require('../controllers/song_controller');
const { getImages, postImage, destroyImage, showOrNotImage } = require('../controllers/image_controller');
const { getInfo, postInfo, updateInfo } = require('../controllers/publicinfo_controller');

const router = Router();

router.get('/users', getUsers);

router.post('/user/register', register);

router.post('/user/login', login);

router.get('/user/:id/notes', getUserNotes);

router.post('/notes/create', createNote);

router.post('/jbc/register', registerJBC);

router.post('/jbc/login', loginJBC);

router.get('/jbc/songs', getSongs);

router.post('/jbc/songs', createSong);

router.delete('/jbc/songs/:id', deleteSong);

router.put('/jbc/songs/:id', showOrNotShow);

router.get('/jbc/images', getImages);

router.post('/jbc/images', postImage);

router.delete('/jbc/images/:id', destroyImage);

router.put('/jbc/images/:id', showOrNotImage);

router.get('/jbc/publicinfo', getInfo);

router.post('/jbc/publicinfo', postInfo);

router.put('/jbc/publicinfo/:id', updateInfo);

module.exports = router;