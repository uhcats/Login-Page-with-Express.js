const express = require('express');
const app = express();
const PORT = 3000;

const {
  MongoClient,
} = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'test';


async function main() {
  await client.connect();
  console.log('Connected successfully to server')
  const db = client.db(dbName);
  const collection = db.collection('people');

  return 'done...';
}

main()
  .then(console.log('works'))
  .catch(console.log('error'))
  .finally(() => client.close())


app.set('view engine', 'ejs');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
  extended: false
}));

let log = 'admin';
let pass = '123'

app.listen(PORT, () => {
  console.log('Server is listening at http://localhost:3000');
})

app.get('/', (req, res) => {
  res.send('Witaj na stronie głównej');
})

app.get('/login', (req, res) => {
  res.render('index.ejs')
})

app.post('/login', (req, res) => {

  const {
    login,
    password
  } = req.body;

  if (login === log && password === pass) {
    res.redirect('/')
  } else {
    res.redirect('/login');
  }

})