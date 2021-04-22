const usersRouter = require('./users');
const reviewRouter = require('./reviews')
const commentRouter = require('./comments')

function route(app) {
    app.use('/api/users', usersRouter);

    app.use('/api/reviews', reviewRouter);

    app.use('/api/comments', commentRouter);
    
    app.use('/', (req, res) => {
        res.json({ message: 'success' });
    });
}

module.exports = route;
