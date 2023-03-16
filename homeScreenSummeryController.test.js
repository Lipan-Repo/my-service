const { db} = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const {CustomerCreditProfile}=require('../../src/utils/dbUtil')
describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/homeScreen/:customerId', async () => {
        let response = await request(app).get('/loan-service/api/v1/homeScreen/300712')
        expect(response.body).toHaveProperty('filePath')
         expect(response.body).toHaveProperty('paymentDueDate')
         expect(response.body).toHaveProperty('statementSummaryDetails')
         expect(response.body).toHaveProperty('penalty')
         expect(response.body).toHaveProperty('AvailableLimit')
         expect(response.body).toHaveProperty('ApprovedAmount')
        expect(response.statusCode).toBe(200)
        
    })
    it('will check with database /homeScreen/:customerId',async()=>{
        let response = await request(app).get('/loan-service/api/v1/homeScreen/300712')
        const availableLimit = await CustomerCreditProfile.findOne({ where: { customerId: 300712} })
        expect(response.body.AvailableLimit).toEqual(availableLimit.dataValues.availableMaxCashLimit)
        expect(response.body.ApprovedAmount).toEqual(availableLimit.dataValues.approvedAmount)
    })
    afterAllFN(db)
})
