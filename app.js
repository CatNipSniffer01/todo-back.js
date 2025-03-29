// api/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const tasklistRoutes = require('./routes/tasklists');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Register routes – note that for auth routes, we’re using the '/api' prefix.
app.use('/api', authRoutes);
app.use('/tasklists', tasklistRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 7096;
sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch(err => {
    console.log("Could not sync database", err);
});
