const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
var db = require(path.join(__dirname, 'db.json'));

server.use(middlewares);
server.use(jsonServer.bodyParser)
server.use(jsonServer.rewriter({
    "/api/*": "/$1",
}));

server.get('/contacts', (req, res) => {
    res.status(200).jsonp(db.contacts);
});

server.get('/contacts/:id', (req, res) => {
    let contact = db.contacts.find(contact => {
        return contact.id == req.params.id;
    })
    if (contact) {
        res.status(200).jsonp(contact);
    } else {
        res.status(400).jsonp({
            error: "Contact not found"
        });
    }
});

server.get('/groups', (req, res) => {
    res.status(200).jsonp(db.groups);
});

server.post('/contacts', (req, res) => {
    if (!db.biggestId.id) db.biggestId.id = 0;
    let currentId = ++(db.biggestId.id);
    const newRecord = {
        ...req.body,
        id: currentId
    };
    db.contacts.push(newRecord);
    res.status(200).jsonp(newRecord);
});

server.delete('/contacts', (req, res) => {
    const removeIndex = db.contacts.map(item => item.id).indexOf(req.body.id);
    ~removeIndex && db.contacts.splice(removeIndex, 1);
    res.status(200).jsonp({});
});

server.patch('/contacts', (req, res) => {
    let foundIndex = db.contacts.findIndex(contact => contact.id == req.body.id);
    if(foundIndex >= 0) {
        db.contacts[foundIndex] = req.body;
        res.status(200).jsonp(req.body);
    } else {
        res.status(400).jsonp({
            error: "Contact not found"
        });
    }
});

server.use(router);

const port = process.env.PORT || 4000;

server.listen(port);
