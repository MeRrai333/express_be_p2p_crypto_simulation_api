# Path detail
import `CryptoBackend.postman_collection.json` file to Postman for testing

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
	* body detail
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
	* body detail
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
	* body detail
		* srcWalletAddress: source wallet address
		* protocolId: protocol use to transfer
	* return
	```json
	{
		"WalletId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"QTY": "number",
		"WalletAddress", "string",
		"OnCreate": "datetime"
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
	* body detail
		* desWalletAddress: destination wallet address
		* protocolId: protocol use to transfer
	* return
	```json
	{
		"WalletId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"QTY": "number",
		"WalletAddress": "string",
		"OnCreate": "datetime"
	}
	```
### Delete
- No delete directly, normally delete wallet when crypto or user was delete by code
## Payment type
### Get
- `/api/paymentType`
	* Get all
	* return
	```json
	{
		"PaymentTypeId": "number",
		"Name": "string",
		"OnCreate": "datetime"
	}[]
	```
- `/api/paymentType/id/:id`
	* Get by Id
	* return
	```json
	{
		"PaymentTypeId": "number",
		"Name": "string",
		"OnCreate": "datetime"
	}
	```
### Post
- `/api/paymentType`
	* Add Payment Type
	* body
	```json
	{
		"name": "string"
	}
	```
	* return
	```json
	{
		"PaymentTypeId": "number",
		"Name": "string",
		"OnCreate": "datetime"
	}
	```
- `/api/paymentType/many`
	* Add Payment Types
	* body
	```json
	{
		"name": "string[]"
	}
	```
	* return
	```json
	{
		"PaymentTypeId": "number",
		"Name": "string",
		"OnCreate": "datetime"
	}[]
	```
### Put
- `/api/paymentType/id/:id`
	* Update by Id
	* body
	```json
	{
		"name": "string"
	}
	```
	* return
	```json
	{
		"PaymentTypeId": "number",
		"Name": "string",
		"OnCreate": "datetime"
	}
	```
### Delete
- `/api/paymentType/id/:id`
	* Delete by Id
	* return
	```json
	{
		"message": "deleted paymentId :id",
		"paymentType": {
			"PaymentTypeId": "number",
			"Name": "string",
			"OnCreate": "datetime"
		}
	}
	```
## Protocol
### Get
- `/api/protocol`
	* Get all
	* return
	```json
	{
		"ProtocolId": "number",
		"FullName": "string",
		"ShortName": "string",
		"OnCreate": "datetime"
	}[]
	```
- `/api/protocol/id/:id`
	* Get by Id
	* return
	```json
	{
		"ProtocolId": "number",
		"FullName": "string",
		"ShortName": "string",
		"OnCreate": "datetime"
	}
	```
### Post
- `/api/protocol`
	* Add Payment Type
	* body
	```json
	{
		"fullName": "string",
		"shortName": "string"
	}
	```
	* return
	```json
	{
		"ProtocolId": "number",
		"FullName": "string",
		"ShortName": "string",
		"OnCreate": "datetime"
	}
	```
- `/api/protocol/many`
	* Add Payment Types
	* body
	```json
	{
		"names": {
			"fullName": "string",
			"shortName": "string"
		}[]
	}
	```
	* return
	```json
	{
		"ProtocolId": "number",
		"FullName": "string",
		"ShortName": "string",
		"OnCreate": "datetime"
	}[]
	```
### Put
- `/api/protocol/id/:id`
	* Update by Id
	* body
	```json
	{
		"fullName": "string",
		"shortName": "string",
	}
	```
	* body detail
		* fullName: optional
		* shortName: optional
	* return
	```json
	{
		"ProtocolId": "number",
		"FullName": "string",
		"ShortName": "string",
		"OnCreate": "datetime"
	}
	```
### Delete
- `/api/protocol/id/:id`
	* Delete by Id
	* return
	```json
	{
		"message": "deleted protocolId :id",
		"paymentType": {
			"ProtocolId": "number",
			"FullName": "string",
			"ShortName": "string",
			"OnCreate": "datetime"
		}
	}
	```
## P2P Payment
### Get
- No get all
- `/api/p2p/payment/user/id/:id`
	* Get by User Id
	* return
	```json
	{
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
			"OnCreate": "datetime",
		}
	}[]
	```
- `/api/p2p/payment/id/:id`
	* Get by Id
	* return
	```json
	{
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
			"OnCreate": "datetime",
		}
	}
	```
### Post
- `/api/p2p/payment`
	* Add P2P Payment
	* body
	```json
	{
		"userId": "number",
		"paymentTypeId": "number",
		"paymentFirstName": "string",
		"paymentLastName": "string",
		"paymentInfo": "string"
	}
	```
	* return
	```json
	{
		"P2PPaymentId": "number",
		"PaymentFirstName": "string",
		"PaymentLastName": "string",
		"PaymentInfo": "string",
		"UserId": "number",
		"PaymentTypeId": "number",
		"OnCreate": "datetime"
	}
	```
### Put
- `/api/p2p/payment/id/:id`
	* Update by Id
	* body
	```json
	{
		"paymentTypeId": "number",
		"paymentFirstName": "string",
		"paymentLastName": "string",
		"paymentInfo": "string"
	}
	```
	* body detail
		* paymentTypeId: optional
		* paymentFirstName: optional
		* paymentLastName: optional
		* paymentInfo: optional
	* return
	```json
	{
		"P2PPaymentId": "number",
		"PaymentFirstName": "string",
		"PaymentLastName": "string",
		"PaymentInfo": "string",
		"UserId": "number",
		"PaymentTypeId": "number",
		"OnCreate": "datetime"
	}
	```
### Delete
- `/api/p2p/payment/id/:id`
	* Delete by Id
	* return
	```json
	{
		"message": "deleted paymentId :id",
		"paymentType": {
			"P2PPaymentId": "number",
			"PaymentFirstName": "string",
			"PaymentLastName": "string",
			"PaymentInfo": "string",
			"UserId": "number",
			"PaymentTypeId": "number",
			"OnCreate": "datetime"
		}
	}
	```
## P2P Buy
### Get
- No get all, normally should search by coin
- `/api/p2p/buy/coin/:coin`
	* Get by coin short name
	* return
	```json
	{
		"P2PBuyId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"PriceRate": "number",
		"MinQTY": "number",
		"MaxQTY": "number",
		"OnCreate": "datetime",
		"User": {
			"UserName": "string",
			"OnCreate": "datetime",
			"P2PPayments": {
				"P2PPaymentId": "number",
				"PaymentFirstName": "string",
				"PaymentLastName": "string",
				"PaymentInfo": "string",
				"UserId": "number",
				"PaymentTypeId": "number",
				"OnCreate": "datetime",
			}[]
		}
	}[]
	```
- `/api/p2p/buy/id/:id`
	* Get by Id
	* return
	```json
	{
		"P2PBuyId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"PriceRate": "number",
		"MinQTY": "number",
		"MaxQTY": "number",
		"OnCreate": "datetime",
		"User": {
			"UserName": "string",
			"OnCreate": "datetime",
			"P2PPayments": {
				"P2PPaymentId": "number",
				"PaymentFirstName": "string",
				"PaymentLastName": "string",
				"PaymentInfo": "string",
				"UserId": "number",
				"PaymentTypeId": "number",
				"OnCreate": "datetime",
			}[]
		}
	}
	```
- `/api/p2p/buy/user/id/:id`
	* Get by User Id
	* return
	```json
	{
		"P2PBuyId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"PriceRate": "number",
		"MinQTY": "number",
		"MaxQTY": "number",
		"OnCreate": "datetime",
		"User": {
			"UserName": "string",
			"OnCreate": "datetime",
			"P2PPayments": {
				"P2PPaymentId": "number",
				"PaymentFirstName": "string",
				"PaymentLastName": "string",
				"PaymentInfo": "string",
				"UserId": "number",
				"PaymentTypeId": "number",
				"OnCreate": "datetime",
			}[]
		}
	}[]
	```
- `/api/p2p/buy/id/:id/logs`
	* Get logs by Id
	* return
	```json
	{
		"P2PBuyLogId": "number",
		"P2PBuyId": "number",
		"CustomerId": "number",
		"QTY": "number",
		"SumPriec": "number",
		"Status": "number",
		"FeedbackScore": "number | null",
		"OnFinish": "datetime | null",
		"OnCreate": "number"
	}[]
	```
### Post
- `/api/p2p/buy`
	* Add P2P buy store
	* body
	```json
	{
		"userId": "number",
		"cryptoId": "number",
		"priceRate": "number",
		"minQty": "number",
		"maxQty": "number"
	}
	```
	* return
	```json
	{
		"P2PBuyId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"PriceRate": "number",
		"MinQTY": "number",
		"MaxQTY": "number",
		"OnCreate": "datetime"
	}
	```
- `/api/p2p/buy/order`
	- open order
	- body
	```json
	{
		"customerId": "number",
		"P2PBuyId": "number",
		"qty": "number"
	}
	```
	- return
	```json
	{
		"P2PBuyLogId": "number",
		"P2PBuyId": "number",
		"CustomerId": "number",
		"QTY": "number",
		"SumPriec": "number",
		"Status": "number",
		"FeedbackScore": "number | null",
		"OnFinish": "datetime | null",
		"OnCreate": "number"
	}
	```
### Put
- `/api/p2p/buy/id/:id`
	* Update P2P buy store by Id (can't change crypto)
	* body
	```json
	{
		"priceRate": "number",
		"minQty": "number",
		"maxQty": "number"
	}
	```
	* body detail
		* priceRate: optional
		* minQty: optional
		* maxQty: optional
	* return
	```json
	{
		"P2PBuyId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"PriceRate": "number",
		"MinQTY": "number",
		"MaxQTY": "number",
		"OnCreate": "datetime"
	}
	```
- `/api/p2p/buy/order/id/:id`
	- Update to success order by Id
	- body
	```json
	{
		"feedbackScore": "number"
	}
	```
	- return
	```json
	{
		"P2PBuyLogId": "number",
		"P2PBuyId": "number",
		"CustomerId": "number",
		"QTY": "number",
		"SumPriec": "number",
		"Status": "number",
		"FeedbackScore": "number | null",
		"OnFinish": "datetime | null",
		"OnCreate": "number"
	}
	```
### Delete
 `/api/p2p/buy/id/:id`
	* Delete by Id
	* return
	```json
	{
		"message": "deleted P2PBuyId :id",
		"P2PBuy": {
			"P2PBuyId": "number",
			"UserId": "number",
			"CryptoId": "number",
			"PriceRate": "number",
			"MinQTY": "number",
			"MaxQTY": "number",
			"OnCreate": "datetime"
		}
		
	}
	```
## P2P Sell
### Get
- No get all, normally should search by coin
- `/api/p2p/sell/coin/:coin`
	* Get by coin short name
	* return
	```json
	{
		"P2PSellId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"PriceRate": "number",
		"MinQTY": "number",
		"MaxQTY": "number",
		"OnCreate": "datetime",
		"User": {
			"UserName": "string",
			"OnCreate": "datetime",
			"P2PPayments": {
				"P2PPaymentId": "number",
				"PaymentFirstName": "string",
				"PaymentLastName": "string",
				"PaymentInfo": "string",
				"UserId": "number",
				"PaymentTypeId": "number",
				"OnCreate": "datetime",
			}[]
		}
	}[]
	```
- `/api/p2p/sell/id/:id`
	* Get by Id
	* return
	```json
	{
		"P2PSellId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"PriceRate": "number",
		"MinQTY": "number",
		"MaxQTY": "number",
		"OnCreate": "datetime",
		"User": {
			"UserName": "string",
			"OnCreate": "datetime",
			"P2PPayments": {
				"P2PPaymentId": "number",
				"PaymentFirstName": "string",
				"PaymentLastName": "string",
				"PaymentInfo": "string",
				"UserId": "number",
				"PaymentTypeId": "number",
				"OnCreate": "datetime",
			}[]
		}
	}
	```
- `/api/p2p/sell/user/id/:id`
	* Get by User Id
	* return
	```json
	{
		"P2PSellId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"PriceRate": "number",
		"MinQTY": "number",
		"MaxQTY": "number",
		"OnCreate": "datetime",
		"User": {
			"UserName": "string",
			"OnCreate": "datetime",
			"P2PPayments": {
				"P2PPaymentId": "number",
				"PaymentFirstName": "string",
				"PaymentLastName": "string",
				"PaymentInfo": "string",
				"UserId": "number",
				"PaymentTypeId": "number",
				"OnCreate": "datetime",
			}[]
		}
	}[]
	```
- `/api/p2p/sell/id/:id/logs`
	* Get logs by Id
	* return
	```json
	{
		"P2PSellLogId": "number",
		"P2PSellId": "number",
		"CustomerId": "number",
		"QTY": "number",
		"SumPriec": "number",
		"Status": "number",
		"FeedbackScore": "number | null",
		"OnFinish": "datetime | null",
		"OnCreate": "number"
	}[]
	```
### Post
- `/api/p2p/sell`
	* Add P2P sell store
	* body
	```json
	{
		"userId": "number",
		"cryptoId": "number",
		"priceRate": "number",
		"minQty": "number",
		"maxQty": "number"
	}
	```
	* return
	```json
	{
		"P2PSellId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"PriceRate": "number",
		"MinQTY": "number",
		"MaxQTY": "number",
		"OnCreate": "datetime"
	}
	```
- `/api/p2p/sell/order`
	- open sell order
	- body
	```json
	{
		"customerId": "number",
		"P2PSellId": "number",
		"qty": "number"
	}
	```
	- return
	```json
	{
		"P2PSellLogId": "number",
		"P2PSellId": "number",
		"CustomerId": "number",
		"QTY": "number",
		"SumPriec": "number",
		"Status": "number",
		"FeedbackScore": "number | null",
		"OnFinish": "datetime | null",
		"OnCreate": "number"
	}
	```
### Put
- `/api/p2p/sell/id/:id`
	* Update P2P sell store by Id (can't change crypto)
	* body
	```json
	{
		"priceRate": "number",
		"minQty": "number",
		"maxQty": "number"
	}
	```
	* body detail
		* priceRate: optional
		* minQty: optional
		* maxQty: optional
	* return
	```json
	{
		"P2PSellId": "number",
		"UserId": "number",
		"CryptoId": "number",
		"PriceRate": "number",
		"MinQTY": "number",
		"MaxQTY": "number",
		"OnCreate": "datetime"
	}
	```
- `/api/p2p/sell/order/id/:id`
	- Update to success order by Id
	- body
	```json
	{
		"feedbackScore": "number"
	}
	```
	- return
	```json
	{
		"P2PSellLogId": "number",
		"P2PSellId": "number",
		"CustomerId": "number",
		"QTY": "number",
		"SumPriec": "number",
		"Status": "number",
		"FeedbackScore": "number | null",
		"OnFinish": "datetime | null",
		"OnCreate": "number"
	}
	```
### Delete
- `/api/p2p/sell/id/:id`
	* Delete by Id
	* return
	```json
	{
		"message": "deleted P2PSellId :id",
		"P2PSell": {
			"P2PSellId": "number",
			"UserId": "number",
			"CryptoId": "number",
			"PriceRate": "number",
			"MinQTY": "number",
			"MaxQTY": "number",
			"OnCreate": "datetime"
		}
		
	}
	```
