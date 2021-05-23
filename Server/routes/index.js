const usersRouter = require('./users');
const schoolsRouter = require('./schools');
const reviewRouter = require('./reviews');
const commentRouter = require('./comments');

function router(app) {
    app.use('/api/users', usersRouter);

    app.use('/api/schools', schoolsRouter);

    app.use('/api/reviews', reviewRouter);

    app.use('/api/comments', commentRouter);

    app.use('/', (req, res) => {
        res.json({ message: 'success' });
    });
}

module.exports = router;
