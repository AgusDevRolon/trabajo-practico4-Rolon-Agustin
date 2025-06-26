import express from 'express';
import {
    getAllCharacters,
    getCharacterById,
    createCharacter
} from '../controllers/character.controllers.js';

const router = express.Router()

router.get('/', getAllCharacters);

router.get('/:id', getCharacterById);

router.post('/', createCharacter);

export default router;