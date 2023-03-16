const { db} = require('../../src/utils/dbUtil')
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
    
     // it("/loanSettlement Table 'payment_service.razor_pay_payments' doesn't exist",async()=>{
    //     let data={
    //         customerId:300707
    //     }
    //     let response=await request(app).post('/loan-service/api/v1/loanSettlement')
    //     .send(data)
    //     console.log(response.body);
    // })
    
//})