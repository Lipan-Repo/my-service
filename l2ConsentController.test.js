const { db, BankDetails, L2ConsentDetails } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
describe('testcases for customerRouteConfig', () => {
    beforeAllFN(db)
    it('/l2/consent/:customerId', async () => {
        let data = {
            "customerId": 300655,
            "newLimit": 123584,
            "consent": "yes"
        }
        let response = await request(app).post('/loan-service/api/v1/l2/consent')
            .send(data)
        expect(response.body.status).toBe('success')
        expect(response.statusCode).toBe(200)
        const userid = await L2ConsentDetails.findOne({ where: { customerId: 300655 } })
        //console.log(userid);
        expect(data.customerId).toBe(userid.dataValues.customerId)
        expect(data.newLimit).toBe(userid.dataValues.newLimit)
        expect(data.consent).toBe(userid.dataValues.consent)
        console.log(response.body);

    })
   
    afterAllFN(db)
})
