import { Sequelize  } from 'sequelize';

export const sequelize= new Sequelize('mydatabase', 'postgres', 'postgres', {host: 'localhost',dialect: 'postgres'});