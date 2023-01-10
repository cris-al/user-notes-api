const { Router } = require('express');
require('dotenv').config();
const { getUsers, register, login, registerJBC, loginJBC } = require('../controllers/user_controller');
const { getUserNotes, createNote } = require('../controllers/note_controller');
// const { getSongs, createSong, deleteSong } = require('../controllers/song_controller');

const router = Router();

router.get('/users', getUsers);

router.post('/user/register', register);

router.post('/user/login', login);

router.get('/user/:id/notes', getUserNotes);

router.post('/notes/create', createNote);

// router.post('/jbc/register', registerJBC);

// router.post('/jbc/login', loginJBC);

// router.get('/jbc/songs', getSongs);

// router.post('/jbc/songs', createSong);

// router.delete('/jbc/songs/:id', deleteSong);

module.exports = router;