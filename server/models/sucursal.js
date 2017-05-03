const database = require("./db")
	.database;
const Sequelize = require("./db")
	.Sequelize;

const Sucursal= database.define("sucursal", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: "id"
	},
    telefono:{type:Sequelize.STRING,
            field:"telefono"},
    direccion:{type:Sequelize.STRING,
            field:"direccion"},
    latitud:{type:Sequelize.STRING,
            field:"latitud"},
    longitud:{type:Sequelize.STRING,
            field:"longitud"}                                
}, {
	timestamps: false,
	freezeTableName: false,
	tableName: "sucursal"
});

module.exports = Sucursal;