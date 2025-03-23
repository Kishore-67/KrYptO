const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Krypto_server:Krypto_server@krypto0.tw8p8.mongodb.net/?retryWrites=true&w=majority&appName=Krypto0');

app.post('/signup', (req, res) => {
  const { username,email, password } = req.body;
  FormDataModel.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("Already registered");
      } else {
        FormDataModel.create(req.body)
          .then(log_reg_form => res.json(log_reg_form))
          .catch(err => res.json(err));
      }
    });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("Wrong password");
        }
      } else {
        res.json("No records found!");
      }
    });
});

const DataSchema = new mongoose.Schema({
  currentPrice: Number,
});
const BUY_Model = mongoose.model('Buy_Order', DataSchema);

app.post('/buyorder', (req, res) => {
  const { currentPrice } = req.body;
  BUY_Model.create(req.body)
    .then(Buy_Order => res.json(Buy_Order))
    .catch(err => res.json(err));
});

const Sell_Order = mongoose.model('Sell_Order', DataSchema);

app.post('/sellorder', (req, res) => {
  const { currentPrice } = req.body;
  Sell_Order.create(req.body)
    .then(Sell_Order => res.json(Sell_Order))
    .catch(err => res.json(err));
});

const Add_Funds = new mongoose.Schema({
  amount: Number,
});
const DataModel3 = mongoose.model('AddFunds', Add_Funds);

app.post('/Addfunds', (req, res) => {
  const { amount } = req.body;
  DataModel3.create(req.body)
    .then(Add_Funds => res.json(Add_Funds))
    .catch(err => res.json(err));
});

const Withdraw_funds = new mongoose.Schema({
  amount: Number,
});
const Withdraw_modal = mongoose.model('Withdraw_fund', Withdraw_funds);

app.post('/Withdraw', (req, res) => {
  const { amount } = req.body;
  Withdraw_modal.create(req.body)
    .then(Withdraw_funds => res.json(Withdraw_funds))
    .catch(err => res.json(err));
});

const BalanceSchema = new mongoose.Schema({
  newBalance: Number,
});

const BalanceModel = mongoose.model('Balance', BalanceSchema);

app.post('/Balance', (req, res) => {
  const { newBalance } = req.body;
  BalanceModel.create(req.body)
    .then(Balance_Funds => res.json(Balance_Funds))
    .catch(err => res.json(err));
});

// GET route to fetch balance
app.get('/balance', async (req, res) => {
  try {
    const balance = await BalanceModel.findOne().sort({ _id: -1 }); // Get the most recent balance entry
    if (balance) {
      res.json(balance);
    } else {
      res.status(404).json({ error: 'Balance not found' });
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log("Server listening on http://127.0.0.1:5000");
});
