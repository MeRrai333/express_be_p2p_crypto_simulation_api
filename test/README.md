# Path detail

## User
### Get
- `/api/user`
	* get all user
```json
{
	"UserId": number,
	"UserName": string,
	"Email": string,
	"OnCreate": datetime
}[]
```
- `/api/user/id/:id`
	* get user by :id
```json
{
	"UserId": number,
	"UserName": string,
	"Email": string,
	"OnCreate": datetime
}
```
- `/api/user/id/:id/payments`
	* get user by :id with P2P payments
```json
{
	"UserId": number,
	"UserName": string,
	"Email": string,
	"OnCreate": datetime
	"P2PPayments": {
		"P2PPaymentId": number,
		"PaymentFirstName": string,
		"PaymentLastName": string,
		"PaymentInfo": string,
		"UserId": number,
		"PaymentTypeId": number,
		"OnCreate": datetime,
		"PaymentType": {
			"PaymentTypeId": number,
			"Name": string,
			"OnCreate": datetime
		}[]
	}[]
}
```
