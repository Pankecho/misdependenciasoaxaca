var Sequelize = require("sequelize");

// database = new Sequelize("TABD", "postgres", "Jpmr01495", {

// 	host: "localhost",
// 	dialect: "postgres",
// 	pool: {
// 		max: 10,
// 		min: 0,
// 		idle: 10000
// 	},
// 	logging: false
// 		//	omitNull: true
// });



database = new Sequelize("mevkbpzs", "mevkbpzs", "fkhiho0w5snBcmFGZRl4hXo5lbrJ-XNS", {

	host: "babar.elephantsql.com",
	dialect: "postgres",
	pool: {
		max: 10,
		min: 0,
		idle: 10000
	},
	logging: false
		//	omitNull: true
});

 
database
	.authenticate()
	.then(function (err) {
		console.log('Connection has been established successfully.');
	})
	.catch(function (err) {
		console.log('Unable to connect to the database:', err);
	});

module.exports = {
	database: database,
	Sequelize: Sequelize
}
