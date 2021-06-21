const usersRouter = require('./users');
const schoolsRouter = require('./schools');
const reviewRouter = require('./reviews');
const commentRouter = require('./comments');
const threadRouter = require('./threads');
const postRouter = require('./posts');
const tagRouter = require('./tags');
const categoryRouter = require('./categories');

function router(app) {
    app.use('/api/users', usersRouter);

    app.use('/api/schools', schoolsRouter);

    app.use('/api/reviews', reviewRouter);

    app.use('/api/comments', commentRouter);

    app.use('/api/threads', threadRouter);

    app.use('/api/posts', postRouter);

    app.use('/api/tags', tagRouter);

    app.use('/api/categories', categoryRouter);

    app.use('/', (req, res) => {
        res.json({ message: 'success' });
    });
}

module.exports = router;
