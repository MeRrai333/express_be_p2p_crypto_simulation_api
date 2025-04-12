# ER diagram
![er_diagram](https://github.com/MeRrai333/express_be_p2p_crypto_simulation_api/blob/main/Diagram/ER_diagram.svg?raw=true)

# Data dictionary
## users
User info.
  
| Column | Data Type | Nullable | Description |
| :---:  | :---:     | :---:	| :---:	      |
| UserId | INT   | No	| PK, Auto increament |
| UserName | Varchar(48)   | No	| username, UK |
| Email | Varchar(191) | No | e-mail, UK |
| Password | Varchar(191) | No | password |
| OnCreate | Datetime | No | Date create |

## cryptos
Crypto info, store only currently price because of challenge testing question not include feature like bars chart or candles chart for monitor overall price just P2P trade.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---:	|
| CryptoId | INT | No | PK, Auto increament |
| FullName | Varchar(32) | No | Crypto name, UK |
| ShortName | Varchar(8) | No | Crypto short name, UK |
| CurrentPrice | Double | No | currently price |
| OnCreate | Datetime | No | Date create |

## wallets
Crypto wallets of each user and crypto, auto create new wallet from code when crypto or user was insert.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---:	|
| WalletId | INT | No | PK, Auto increament |
| UserId | INT | No | Owner wallet, FK(users.UserId) |
| CryptoId | INT | No | Crypto of wallet, FK(cryptos.CryptoId) |
| QTY | INT | No | QTY of crypto |
| WalletAddress | Varchar(191) | No | default(uuid), UK |
| OnCreate | Datetime | No | Date create |

## protocols
Protocols for transfer coin. such as BSC or TOR

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---:	|
| ProtocolId | INT | No | PK, Auto increament |
| FullName | Varchar(32) | No | Protocol name |
| ShortName | Varchar(8) | No | Protocol short name |
| OnCreate | Datetime | No | Date create |

## wallet_logs
Logs for change qty of each wallet.

| Column | Data Type | Nullable | Description |
| :---: | :---: | :---:	| :---:	|
| WalletLogId | INT | No | PK, Auto increament |
| WalletId | INT | No | wallet, FK(wallets.WalletId) |
| ChangeQTY | INT | No | change qty<br>- > 0: Gain coin<br>- < 0: Lost coin |
| ReaminQTY | INT | No | Remain coin in wallet |
| ToFromWalletAddress | Varchar(191) | No | - ChangeQTY > 0/Gain coin: From address<br>- ChangeQTY < 0/Lost coin: To address |
| ProtocolId | INT | No | Which protocol used to transfer, FK(protocols.ProtocolId) |
| OnCreate | Datetime | No | Date create |
