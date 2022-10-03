require('dotenv').config()
const app = require('./app');
const db = require('./database');
const port = process.env.PORT

const routes = require('./routes');
routes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
