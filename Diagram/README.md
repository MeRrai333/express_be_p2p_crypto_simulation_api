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
| WalletAddress | Varchar(191) | default(uuid), UK |
| OnCreate | Datetime | No | Date create |

