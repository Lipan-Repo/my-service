const { db} = require('../../src/utils/dbUtil')
const request = require('supertest')
const app = require('../../loanservice')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const getReferralLink=require('../../src/utils/dbUtil')

describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/getReferralLink/:customerId', async () => {
        let response = await request(app).get('/loan-service/api/v1/getReferralLink/300712')
        expect(response.body.status).toEqual('success') 
        expect(response.statusCode).toBe(200)
        //expect(response.body).toEqual(expect.objectContaining({ status: "success" }))
        //expect(response.body.message).toEqual(expect.objectContaining({ customerId: 300712 }))
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toHaveProperty('customerId')
        expect(response.body.message).toHaveProperty('responseBody')
        expect(response.body.message.responseBody).toHaveProperty('entity')
        expect(response.body.message.responseBody).toHaveProperty('success')
        expect(response.body.message.responseBody).toHaveProperty('referral_link')
        expect(response.body.message.responseBody).toHaveProperty('response_code')
        expect(response.body.message).toHaveProperty('referralLink')
        expect(response.body.message).toHaveProperty('createdAt')
        expect(response.body.message).toHaveProperty('updatedAt')
       
        
    })
    it('will compare with database',async()=>{
        let response = await request(app).get('/loan-service/api/v1/getReferralLink/300712')
           const checkReferralCustomer = await getReferralLink.GetReferralLink.findOne({ where: { customerId:300712 } })
        console.log(checkReferralCustomer);
        expect(response.body.message.customerId).toEqual(checkReferralCustomer.dataValues.customerId)
        expect(response.body.message.responseBody).toEqual(checkReferralCustomer.dataValues.responseBody)
        expect(response.body.message.responseBody.entity).toEqual(checkReferralCustomer.dataValues.responseBody.entity)
        expect(response.body.message.responseBody.success).toEqual(checkReferralCustomer.dataValues.responseBody.success)
        expect(response.body.message.responseBody.referral_link).toEqual(checkReferralCustomer.dataValues.responseBody.referral_link)
        expect(response.body.message.responseBody.response_code).toEqual(checkReferralCustomer.dataValues.responseBody.response_code)
        expect(response.body.message.referralLink).toEqual(checkReferralCustomer.dataValues.referralLink)
        expect(JSON.stringify(response.body.message.createdAt)).toEqual(JSON.stringify(checkReferralCustomer.dataValues.createdAt))
        expect(JSON.stringify(response.body.message.updatedAt)).toEqual(JSON.stringify(checkReferralCustomer.dataValues.updatedAt))
    })
     afterAllFN(db)
})