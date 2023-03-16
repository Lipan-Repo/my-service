const { db} = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/billGeneration/:customerId', async () => {

        let response = await request(app).post('/loan-service/api/v1/billGeneration/300712')
        expect(response.statusCode).toBe(201)
        expect(response.body.status).toEqual('success')
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('Customer Statement Generation Data stored Successfully')
        
    })
    afterAllFN(db)
})