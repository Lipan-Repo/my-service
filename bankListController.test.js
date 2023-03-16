const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const bankList = require('../../src/utils/dbUtil')
const { userEmiDates } = require('../../src/controllers/userEmiDatesController')
describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/bankList', async () => {
        let response = await request(app).get('/loan-service/api/v1/bankList')
        //.set('authorization', `Bearer 0TRj_ta2mhgAdWXBlH2Ar6hqv18VN90oGwZUuv8DU2H`);
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.error).toBeFalsy()
        expect(response.ok).toBeTruthy()
        expect(response.body.status).toEqual('success')
        expect(response.body).toHaveProperty('message')
        
        
        
        
    })
    it("banklist checking data in the databases", async () => {
        let response = await request(app).get('/loan-service/api/v1/bankList')
        const banks = await bankList.BankList.findAll()
        const len = banks.length
        for (let i = 0; i < len; i++) {
            expect(response.body.message[i].id).toEqual(banks[i].dataValues.id)
            expect(response.body.message[i].nameOfBank).toEqual(banks[i].dataValues.nameOfBank)
            expect(response.body.message[i].imgUrl).toEqual(banks[i].dataValues.imgUrl)
            
        }


    })
    afterAllFN(db)
})