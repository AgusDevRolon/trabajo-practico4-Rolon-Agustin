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

const createCharacter = async (req, res) => {
    try{
        const {name, ki, race, gender, description} = req.body;
        if (!name || !ki || !race || !gender) {
            return res.status(400).json({ message: 'Los campos name, ki, race y gender son obligatorios.'});
        }
        if (typeof ki !== 'number' || !Number.isInteger(ki)){
            return res.status(400).json({message: 'El campo ki debe ser un numero entero'});
        }
        const validGenders = ['Male', 'Female'];
        if (!validGenders.includes(gender)){
            return res.status(400).json({message: 'El campo gender solo puede ser "Male" o "Female".'});
        }
        if (description !== undefined && typeof description !== 'string'){
            return res.status(400).json({message: 'El campo description debe ser una cadena de texto.'});
        }
        const existingCharacter = await Character.findOne({where: { name: name} });
        if (existingCharacter){
            return res.status(400).json({ message: `Ya existe un personaje registrado con el nombre '${name}'.` });
        }
        const newCharacter = await Character.create({
            name,
            ki,
            race,
            gender,
            description
        });
        res.status(201).json(newCharacter);
    } catch (error){
        console.error('Error al crear el personaje:', error);
        res.status(500).json({message: 'Error interno del servidor al crear personaje.', error: error.message});
    }
};

 const updatecharacter = async(req, res) => {
    try{
        const {id} = req.params; 
        const {name, ki, race, gender, description} = req.body;

        const character = await Character.findByPk(id);
        if (!character){
            return res.status(404).json({message: `Presonaje con ID ${id} no encontrado.` });
        }

        if (name !== undefined){
            if (typeof name !== 'string' || name.trim() === ''){
                return res.status(400).json({message: 'El campo name debe ser una cadena de texto no vacia.'});

            }

            const existingCharacterWithName = await Character.findOne({where: {name: name}});
            if (existingCharacterWithName && existingCharacterWithName.id !== parseInt(id)){
                return res.status(400).json({ message: `ya existe un personaje registrado con el nombre '${name}'.`});
            }
        }

        if (ki !== undefined){
            if (typeof ki !=='number' || !Number.isInteger(ki)){
                return res.status(400).json({message: 'El campo ki debe ser un numero entero.'});

            }
        }

        if (race !== undefined){
            if (typeof race !== 'string' || race.trim() === ''){
                return res.status(400).json({message: 'El campo race debe ser una cadena de texto no vacia.'});
            }
        }

        if (gender !== undefined){
            const validGenders = ['Male', 'Female'];
            if (!validGenders.includes(gender)){
                return res.status(400).json({message: 'El campo gender solo puede ser "Male" o "Female".'});
            }
        }

        if (description !== undefined && typeof description !== 'string'){
            return res.status(400).json({message: 'El campo description debe ser una cadena de texto.'});
        }

        await character.update({name, ki, race, gender, description});

        res.status(200).json(character);
    } catch (error){
        console.error(`Error al actualizar el personaje con ID ${req.params.id}:`, error);
        res.status(500).json({message:'Error interno del servidor al actualizar el personaje.', error: error.message});
    }
 }

 const deleteCharacter = async (req, res) => {
    try {
        const {id}= req.params;

        const character = await Character.findByPk(id);
        if (!character){
            return res.status(404).json({message: `Personaje con ID ${id} no encontrado.`});
        }

        await character.destroy()

        res.status(204).send();
    } catch (error){
        console.error(`Error al eliminar el personaje con ID ${req.params.id}:`, error);
        res.status(500).json({message: 'Error interno del servidor al eliminar el personaje.', error: error.message});
    }
 };

export{
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updatecharacter,
    deleteCharacter
};
