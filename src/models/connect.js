import { Sequelize } from "sequelize";
import configDB from "../configs/configDB.js";

const sequelize = new Sequelize(
  configDB.database,
  configDB.user,
  configDB.password,
  {
    host: configDB.host,
    dialect: configDB.dialect,
    port: configDB.port,
  }
);

export default sequelize;
