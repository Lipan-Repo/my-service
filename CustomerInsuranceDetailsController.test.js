const { db} = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const {CustomerInsuranceDetails}=require('../../src/utils/dbUtil')
const iconv=require('iconv-lite')
str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
buf = iconv.encode("Sample input string", 'win1251');

describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/getInsuranceDetails/:customerId', async () => {
        let response = await request(app).get('/loan-service/api/v1/getInsuranceDetails/109780')
        expect(response.body.message).toHaveProperty('isInsurance')
        expect(response.body.message).toHaveProperty('insuranceAmount')
        expect(response.body.message).toHaveProperty('startDate')
        expect(response.body.message).toHaveProperty('endDate')
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toEqual('success')
        
    })
    it('will check response with database',async()=>{
        let response = await request(app).get('/loan-service/api/v1/getInsuranceDetails/109780')
        const customer = await CustomerInsuranceDetails.findOne({ where: { customerId:109780 } })
        expect(response.body.message.isInsurance).toEqual(customer.dataValues.isInsurance)
        expect(response.body.message.insuranceAmount).toEqual(customer.dataValues.insuranceAmount)
        expect(JSON.stringify(response.body.message.startDate)).toEqual(JSON.stringify(customer.dataValues.startDate))
        expect(JSON.stringify(response.body.message.endDate)).toEqual(JSON.stringify(customer.dataValues.endDate))
        
        
    })
    afterAllFN(db)
})