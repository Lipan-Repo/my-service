const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const bankdetails = require('../../src/utils/dbUtil')
const bankList = require('../../src/models/bankList')
describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/customerBankDetails/:customerId', async () => {
        let response = await request(app).get('/loan-service/api/v1/customerBankDetails/300712')
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('success')




    })
    it('will check the bankdetails from database', async () => {
        let response = await request(app).get('/loan-service/api/v1/customerBankDetails/300712')
        const banks = await bankdetails.BankDetails.findOne({ where: { customerId: 300712 } })
        let length = banks.length;
        for (let i = 0; i < length; i++) {

            expect(response.body.message[i].customerId).toEqual(banks[i].dataValues.customerId)
            expect(response.body.message[i].beneficiaryName).toEqual(banks[i].dataValues.beneficiaryName)
            expect(response.body.message[i].bankName).toEqual(banks[i].dataValues.bankName)
            expect(response.body.message[i].bankAccountNo).toEqual(banks[i].dataValues.bankAccountNo)
            expect(response.body.message[i].ifscCode).toEqual(banks[i].dataValues.ifscCode)

        }


    })
    afterAllFN(db)

})