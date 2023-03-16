const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const iconv = require('iconv-lite')
str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
describe('testcases for customerRouteConfig err', () => {
    beforeAllFN(db)
    //empty table
    it('/loanAgreementDetails/:customerId status 401', async () => {
        let response = await request(app).get(`/loan-service/api/v1/loanAgreementDetails/300712`)
        expect(response.statusCode).toBe(401)
        expect(response.body.status).toEqual('failed')
        expect(response.body.message).toBe('Cannot calculate EMI')
    })
    it('/loanAgreement/generate/:customerId status 401', async () => {
        let response = await request(app).post('/loan-service/api/v1/loanAgreement/generate/300712')
        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe('Cannot calculate EMI')


    })
    it('/loanAgreement/status/:customerId with status 404', async () => {
        let data = {
            "code": 212,
            "documentID": "18",
            "message": {
                "txn_id": "1",
                "message": "hello",
                "digio_doc_id": 2,
                "last_state": "23-02-2022"
            }
        }
        let response = await request(app).post('/loan-service/api/v1/loanAgreement/status/300712')
        .send(data)
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toEqual('failed')

    })
    afterAllFN(db)

})