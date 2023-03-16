const { db} = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const WalletDetails=require('../../src/utils/dbUtil')
describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/wallet/types', async () => {
        let response = await request(app).get('/loan-service/api/v1/wallet/types')
        
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toEqual('success')
        expect(response.body.message).toEqual("Wallet types has been  stored")
        
    })
    it('/wallet/details', async () => {

        let response = await request(app).get('/loan-service/api/v1/wallet/details/?customerId=300011&walletTypeId=1062')
        expect(response.statusCode).toBe(201)
        
        expect(response.body.data).toHaveProperty('id')
        expect(response.body.data).toHaveProperty('customerId')
        expect(response.body.data).toHaveProperty('walletTypeId')
        expect(response.body.data).toHaveProperty('walletBalance')
        expect(response.body.data).toHaveProperty('walletLastCredit')
        expect(response.body.data).toHaveProperty('walletLastDebit')
        expect(response.body.data).toHaveProperty('lastBalanceUpdated')
        expect(response.body.data.responseBody).toHaveProperty('success')
        expect(response.body.data.responseBody).toHaveProperty('response_code')
        expect(response.body.data.responseBody).toHaveProperty('entity')
        expect(response.body.data.responseBody).toHaveProperty('wallet_type_id')
        expect(response.body.data.responseBody).toHaveProperty('last_balance_updated')
        expect(response.body.data.responseBody).toHaveProperty('ext_user_id')
        expect(response.body.data.responseBody).toHaveProperty('last_credit')
        expect(response.body.data.responseBody).toHaveProperty('last_debit')
        expect(response.body.data).toHaveProperty('createdAt')
        expect(response.body.data).toHaveProperty('updatedAt')
    })
    it('customer  id is not provided in /wallet/details with status code 500',async()=>{
       
        let response = await request(app).get('/loan-service/api/v1/wallet/details/?walletTypeId=1062')
        expect(response.statusCode).toBe(500)
        expect(response.body.message).toBe('customerId not provided.')
        
    })
    it('walletTypeId is not provided in /wallet/details with statuscode 500',async()=>{
       
        let response = await request(app).get('/loan-service/api/v1/wallet/details/?customerId=300011')
        expect(response.statusCode).toBe(500)
        
        expect(response.body.message).toBe('walletTypeId not provided.')
        
        
    })
    it('will compare with database /wallet/details',async()=>{
        let response = await request(app).get('/loan-service/api/v1/wallet/details/?customerId=300011&walletTypeId=1062')
        const walletdetail=await WalletDetails.WalletDetails.findOne({where:{customerId:300011}})
        console.log(walletdetail);
        expect(response.body.data.id).toEqual(walletdetail.dataValues.id)
        expect(JSON.parse(response.body.data.customerId)).toEqual((walletdetail.dataValues.customerId))
        expect(JSON.parse(response.body.data.walletTypeId)).toEqual(walletdetail.dataValues.walletTypeId)
        expect(response.body.data.walletBalance).toEqual(walletdetail.dataValues.walletBalance)
        expect(response.body.data.walletLastCredit).toEqual(walletdetail.dataValues.walletLastCredit)
        expect(response.body.data.walletLastDebit).toEqual(walletdetail.dataValues.walletLastDebit)
        expect(response.body.data.lastBalanceUpdated).toEqual(walletdetail.dataValues.lastBalanceUpdated)
        expect(response.body.data.responseBody.entity).toEqual(walletdetail.dataValues.responseBody.entity)
        expect(response.body.data.responseBody.balance).toEqual(walletdetail.dataValues.responseBody.balance)
        expect(response.body.data.responseBody.success).toEqual(walletdetail.dataValues.responseBody.success)
        expect(response.body.data.responseBody.last_debit).toEqual(walletdetail.dataValues.responseBody.last_debit)
        expect(response.body.data.responseBody.ext_user_id).toEqual(walletdetail.dataValues.responseBody.ext_user_id)
        expect(response.body.data.responseBody.last_credit).toEqual(walletdetail.dataValues.responseBody.last_credit)
        expect(response.body.data.responseBody.response_code).toEqual(walletdetail.dataValues.responseBody.response_code)
        expect(response.body.data.responseBody.wallet_type_id).toEqual(walletdetail.dataValues.responseBody.wallet_type_id)
        expect(response.body.data.responseBody.last_balance_updated).toEqual(walletdetail.dataValues.responseBody.last_balance_updated)
        expect(JSON.stringify(response.body.data.createdAt)).toEqual(JSON.stringify(walletdetail.dataValues.createdAt))
        
    })
    afterAllFN(db)
})