const database = require("./db")
	.database;
const Sequelize = require("./db")
	.Sequelize;

const Dependencia= database.define("dependencia", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: "id"
	},
    nombre:{type:Sequelize.STRING,
            field:"nombre"},
    web:{type:Sequelize.STRING,
            field:"web"}    
}, {
	timestamps: false,
	freezeTableName: false,
	tableName: "dependencia"
});

module.exports = Dependencia;
    