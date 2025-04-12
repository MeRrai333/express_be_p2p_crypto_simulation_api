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
	* get user by :id
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
	* get user by :id with P2P payments
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
	* get user by :id with wallets
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
	* get user by :id with P2P Buys
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
	* get user by :id with P2P Buy logs
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
	* get user by :id with P2P Sells
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
	* get user by :id with P2P Sell logs
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
	* get user by :email
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
	* Update user data by :id
	* body
```json
{
	"username": "string",	// optional
	"email": "string",	// optional
	"password": "string",	// optional, require 'repassword'
	"repassword": "string"	// optional, require 'password'
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
### Delete
- `/api/user/id/:id`
	* Delete by :id
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
