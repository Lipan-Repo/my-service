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
    
    //fetches from yesbank service

   
        // it('/adhocStatementInquiry', async () => {
        //     let data = {
        //         requesterID:"1",
        //         serviceName,
        //         reqRefNum:"10",
        //         reqRefTimeStamp:"10-10-2001",
        //         serviceVersionNo,
        //         customerId,
        //         codAcctNo:"1000104",
        //         txnStartDate,
        //         txnEndDate
        //     }
        //     let response = await request(app).post('/loan-service/api/v1/adhocStatementInquiry')
        //         .send(data)
        //     console.log(response.body);
        // })
    
})