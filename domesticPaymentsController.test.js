const { db} = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')

describe('substract of two numbers', () => {
    it('will test the substraction', () => {
        expect(3 - 1).toBe(2)
    })
})
describe('check the api request of loanroute', () => {
    
    // it('/domesticPayments', async() => {
//     let data = {
//         "customerId": 300601,
//         "bankDetailsId": 1885,
//         "tenure": 3,
//         "amount": 24000,
//         "isInsurance": true
//     }
//     let response = await request(app).post('/loan-service/api/v1/domesticPayments')
//     .send(data)
//     expect(response.statusCode).toBe(201)
//     expect(response.body.status).toEqual('success')
//     expect(response.body.bankDetails.id).toEqual(1885)
//     expect(response.body).toHaveProperty('bankDetails')
// })
    
})