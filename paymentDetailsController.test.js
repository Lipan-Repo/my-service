const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')

describe('check the api request of loanroute', () => {
    beforeAllFN(db)
        // it('/paymentDetails internal server err',async()=>{
        //     let data={
        //         "customerId": "300249",
        //         "consentId": "453733",
        //         "instrId": "01062020FT1",
        //         "secondaryIdentification": "453733"
        //     }
        //     let response=await request(app).post('/loan-service/api/v1/paymentDetails')
        //     .send(data)   
        // })
    it('customer  id is not provided in /paymentDetails', async () => {
        let data = {
            
            "consentId": "453733",
            "instrId": "01062020FT1",
            "secondaryIdentification": "453733"
        }
        let response = await request(app).post('/loan-service/api/v1/paymentDetails')
            .send(data)
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe('customerId not provided.')
            expect(response.body.status).toBe('failed')
    })

    afterAllFN(db)
})