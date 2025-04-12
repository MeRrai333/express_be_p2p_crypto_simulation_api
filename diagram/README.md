# ER diagram
![er_diagram](https://github.com/MeRrai333/express_be_p2p_crypto_simulation_api/blob/main/diagram/ER_diagram.svg?raw=true)

# Data dictionary
## users
User info.
  
| Column | Data Type | Nullable | Description |
| :---:  | :---:     | :---:	| :---	      |
| UserId | INT   | No	| PK, Auto increament |
| UserName | Varchar(48)   | No	| username, UK |
| Email | Varchar(191) | No | e-mail, UK |
| Password | Varchar(191) | No | password |
| OnCreate | Datetime | No | Datetime create |

## cryptos
Crypto info, store only currently price because of challenge testing question not include feature like bars chart or candles chart for monitor overall price just P2P trade.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---	|
| CryptoId | INT | No | PK, Auto increament |
| FullName | Varchar(32) | No | Crypto name, UK |
| ShortName | Varchar(8) | No | Crypto short name, UK |
| CurrentPrice | Double | No | currently price |
| OnCreate | Datetime | No | Datetime create |

## wallets
Crypto wallets of each user and crypto, auto create new wallet from code when crypto or user was insert.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---	|
| WalletId | INT | No | PK, Auto increament |
| UserId | INT | No | Owner wallet, FK(users.UserId) |
| CryptoId | INT | No | Crypto of wallet, FK(cryptos.CryptoId) |
| QTY | INT | No | QTY of crypto |
| WalletAddress | Varchar(191) | No | default(uuid), UK |
| OnCreate | Datetime | No | Datetime create |

## protocols
Protocols for transfer coin. such as BSC or TOR

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---	|
| ProtocolId | INT | No | PK, Auto increament |
| FullName | Varchar(32) | No | Protocol name |
| ShortName | Varchar(8) | No | Protocol short name |
| OnCreate | Datetime | No | Datetime create |

## wallet_logs
Logs for change qty of each wallet.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---	|
| WalletLogId | INT | No | PK, Auto increament |
| WalletId | INT | No | wallet, FK(wallets.WalletId) |
| ChangeQTY | INT | No | change qty<br>- > 0: Gain coin<br>- < 0: Lose coin |
| ReaminQTY | INT | No | Remain coin in wallet |
| ToFromWalletAddress | Varchar(191) | No | - ChangeQTY > 0/Gain coin: From address<br>- ChangeQTY < 0/Lose coin: To address |
| ProtocolId | INT | No | Which protocol used to transfer, FK(protocols.ProtocolId) |
| OnCreate | Datetime | No | Datetime create |

## payment_types
Available payment in system.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---	|
| PaymentTypeId | INT | No | PK, Auto increament |
| Name | Varchar(32) | No | Payment name |
| OnCreate | Datetime | No | Datetime create |

## p2p_payments
Payment for P2P trade for each user.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---	|
| P2PPaymentId | INT | No | PK, Auto increament |
| UserId | INT   | No	| Owner, FK(users,UserId) |
| PaymentTypeId | INT | No | Payment type, FK(payment_types.PaymentTypeId) |
| PaymentFirstName | Varchar(32) | No | Firstname in payment |
| PaymentLastName | Varchar(32) | No | Lastname in payment |
| PaymentInfo | Varchar(64) | No | Info of payment such as banking id, banking name etc. |
| OnCreate | Datetime | No | Datetime create |

## p2p_buys
Store for buy coin from other user.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---	|
| P2PBuyId | INT | No | PK, Auto increament |
| UserId | INT   | No	| Store's owner, FK(users,UserId) |
| CryptoId | INT | No | Crypto of store, FK(cryptos.CryptoId) |
| PriceRate | Float | No | Price per piece of coin |
| MinQTY | Float | No | Minimum to buy |
| MaxQTY | Float | No | Maximum to buy |
| OnCreate | Datetime | No | Datetime create |

## p2p_sells
Store for sell coin from other user.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---	|
| P2PSellId | INT | No | PK, Auto increament |
| UserId | INT   | No	| Store's owner, FK(users,UserId) |
| CryptoId | INT | No | Crypto of store, FK(cryptos.CryptoId) |
| PriceRate | Float | No | Price per piece of coin |
| MinQTY | Float | No | Minimum to sell |
| MaxQTY | Float | No | Maximum to sell |
| OnCreate | Datetime | No | Datetime create |

## p2p_buy_logs
Buy logs for each order of store.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---	|
| P2PBuyLogId | INT | No | PK, Auto increament |
| P2PBuyId | INT | No | P2P Buy store, FK(p2p_buys.P2PBuyId) |
| CustomerId | INT | No | Customer, FK(users.UserId) |
| QTY | Float | No | Qty to buy |
| SumPrice | Float | No | Summary of price, QTY * PriceRate |
| Status | INT | No | default(0)<br>0:Wait to paid<br>1:Success<br>-1:Failed |
| FeedbackScore | INT | Yes | Feedback from customer<br>0: no feedback<br>1:Positive<br>-1:Negative |
| OnFinish | Datetime | Yes | Datetime on finish |
| OnCreate | Datetime | No | Datetime create |

## p2p_buy_logs
Sell logs for each order of store.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---	|
| P2PSellLogId | INT | No | PK, Auto increament |
| P2PSellId | INT | No | P2P Sell store, FK(p2p_sells.P2PSellId) |
| CustomerId | INT | No | Customer, FK(users.UserId) |
| QTY | Float | No | Qty to buy |
| SumPrice | Float | No | Summary of price, QTY * PriceRate |
| Status | INT | No | default(0)<br>0:Wait to paid<br>1:Success<br>-1:Failed |
| FeedbackScore | INT | Yes | Feedback from customer<br>0: no feedback<br>1:Positive<br>-1:Negative |
| OnFinish | Datetime | Yes | Datetime on finish |
| OnCreate | Datetime | No | Datetime create |
