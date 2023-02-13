import { Sequelize } from "sequelize";
 
const db = new Sequelize('test', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});
 
export default db;