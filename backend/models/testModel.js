import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Test = db.define('test',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    text1:{
        type: DataTypes.STRING
    },
    text2:{
        type: DataTypes.STRING
    },
    text3:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true,
    timestamps: false
});
 
export default Test;