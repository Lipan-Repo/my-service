const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')

describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/cash/transfer/rating', async () => {
        let data = {
            customerId: 300712,
            rating: "6",
            comments: "good"
        }
        let response = await request(app).post('/loan-service/api/v1/cash/transfer/rating')
            .send(data)
        expect(response.statusCode).toBe(201)
        expect(response.body.status).toBe('success')
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toHaveProperty('id')
        expect(response.body.message).toHaveProperty('customerId')
        expect(response.body.message).toHaveProperty('comments')
        expect(response.body.message).toHaveProperty('rating')
        expect(response.body.message).toHaveProperty('updatedAt')
        expect(response.body.message).toHaveProperty('createdAt')
    })
    //customer id not given
    it("customerId not provided with statuscode 400",async()=>{
        let data = {
            
            rating: "6",
            comments: "good"
        }
        let response = await request(app).post('/loan-service/api/v1/cash/transfer/rating')
            .send(data)
        expect(response.body.message).toEqual("customerId is not provided")
        expect(response.body.status).toBe('failed')
        expect(response.statusCode).toBe(400)
    })
    //rating not given
    it("rating not provided with statuscode 400",async()=>{
        let data = {
            customerId: 300712,
            
            comments: "good"
        }
        let response = await request(app).post('/loan-service/api/v1/cash/transfer/rating')
            .send(data)
        expect(response.body.message).toEqual("rating is not provided")
        expect(response.body.status).toBe('failed')
        expect(response.statusCode).toBe(400)
    })
//comments not given
    it("comments not provided with statuscode 400",async()=>{
        let data = {
    
            customerId: 300712,
            rating: "6",
            
        }
        let response = await request(app).post('/loan-service/api/v1/cash/transfer/rating')
            .send(data)
        expect(response.body.message).toEqual("comments is not provided")
        expect(response.body.status).toBe('failed')
        expect(response.statusCode).toBe(400)
        expect(response.badRequest).toBeTruthy()
        expect(response.error).toBeTruthy();
    })
    afterAllFN(db)
})