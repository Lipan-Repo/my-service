const { db} = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const iconv=require('iconv-lite')
str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
buf = iconv.encode("Sample input string", 'win1251');

describe('check the api request of loanroute', () => {
    //fetches from third party url canot create finflux token
    it('/lms/insurance-price with status code 400', async () => {
        let response = await request(app).get('/loan-service/api/v1/lms/insurance-price')
        // expect(response.body.data).toEqual(expect.objectContaining({ "name": "Insurance" }))
        expect(response.statusCode).toBe(201)
        expect(response.body.status).toEqual('success')
        expect(response.body.data).toHaveProperty('id')
        expect(response.body.data).toHaveProperty('name')
        expect(response.body.data).toHaveProperty('active')
        expect(response.body.data).toHaveProperty('amount')
        expect(response.body.data.active).toBeTruthy()
    },12000)
    
})