# ER diagram
![er_diagram](https://github.com/MeRrai333/express_be_p2p_crypto_simulation_api/blob/main/Diagram/ER_diagram.svg?raw=true)

# Data dictionary
## users
| Column | Data Type | Nullable | Description |
| :---:  | :---:     | :---:	| :---:	      |
| UserId | INT   | No	| PK, Auto increament |
| UserName | Varchar(48)   | No	| UK, username |
| Email | Varchar(191) | No	| UK, e-mail |
| Password | Varchar(191)   | No	| password |
| OnCreate | Datetime | No | Date create |
