const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
describe('substract of two numbers', () => {
    it('will test the substraction', () => {
        expect(3 - 1).toBe(2)
    })
})
describe('check the api request of loanroute', () => {
    
    //fetches from yesbank service

    //     it('/fundConfirmation internal server err"', async () => {
    //         let data = {
    //             "customerId": "300712",
    //             "consentId": "453733",
    //             "identification": "453733",
    //             "secondaryIdentification": "453733"
    //         }
    //         let response = await request(app).post('/loan-service/api/v1/fundConfirmation')
    //             .send(data)
    //             .set('authorization', `Bearer ${authToken}`)
    //         expect(response.statusCode).toBe(401)
    //         //console.log(response.body);
    //     })
    
})