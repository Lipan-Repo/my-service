const { db, BankDetails, L2ConsentDetails } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
describe('substract of two numbers', () => {
    it('will test the substraction', () => {
        expect(3 - 1).toBe(2)
    })
})
describe('check the api request of loanroute', () => {
    
    //database connection err line 145 of ctron jobs.service
    // it('/job',async()=>{
    //     let response=await request(app).get('/loan-service/api/v1/job')
    //     console.log(response.body);
    // })
    
})