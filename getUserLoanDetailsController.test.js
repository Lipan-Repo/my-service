const { db} = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const LoanTransactions=require('../../src/utils/dbUtil')
const iconv=require('iconv-lite')
str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/loanDetails/:customerId',async()=>{
        let response=await request(app).get('/loan-service/api/v1/loanDetails/10405')
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toEqual('success')
        expect(response.body.message).toHaveProperty('tenure')
        expect(response.body.message).toHaveProperty('minamount')
        
    })
    
    afterAllFN(db)
})