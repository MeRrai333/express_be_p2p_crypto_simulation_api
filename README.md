# React Todo List

Exprees, Simulation crypto P2P trade

# Features
  
## User
User info and query with tables that involed with user
* `Get` All
* `Get` By Id
* `Get` By Id with List of payments
* `Get` By Id with Wallets
* `Get` By Id with P2P Buys
* `Get` By Id with P2P Buy logs
* `Get` By Id with P2P Sells
* `Get` By Id with P2P Sell logs
* `Get` By Email
* `Post` New user
* `Post` Sign in (only check email and password match not stored session, cookies or jwt token)
* `Put` By Id
* `Delete` By Id
* `Delete` By Email
  
## Crypto
Crypto coin stored only currently price, because of challenge testing question not include feature like bars chart or candles chart for monitor overall price just P2P trade
* `Get` All
* `Get` By Id
* `Post` New coin
* `Post` New coins
* `Put` By Id
* `Delete` By Id
  
## Wallet
Wallet for each user and coin
* `Get` All
* `Get` By Id
* `Get` By User Id
* `Get` By Wallet address
* `Get` Wallet logs by address
* `Put` Receive coin by Id
* `Put` Transfer coin by Id
  
## Payment Type
Payment way in our system
* `Get` All
* `Get` By Id
* `Post` New Payment type
* `Post` New Payment types
* `Put` By Id
* `Delete` By Id

## Protocol
Protocol for transfer coin such as BSC or TOR
* `Get` All
* `Get` By Id
* `Post` New Protocol
* `Post` New Protocols
* `Put` By Id
* `Delete` By Id
  
## P2P Payment
stored payments of each user
* `Get` By Id
* `Get` By User Id
* `Post` New P2P Payment for each user
* `Put` By Id
* `Delete` By Id
  
## P2P Buy
store for buy coin from other user
* `Get` By short name of coin
* `Get` By Id
* `Get` Logs by Id
* `Get` By User Id
* `Post` New P2P Buy store
* `Put` By Id
* `Post` Open order
* `Put` Succes order

## P2P Sell
store for sell coin from other user
* `Get` By short name of coin
* `Get` By Id
* `Get` Logs by Id
* `Get` By User Id
* `Post` New P2P Buy store
* `Put` By Id
* `Post` Open order
* `Put` Succes order

# Preparation
1. NodeJS
2. MySQL

# Installation
1. Using npm to install package
```bash
npm install
```
2. Create `.env` file at root of project
3. In `.env` add
```
PORT=3000
NODE_ENV=development
DATABASE_URL="mysql://[user]:[pass]@localhost:3306/[db]"
P2PSTATEMENTTIMEOUT=60
```
- PORT: Port for web server
- NODE_ENV: Is it development or not
- DATABASE_URL: MySQL Connection URI
	* [user]: user of db
	* [pass]: password of user
	* localhost: IP address of database
	* 3306: Port of MySQL
	* [db]: database name (If user is root or grant to create db, It's will auto create by PrismaORM)
- P2PSTATEMENTTIMEOUT: time in second, for P2P order will automatic to fail if order not success
4. In terminal at root of project run
```
npx prisma migrate dev --name 'init'
```
for create database and table from schema file in /prisma/schema.prisma
5. if seeding from 4. not auto running then run this in  terminal at root of project
```
npx prisma db seed
```

# How to run
```
npm run dev
```

# ER diagram
![er_diagram](https://github.com/MeRrai333/express_be_p2p_crypto_simulation_api/blob/main/diagram/ER_diagram.svg?raw=true)
![More detail](./Diagram/README.md)
