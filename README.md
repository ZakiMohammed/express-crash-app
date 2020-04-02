# Express Node Crash Course

Traversy Media Express Node crash course app

#### Initialize NPM
Run the following command to initialize NPM
```
npm init
```

#### Initialize Git
Run the following command to initialize Git
```
git init
git add .
git remote add origin <repo_name>
git commit -m "first-commit"
git push -u origin master
```

#### Install Express
Run the following command to install Express
```
npm i express
```

#### Write a "Hello World" Code
Have a look on the following code for doing "Hello World" from Express
```
const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => console.log('Server is running...'));
```
Run the following command to execute the above written code
```
node index
```
The output for above will start a server on PORT 5000. 

Output:
```
Server started running on PORT 5000
```
But the catch over here is we have to run `node index` every single time when we do changes to index file. A run away from this problem is `nodemon` which will do the watch for us and will allow us to do the changes and view the changes immediately without re-running the file

#### Install Nodemon
Run the following command to install Nodemon
```
npm i -D nodemon
```
The `-D` indicate that nodemon will be a dev dependency not the actual production dependency. It will be there for development.

Do the following changes in `package.json` to run using nodemon
```
"scripts": {
      "start": "node index",
      "dev": "nodemon index"
  },
```
The start `node index` indicate that when you run npm start it will use node to run the code but when you use npm run dev it will use nodemon for executing and watching the code
```
npm run dev
```

#### Loading HTML from file
Use sendFile method to send file as a response to a route
```
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```
You can set a static folder from where you can load the static HTML pages in `express`. The use method helps for this case
```
app.use(express.static(path.join(__dirname, 'public')));
```
The logic behind static is to create a static website where we have bunch of HTML pages and we want to user to access them

#### Creating First API Endpoint
Use app.get method to create a route from where we can get response
```
app.get('/api/members/', (req, res) => res.json(members));
```
Add uuid npm package to get a unique id for the members
```
npm i uuid
```

#### Creating a Baby Middleware
Create your first middleware. The middleware get executed before any call to route happens. You can do any thing as you are getting (req, res) in a middleware. Following is a simple `logger` middleware:
```
const logger = (req, res, next) => {
    console.log('Logger');
    next();
};

app.use(logger);

app.get('/api/members/', (req, res) => res.json(members));
```

#### Creating a Mature Middleware
Lets just be formal here and create a folder for middleware and move the logger code in it and use it from there

File: middleware/logger.js
```
const moment = require('moment');

const logger = (req, res, next) => {
    console.log('🌼Logger: ', `${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`);
    next();
};

module.exports = logger;
```
File: index.js
```
const logger = require('./middleware/logger');

app.use(logger);
```

#### Creating API Get By Id Route
Lets get member by their id so that we can have a look how to grab something coming from the route params. Just move your members array to a new JS file to clear the clutter and access it using require
```
const members = require('./members');

app.get('/api/members/:id', (req, res) => {
    const found = members.find(i => i.id === req.params.id);
    if (found) {
        res.json(found);
    } else {
        res.status(404).json({
            message: `Member not found for id ${req.params.id}`
        })
    }
});
```
So here we can see we can access the params using `req.params` object

#### Organizing Our Routing
Again let us reduce the heavy lifting inside index about the route and move our routing code to a routes/api folder. In our case will do it for members. Our routes/api/members.js file will look like as follows:
File: routes/api/members.js
```
const express = require('express');
const members = require('../../members');
const router = express.Router();

// get member
router.get('/:id', (req, res) => {
    const found = members.find(i => i.id === req.params.id);
    if (found) {
        res.json(found);
    } else {
        res.status(404).json({
            message: `Member not found for id ${req.params.id}`
        })
    }
});

// get all members
router.get('/', (req, res) => res.json(members));

module.exports = router;
```
And to make them use in index file we can do is use method with require method
File: index.js
```
app.use('/api/members', require('./routes/api/members'))
```

#### Body Parser Middleware
For sending body in a POST call we need a body parser middleware and express provide it. Add this in your index file. Using this we can get body from `req.body`
```
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

#### Express Handle Bars
By definition "A Handlebars view engine for Express which doesn't suck.". Will use this to render the the views. Read the usage instruction https://github.com/ericf/express-handlebars
```
npm i express-handlebars
```
