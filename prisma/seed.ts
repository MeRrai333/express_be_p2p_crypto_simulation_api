import { cryptos, p2p_buys, p2p_payments, p2p_sells, payment_types, PrismaClient, protocols, users } from '@prisma/client'
import {SALT} from '../src/models/userModel'
const bcrypt = require('bcrypt');

const db = new PrismaClient()

const userList: Omit<users&{
    P2PPayments: (Omit<p2p_payments, 'P2PPaymentId'|'PaymentTypeId'|'OnCreate'|'UserId'>|undefined)[],
    cryptoQTY: number[],
    p2pbuy: (Omit<p2p_buys, 'P2PBuyId'|'OnCreate'|'CryptoId'|'UserId'>|undefined)[],
    p2psell: (Omit<p2p_sells, 'P2PSellId'|'OnCreate'|'CryptoId'|'UserId'>|undefined)[],
}, 'UserId'|'OnCreate'>[] = [
    {
        UserName: "User1",
        Email: "user1@mail.com",
        Password: bcrypt.hashSync('password1', SALT),
        P2PPayments: [
            {
                PaymentFirstName: "User1",
                PaymentLastName: "Last1",
                PaymentInfo: "Mr.USer1 Last1, 1234567890ABC"
            },
            undefined,
            {
                PaymentFirstName: "User1",
                PaymentLastName: "Last1",
                PaymentInfo: "Mr.USer1 Last1, 09x-xxxxxxx"
            },
        ],
        cryptoQTY: [
            0, 1000, 12.5, 0
        ],
        p2pbuy: [
            undefined,
            {
                PriceRate: 1450,
                MinQTY: 0.5,
                MaxQTY: 100
            },
            undefined,
            undefined
        ],
        p2psell: [
            undefined,
            {
                PriceRate: 1510,
                MinQTY: 0.1,
                MaxQTY: 10
            },
            undefined,
            {
                PriceRate: 0.15,
                MinQTY: 100,
                MaxQTY: 10000
            }
        ]
    },
    {
        UserName: "User2",
        Email: "user2@mail.com",
        Password: bcrypt.hashSync('password2', SALT),
        P2PPayments: [
            undefined,
            {
                PaymentFirstName: "User2",
                PaymentLastName: "Last2",
                PaymentInfo: "SCB, Mr.USer2 Last2, 123-4567-890"
            },
            undefined
        ],
        cryptoQTY: [
            1230.5, 0, 0, 0
        ],
        p2pbuy: [
            {
                PriceRate: 76950,
                MinQTY: 0.0001,
                MaxQTY: 1
            },
            undefined,
            {
                PriceRate: 1.75,
                MinQTY: 10,
                MaxQTY: 1000
            },
            undefined
        ],
        p2psell: [
            undefined,undefined, undefined, undefined
        ]
    },
    {
        UserName: "User3",
        Email: "user3@mail.com",
        Password: bcrypt.hashSync('password3', SALT),
        P2PPayments: [undefined, undefined, undefined, undefined],
        cryptoQTY: [
            0, 0, 0, 0
        ],
        p2pbuy: [undefined, undefined, undefined, 
            {
                PriceRate: 0.143,
                MinQTY: 100,
                MaxQTY: 5000
            }
        ],
        p2psell: [
            undefined,undefined, undefined, undefined
        ]
    },
    {
        UserName: "User4",
        Email: "user4@mail.com",
        Password: bcrypt.hashSync('password4', SALT),
        P2PPayments: [
            {
                PaymentFirstName: "User4",
                PaymentLastName: "Last4",
                PaymentInfo: "Mr.USer4 Last4, 1234567890ABC"
            },
            undefined, undefined, undefined
        ],
        cryptoQTY: [
            1, 23.4, 503, 2540
        ],
        p2pbuy: [
            undefined, undefined, undefined,
            {
                PriceRate: 0.140,
                MinQTY: 100,
                MaxQTY: 10000
            }
        ],
        p2psell: [
            undefined, undefined, undefined,
            {
                PriceRate: 0.151,
                MinQTY: 100,
                MaxQTY: 10000
            }
        ]
    },
    {
        UserName: "User5",
        Email: "user5@mail.com",
        Password: bcrypt.hashSync('password5', SALT),
        P2PPayments: [
            undefined, undefined,
            {
                PaymentFirstName: "User5",
                PaymentLastName: "Last5",
                PaymentInfo: "Mr.USer5 Last5, 09z-zzzzzzz"
            },
        ],
        cryptoQTY: [
            1000, 500, 200, 800
        ],
        p2pbuy: [
            {
                PriceRate: 76980,
                MinQTY: 0.005,
                MaxQTY: 2
            },
            {
                PriceRate: 1460,
                MinQTY: 0.1,
                MaxQTY: 10
            },
            {
                PriceRate: 1.7,
                MinQTY: 10,
                MaxQTY: 1000
            },
            undefined
        ],
        p2psell: [undefined, undefined, undefined, undefined]
    },
]

