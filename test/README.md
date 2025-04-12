# Path detail

## User
### Get
- `/api/user`
	* get all user
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime"
	}[]
	```
- `/api/user/id/:id`
	* get user by Id
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime"
	}
	```
- `/api/user/id/:id/payments`
	* get user by Id with P2P payments
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime"
		"P2PPayments": {
			"P2PPaymentId": "number",
			"PaymentFirstName": "string",
			"PaymentLastName": "string",
			"PaymentInfo": "string",
			"UserId": "number",
			"PaymentTypeId": "number",
			"OnCreate": "datetime",
			"PaymentType": {
				"PaymentTypeId": "number",
				"Name": "string",
				"OnCreate": "datetime"
			}
		}[]
	}
	```
- `/api/user/id/:id/wallets`
	* get user by Id with wallets
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime"
		"Wallets": {
			"WalletId": "number",
			"UserId": "number",
			"CryptoId": "number",
			"QTY": "number",
			"WalletAddress": "string",
			"OnCreate": "datetime",
			"Crypto": {
				"CryptoId": "number",
				"FullName": "string",
				"ShortName": "string",
				"CurrentPrice": "number",
				"OnCreate": "datetime",
			}
		}[]
	}
	```
- `/api/user/id/:id/p2pBuys`
	* get user by Id with P2P Buys
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime",
		"P2PBuys": {
			"P2PBuyId": "number",
			"UserId": "number",
			"CryptoId": "number",
			"PriceRate": "number",
			"MinQTY": "number",
			"MaxQTY": "number",
			"OnCreate": "datetime",
			"Crypto": {
				"CryptoId": "number",
				"FullName": "string",
				"ShortName": "string",
				"CurrentPrice": "number",
				"OnCreate": "datetime"
			}
		}[]
	}
	```
- `/api/user/id/:id/p2pBuyLogs`
	* get user by Id with P2P Buy logs
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime",
		"P2PBuyLogs": {
			"P2PBuyLogId": "number",
			"P2PBuyId": "number",
			"CustomerId": "number",
			"QTY": "number",
			"SumPriec": "number",
			"Status": "number",
			"FeedbackScore": "number",
			"OnFinish": "datetime",
			"OnCreate": "datetime",
		}[]
	}
	```
- `/api/user/id/:id/p2pSells`
	* get user by Id with P2P Sells
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime",
		"P2PSells": {
			"P2PSellId": "number",
			"UserId": "number",
			"CryptoId": "number",
			"PriceRate": "number",
			"MinQTY": "number",
			"MaxQTY": "number",
			"OnCreate": "datetime",
			"Crypto": {
				"CryptoId": "number",
				"FullName": "string",
				"ShortName": "string",
				"CurrentPrice": "number",
				"OnCreate": "datetime"
			}
		}[]
	}
	```
- `/api/user/id/:id/p2pSellLogs`
	* get user by Id with P2P Sell logs
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime",
		"P2PSellLogs": {
			"P2PSellLogId": "number",
			"P2PSellId": "number",
			"CustomerId": "number",
			"QTY": "number",
			"SumPriec": "number",
			"Status": "number",
			"FeedbackScore": "number",
			"OnFinish": "datetime",
			"OnCreate": "datetime",
		}[]
	}
	```
- `/api/user/email/:email`
	* get user by Email
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime"
	}
	```
### Post
- `/api/user`
	* add user
	* body
	```json
	{
		"username": "string",
		"email": "string",
		"password": "string",
		"repassword": "string"
	}
	```
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime"
	}
	```
- `/api/user/signIn`
	* sign in with email and password (Just check email and password is match not stored data in server session or cookie)
	* body
	```json
	{
		"email": "string",
		"password": "string"
	}
	```
	* return
	```json
	{
		"message": "sign in succes",
		"user": {
			"UserId": "number",
			"UserName": "string",
			"Email": "string",
			"OnCreate": "datetime"
		}
	}
	```
### Put
- `/api/user/id/:id`
	* Update user data by Id
	* body
	```json
	{
		"username": "string",
		"email": "string",
		"password": "string",
		"repassword": "string"
	}
	```
		* username: optional
		* email: optional
		* password: optional (require repassword)
	* return
	```json
	{
		"UserId": "number",
		"UserName": "string",
		"Email": "string",
		"OnCreate": "datetime"
	}
	```
### Delete
- `/api/user/id/:id`
	* Delete by Id
	* return
	```json
	{
		"message": "deleted userId :id",
		"user": {
			"UserId": "number",
			"UserName": "string",
			"Email": "string",
			"OnCreate": "datetime"
		}
	}
	```
- `/api/user/email`
	* Delete by email
	* body
	```json
	{
		"email": "string"
	}
	```
	* return
	```json
	{
		"message": "deleted user Email :email",
		"user": {
			"UserId": "number",
			"UserName": "string",
			"Email": "string",
			"OnCreate": "datetime"
		}
	}
	```
## Crypto
### Get
- `/api/crypto`
	* Get all crypto
	* Query params
		* search=:cryptoName for search
	* return
	```json
	{
		"CryptoId": "number",
		"FullName": "string",
		"ShortName": "string",
		"CurrentPrice": "number",
		"OnCreate": "datetime",
	}[]
	```
