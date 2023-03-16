const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const CustomerCreditProfile=require('../../src/utils/dbUtil')
describe('it will test the dashboard route', () => {
    beforeAllFN(db)
    it(`/dashboard/:{customerId} `, async () => {
        let response = await request(app).get('/loan-service/api/v1/dashboard/109204')
        expect(response.statusCode).toBe(200)
        expect(typeof response.body).toBe('object');
        expect(response.body).toHaveProperty('customerCreditProfileResponse')
        expect(response.body).toHaveProperty('loanDetails')
        expect(response.body).toHaveProperty('todayDate')
        //const customerCreditProfile = await CustomerCreditProfile.CustomerCreditProfile.findAll({where:{customerId:109204}})
    })

    it('/dashboard/tenure', async () => {
        let data = {
            customerId: 300707,
            tenure: 10
        }
        let response = await request(app).post("/loan-service/api/v1/dashboard/tenure")

            .send(data)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body.status).toBe('success')
    })
   //not able to get request params from aws
    it("/transactions internal server err",async()=>{
      let response=await request(app).get('/loan-service/api/v1/transactions/?customerId=300712&limit=1000&startDate="10-10-2001')
      
    expect(response.statusCode).toBe(500)
    expect(response.body.status).toEqual('failed')


    },9000)
    afterAllFN(db)
})