import Test from "../models/testModel.js";
 
export const getAll = async (req, res) => {
    try {
        const test = await Test.findAll();
        res.json(test);
    } catch (error) {
        res.json({ message: error.message });
    }  
}