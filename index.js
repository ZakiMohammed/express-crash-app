const express = require('express');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');

const app = express();

const PORT = process.env.PORT || 5000;

// logger middle
// app.use(logger);

// handlebars
 app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars'); 

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// handlebars route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members: members
}));

// set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// members route
app.use('/api/members', require('./routes/api/members'))

app.listen(PORT, () => console.log(`Server started running on PORT ${PORT}`));