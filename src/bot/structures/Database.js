const { Sequelize } = require('sequelize');
const { join } = require('path');

const sequelize = new Sequelize(process.env.DB, {
	logging: false
});

sequelize.import(join(__dirname, '..', 'models', 'settings'));
sequelize.import(join(__dirname, '..', 'models', 'playlists'));


sequelize.sync();

module.exports = sequelize;