const cryptoList: Omit<cryptos, 'CryptoId'|'OnCreate'>[] = [
    {
        FullName: "BITCOIN",
        ShortName: "BTC",
        CurrentPrice: 77000
    },
    {
        FullName: "Ethereum",
        ShortName: "ETH",
        CurrentPrice: 1500
    },
    {
        FullName: "XRP",
        ShortName: "XRP",
        CurrentPrice: 1.83
    },
    {
        FullName: "Dogecoin",
        ShortName: "DOGE",
        CurrentPrice: 0.147
    }
]

const protocolList: Omit<protocols, 'ProtocolId'|'OnCreate'>[] = [
    {
        FullName: "TRON Protocol",
        ShortName: "TRX"
    },
    {
        FullName: "Binance Smart Chain Protocol",
        ShortName: "BSC"
    }
]

const paymentTypeList: Omit<payment_types, 'PaymentTypeId'|'OnCreate'>[] = [
    {
        Name: "Bank transfer"
    },
    {
        Name: "Paypal"
    },
    {
        Name: "True money wallet"
    },
]

async function main() {
    if(1){
        await db.$queryRaw`SET FOREIGN_KEY_CHECKS = 0;`;
        await db.$queryRaw`TRUNCATE cryptos;`;
        await db.$queryRaw`TRUNCATE p2p_buys;`;
        await db.$queryRaw`TRUNCATE p2p_buy_logs;`;
        await db.$queryRaw`TRUNCATE p2p_payments;`;
        await db.$queryRaw`TRUNCATE p2p_sells;`;
        await db.$queryRaw`TRUNCATE p2p_sell_logs;`;
        await db.$queryRaw`TRUNCATE payment_types;`;
        await db.$queryRaw`TRUNCATE protocols;`;
        await db.$queryRaw`TRUNCATE users;`;
        await db.$queryRaw`TRUNCATE wallets;`;
        await db.$queryRaw`TRUNCATE wallet_logs;`;
        await db.$queryRaw`TRUNCATE _prisma_migrations;`;
        await db.$queryRaw`SET FOREIGN_KEY_CHECKS = 1`;
        console.log("Clear all table")
    }

    await db.cryptos.createMany({
        data: cryptoList
    })
    console.log("----- Created crypto data -----")
    await db.protocols.create({
        data: {
            ProtocolId: 1,
            FullName: "Peer-To-Peer",
            ShortName: "P2P"
        }
    })
    await db.protocols.createMany({
        data: protocolList
    })
    console.log("----- Created protocol data -----")
    await db.payment_types.createMany({
        data: paymentTypeList
    })
    console.log("----- Created payment type data -----")

    const cryptoAll = await db.cryptos.findMany()
    const paymentTypeAll = await db.payment_types.findMany()
    for(const u of userList){
        const {
            p2pbuy, p2psell, P2PPayments, cryptoQTY, ...user
        } = u;
        const userInsert = await db.users.create({
            data: user
        })
        for(const c in cryptoAll){
            await db.wallets.create({
                data: {
                    UserId: userInsert.UserId,
                    CryptoId: cryptoAll[c].CryptoId,
                    QTY: cryptoQTY[c]
                }
            })
            if(p2pbuy[c])
                await db.p2p_buys.create({
                    data: {
                        UserId: userInsert.UserId,
                        CryptoId: cryptoAll[c].CryptoId,
                        PriceRate: p2pbuy[c].PriceRate,
                        MinQTY: p2pbuy[c].MinQTY,
                        MaxQTY: p2pbuy[c].MaxQTY,
                    }
                })
            if(p2psell[c])
                await db.p2p_sells.create({
                    data: {
                        UserId: userInsert.UserId,
                        CryptoId: cryptoAll[c].CryptoId,
                        PriceRate: p2psell[c].PriceRate,
                        MinQTY: p2psell[c].MinQTY,
                        MaxQTY: p2psell[c].MaxQTY,
                    }
                })
        }
        for(const p in paymentTypeAll){
            if(P2PPayments[p] === undefined)
                continue
            await db.p2p_payments.create({
                data: {
                    UserId: userInsert.UserId,
                    PaymentTypeId: paymentTypeAll[p].PaymentTypeId,
                    PaymentFirstName: P2PPayments[p].PaymentFirstName,
                    PaymentLastName: P2PPayments[p].PaymentLastName,
                    PaymentInfo: P2PPayments[p].PaymentInfo,
                }
            })
        }
    }
    console.log("----- Created user with wallet, p2p buy, p2p sell, p2p payment -----")
}


main()
    .then(async () => {
        console.log("----- Success seeding -----")
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
    })