const usersRouter = require('./users');

function route(app) {
    app.use('/api/users', usersRouter);
    app.use('/', (req, res) => {
        res.json({ message: 'success' });
    });
}

module.exports = route;
