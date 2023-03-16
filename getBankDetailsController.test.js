const { db, BankDetails} = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const bankDetails=require('../../src/models/bankDetails')
const iconv=require('iconv-lite')
str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
buf = iconv.encode("Sample input string", 'win1251');

describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    const authToken = '0TRj_ta2mhgAdWXBlH2Ar6hqv18VN90oGwZUuv8DU2'
    it('/getBankDetailsById ', async () => {
        let data = {
            customerId: 110389,
            bankDetailsId: 1491
        }
        let response = await request(app).post('/loan-service/api/v1/getBankDetailsById')
            .send(data)
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('bankDetails')
        expect(response.body.bankDetails).toHaveProperty('id')
        expect(response.body.bankDetails).toHaveProperty('customerId')
        expect(response.body.bankDetails).toHaveProperty('bankName')
        expect(response.body.bankDetails).toHaveProperty('bankAccountNo')
        expect(response.body.bankDetails).toHaveProperty('ifscCode')
        expect(response.body.bankDetails).toHaveProperty('beneficiaryName')
        expect(response.body.bankDetails).toHaveProperty('bankId')
        expect(response.body.bankDetails).toHaveProperty('beneficiaryName')
        expect(response.body.bankDetails).toHaveProperty('accountType')
        expect(response.body.bankDetails).toHaveProperty('createdAt')
        expect(response.body.bankDetails).toHaveProperty('updatedAt')
        
        
    })
    it('will compare with database /getBankDetailsById ',async()=>{
        let data = {
            customerId: 110389,
            bankDetailsId: 1491
        }
        let response = await request(app).post('/loan-service/api/v1/getBankDetailsById')
            .send(data)
        const userid = await BankDetails.findOne({ where: { customerId: 110389 } })
        console.log(userid);
        expect(response.body.bankDetails.id).toEqual(userid.dataValues.id)
        expect(response.body.bankDetails.customerId).toEqual(userid.dataValues.customerId)
        expect(response.body.bankDetails.bankName).toEqual(userid.dataValues.bankName)
        expect(response.body.bankDetails.bankAccountNo).toEqual(userid.dataValues.bankAccountNo)
        expect(response.body.bankDetails.ifscCode).toEqual(userid.dataValues.ifscCode)
        expect(response.body.bankDetails.beneficiaryName).toEqual(userid.dataValues.beneficiaryName)
        expect(response.body.bankDetails.bankId).toEqual(userid.dataValues.bankId)
        expect(response.body.bankDetails.accountType).toEqual(userid.dataValues.accountType)
        expect(JSON.stringify(response.body.bankDetails.createdAt)).toEqual(JSON.stringify(userid.dataValues.createdAt))
        expect(JSON.stringify(response.body.bankDetails.updatedAt)).toEqual(JSON.stringify(userid.dataValues.updatedAt))
    })
    it('customer id is not provided',async()=>{
        let data = {
            
            bankDetailsId: 1491
        }
        let response = await request(app).post('/loan-service/api/v1/getBankDetailsById')
            .send(data)
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe('customerId not provided.')
    })
    it('bankDetailsId is not provided',async()=>{
        let data = {
            customerId: 110389  
            
        }
        let response = await request(app).post('/loan-service/api/v1/getBankDetailsById')
            .send(data)
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe('bank Details Id not provided.')
    })
    afterAllFN(db)
})