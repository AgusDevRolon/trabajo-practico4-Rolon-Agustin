import Character from "../models/character.model.js";


const getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.findAll();
        res.status(200).json(characters);
    } catch (error) {
        console.error("Error al obtener a los personajes:", error);
        res.status(500).json({message: "Error interno del servidor al obtener personajes.", error: error.message});
    }
};

const getCharacterById = async (req, res) => {
    try{
        const {id} = req.params;
        const character = await Character.findByPk(id);
            if (!character){
                return res.status(404).json({ message: `Personaje con ID ${id} no encontrado.` });
            }
            res.status(200).json(character);
    } catch (error) {
            console.error(`Error al obtener personaje con ID ${req.params.id}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al obtener personajes por ID.', error: error.message});
    }
}

export{
    getAllCharacters,
    getCharacterById
}
