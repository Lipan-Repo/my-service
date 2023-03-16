const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
describe('substract of two numbers', () => {
    beforeAllFN(db)
    it('will test the substraction', () => {
        expect(3 - 1).toBe(2)
    })
    afterAllFN(db)
})
//describe('check the api request of loanroute', () => {
    
    //     // it('/seedData Error occurred while generating data', 500',async()=>{
//     //     let response=await request(app).get('/loan-service/api/v1/seedData')
//     //     console.log(response.body);
//     // })
    
//})