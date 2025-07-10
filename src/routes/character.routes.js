import express from 'express';
import {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updatecharacter
} from '../controllers/character.controllers.js';

const router = express.Router()

router.get('/', getAllCharacters);

router.get('/:id', getCharacterById);

router.post('/', createCharacter);

router.put('/:id', updatecharacter);

export default router;