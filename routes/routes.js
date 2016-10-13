var appRouter = function(app) {
	var controller = require('../controller.js');

	app.get('/api/todos', controller.getAllData);
	app.post('/api/save', controller.saveData);
	app.delete('/api/delete/:id', controller.deleteData);
}
 
module.exports = appRouter;