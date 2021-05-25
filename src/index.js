const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars')
const sortMiddleware = require('./app/middlewares/SortMiddleware')

const app = express();
const port = 3000;

const route = require('./routes')
const db = require('./config/db')

db.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json())

app.use(morgan('combined'))

app.use(methodOverride('_method'))

// custom middlewares
app.use(sortMiddleware)

// template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'fad fa-sort-down',
                    asc: 'fas fa-sort-up',
                    desc: 'fas fa-sort-down',
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const type = types[sortType]
                const icon = icons[sortType]

                return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
              </a>`
            }
        }
    }),
);
app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'resource','views'))

route(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