- `/api/crypto/id/:id`
	* Get by Id
	* return
	```json
	{
		"CryptoId": "number",
		"FullName": "string",
		"ShortName": "string",
		"CurrentPrice": "number",
		"OnCreate": "datetime",
	}
	```
### Post
- `/api/crypto`
	* add crypto
	* body
	```json
	{
		"fullName": "string",
		"shortName": "string",
		"currentPrice": "number"
	}
	```
	* return
	```json
	{
		"CryptoId":"number",
		"FullName":"string",
		"ShortName":"string",
		"CurrentPrice":"number",
		"OnCreate":"datetime",
	}
	```
- `/api/crypto/many`
	* add cryptos
	* body
	```json
	{
		"fullName": "string",
		"shortName": "string",
		"currentPrice": "number"
	}[]
	```
	* return
	```json
	{
		"CryptoId":"number",
		"FullName":"string",
		"ShortName":"string",
		"CurrentPrice":"number",
		"OnCreate":"datetime",
	}[]
	```
### Put
- `/api/crypto/id/:id`
	* Update by Id
	* body
	```json
	{
		"fullName": "string",
		"shortName": "string",
		"currentPrice": "number"
	}
	```
		* fullName: optional
		* shortName: optional
		* currentPrice: optional
	* return
	```json
	{
		"CryptoId":"number",
		"FullName":"string",
		"ShortName":"string",
		"CurrentPrice":"number",
		"OnCreate":"datetime",
	}
	```
### Delete
- `/api/crypto/id/:id`
	* Delete by Id
	* return
	```json
	{
		"message": "deleted cryptoId :id",
		"crypto": {
			"CryptoId":"number",
			"FullName":"string",
			"ShortName":"string",
			"CurrentPrice":"number",
			"OnCreate":"datetime",
		}
	}
	```
## Wallet
### Get
- `/api/wallet`
	* Get all
	* return
	```json
	{
		"WalletId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"QTY": "number",
		"WalletAddress": "string",
		"OnCreate": "datetime",
		"User": {
			"UserName": "string"
		},
		"Crypto": {
			"CryptoId": "number",
			"FullName": "string",
			"ShortName": "string",
			"CurrentPrice": "number",
			"OnCreate": "datetime"
		}
	}[]
	```
- `/api/walet/id/:id`
	* Get by Id
	* return
	```json
	{
		"WalletId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"QTY": "number",
		"WalletAddress": "string",
		"OnCreate": "datetime",
		"User": {
			"UserName": "string"
		},
		"Crypto": {
			"CryptoId": "number",
			"FullName": "string",
			"ShortName": "string",
			"CurrentPrice": "number",
			"OnCreate": "datetime"
		}
	}
	```
- `/api/wallet/user/id/:id`
	* Get by user Id
	* return
	```json
	{
		"WalletId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"QTY": "number",
		"WalletAddress": "string",
		"OnCreate": "datetime",
		"User": {
			"UserName": "string"
		},
		"Crypto": {
			"CryptoId": "number",
			"FullName": "string",
			"ShortName": "string",
			"CurrentPrice": "number",
			"OnCreate": "datetime"
		}
	}[]
	```
- `/api/wallet/address/:walletAddress`
	* Get by Wallet Address
	* return
	```json
	{
		"WalletId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"QTY": "number",
		"WalletAddress": "string",
		"OnCreate": "datetime",
		"User": {
			"UserName": "string"
		},
		"Crypto": {
			"CryptoId": "number",
			"FullName": "string",
			"ShortName": "string",
			"CurrentPrice": "number",
			"OnCreate": "datetime"
		}
	}
	```
- `/api/wallet/address/:walletAddress`
	* Get logs wallet by Wallet Address
	* return
	```json
	{
		"WalletLogId": "number",
		"WalletId": "number",
		"ChangeQTY": "number",
		"RemainQTY": "number",
		"ToFromWalletAddress": "string",
		"ProtocolId": "number",
		"OnCreate": "datetime",
		"Protocol": {
			"ProtocolId": "number",
			"FullName": "string",
			"ShortName": "string",
			"OnCreate": "datetime",
		}
	}[]
	```
### Post
- No add directly, normally add wallet when crypto or user was create by code
### Put
- `/api/wallet/receive/desAddr/:desWalletAddr`
	* destination wallet address to receive coin
	* body
	```json
	{
		"qty": "number",
		"cryptoId": "number",
		"srcWalletAddress": "string",
		"protocolId": "number"
	}
	```
		* srcWalletAddress: source wallet address
		* protocolId: protocol use to transfer
	* return
	```json
	{
		"WalletId", "number",
		"UserId", "number",
		"CryptoId", "number",
		"QTY", "number",
		"WalletAddress", "string",
		"OnCreate", "datetime"
	}
	```
- `/api/wallet/transfer/srcAddr/:srcWalletAddr`
	* source wallet address to send coin
	* body
	```json
	{
		"qty": "number",
		"cryptoId": "number",
		"desWalletAddress": "string",
		"protocolId": "number"
	}
	```
		* desWalletAddress: destination wallet address
		* protocolId: protocol use to transfer
	* return
	```json
	{
		"WalletId", "number",
		"UserId", "number",
		"CryptoId", "number",
		"QTY", "number",
		"WalletAddress", "string",
		"OnCreate", "datetime"
	}
	```
### Delete
- No delete directly, normally delete wallet when crypto or user was delete by code
## Payment type
