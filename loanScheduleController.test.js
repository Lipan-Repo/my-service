const { db} = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')

describe('testcases for loanRouteConfig err', () => {
    beforeAllFN(db)
      it('/loanSchedule intenal server err', async () => {
        let data = {
            customerId: 300712,
            principalAmount: 100000,
            isInsurance: false,
            tenure: 10
        }
        let response = await request(app).post('/loan-service/api/v1/loanSchedule')
            .send(data)
        
        expect(response.statusCode).toBe(500)
       expect(response.body.message).toBe("Cannot calculate EMI")
    })
      it(' customer id is not provided with status code 400 in  /loanSchedule', async () => {
        let data = {
           
            principalAmount: 100000,
            isInsurance: false,
            tenure: 10
        }
        let response = await request(app).post('/loan-service/api/v1/loanSchedule')
            .send(data)
        
        expect(response.statusCode).toBe(400)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toBe('customerId not provided.')
        
    })
    it('principal amount is not provided with status code 400 in /loanSchedule ', async () => {
        let data = {
            
            customerId: 300712,
            isInsurance: false,
            tenure: 10
        }
        let response = await request(app).post('/loan-service/api/v1/loanSchedule')
            .send(data)
        
        expect(response.statusCode).toBe(400)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toBe('principalAmount not provided.')
        
    })
    it('/loanSchedule principal amount is not provided with status code 400', async () => {
        let data = {
            customerId: 300712,
            principalAmount: 100000,
            isInsurance: false,
            
        }
        let response = await request(app).post('/loan-service/api/v1/loanSchedule')
            .send(data)
        
        expect(response.statusCode).toBe(400)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toBe('tenure not provided.')
        
    })
    afterAllFN(db)
})