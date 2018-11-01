const faker = require('faker');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MAX_ITEMS = 1000;

const fixtures = {};

fixtures.address = {

    zipCode: faker.address.zipCode,
    city: faker.address.city,
    cityPrefix: faker.address.cityPrefix,
    citySuffix: faker.address.citySuffix,
    streetName: faker.address.streetName,
    streetAddress: faker.address.streetAddress,
    streetSuffix: faker.address.streetSuffix,
    streetPrefix: faker.address.streetPrefix,
    secondaryAddress: faker.address.secondaryAddress,
    county: faker.address.county,
    country: faker.address.country,
    countryCode: faker.address.countryCode,
    stateAbbr: faker.address.stateAbbr,
    latitude: faker.address.latitude,
    longitude: faker.address.longitude

};

app.set('json spaces', 4);

//
// https://stackoverflow.com/questions/15819337/catch-express-bodyparser-error
//
// app.use((req, res, next) => {
//
//     bodyParser.json({
//
//                         verify: addRawBody,
//
//                     })(req, res, (err) => {
//
//         if (err) {
//
//             console.log(err);
//
//             res.sendStatus(400);
//
//             return;
//
//         }
//
//         next();
//
//     });
//
// });
//
// function addRawBody(req, res, buf, encoding) {
//
//     req.rawBody = buf.toString();
//
// }

app.use(bodyParser.json());
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-control-Allow-Headers', 'Content-Type,Authorization');

    next();

});

app.post('/pattern', (req, res) => {

    console.log(req.body);

    try {

        let build = [];

        const max = Number.parseInt((req.query.n && req.query.n > 0) ? (req.query.n > MAX_ITEMS) ? MAX_ITEMS : req.query.n : 1);
        const unique = !!req.query.unique;

        if (Array.isArray(req.body)) {

            for (let i = 0; i < req.body.length; i++) {

                build.push({

                               pattern: req.body[ i ],
                               unique,
                               requestedLength: max,
                               data: generate(req.body[ i ], max, unique)

                           });

            }

            console.log(build);

        } else {


        }

        res.send({

                     status: true,
                     data: build

                 });

    } catch (e) {

        console.log(e);
        res.status(406).send({

                                 status: false,
                                 message: 'invalid pattern'

                             });
    }


});

app.get('/card/:name', (req, res) => {

    const max = (req.query.n && req.query.n > 0) ? (req.query.n > MAX_ITEMS) ? MAX_ITEMS : req.query.n : 1;

    let fn;

    if (req.params.name === 'user') {

        fn = faker.helpers.userCard;

    }

    if (fn) {

        let build;

        if (max > 1) {

            build = [];

            for (let i = 0; i < max; i++) {

                faker.seed(Math.floor(Math.random() * 999999999));

                build.push(fn());

            }

        } else {

            build = fn();

        }

        res.send({

                     status: true,
                     data: build

                 });

    }

});

app.get('/:category/:property?', (req, res) => {

    handle(req.params.category + '.' + req.params.property, req, res);

});

app.on('clientError', (err, socket) => {

    socket.end('HTTP/1.1 4300 Bad Request\r\n\r\n');

});

app.listen(8080, () => {

    console.log('server started, listening on http://127.0.0.1:8080');

});

function generate(pattern, max, unique) {

    let build = [];

    for (let i = 0; i < max; i++) {

        faker.seed(Math.floor(Math.random() * 999999999));

        build.push(faker.fake(pattern));

    }

    if (unique) {

        build = Array.from(new Set(build));

    }

    return build;

}

function handle(pattern, req, res) {

    const ip = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress;

    console.log(new Date(), ip, req.params, req.query);

    try {

        const max = (req.query.n && req.query.n > 0) ? (req.query.n > MAX_ITEMS) ? MAX_ITEMS : req.query.n : 1;
        const unique = !!req.query.unique;

        res.send({

                     status: true,
                     property: req.params.category + '.' + req.params.property,
                     data: generate('{{' + pattern + '}}', max, unique)

                 });

    } catch (e) {

        res.status(406).send({

                                 status: false,
                                 property: req.params.category + '.' + req.params.property,
                                 message: 'invalid pattern'

                             });

    }

}
