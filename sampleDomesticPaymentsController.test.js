const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const bankdetails=require('../../src/utils/dbUtil')
const iconv=require('iconv-lite')
str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/sampleDomesticPayments 208 Already Reported', async () => {
        let data = {
            "customerId": "300712",
            "bankName": "ICICI Bank",
            "bankAccountNo": "005701564040",
            "ifscCode": "ICIC0000057",
            "bankCode": "ICIC"
        }
        let response = await request(app).post('/loan-service/api/v1/sampleDomesticPayments')
            .send(data)
            // .set('authorization', `Bearer ${authToken}`)
        expect(response.statusCode).toBe(208)
        expect(response.body.status).toBe('success')
        expect(typeof response.body.data).toEqual('object')
        expect(response.body.data).toHaveProperty("bankDetails")
        expect(response.body.data.bankDetails).toHaveProperty('id')
        expect(response.body.data.bankDetails).toHaveProperty('customerId')
        expect(response.body.data.bankDetails).toHaveProperty('bankName')
        expect(response.body.data.bankDetails).toHaveProperty('bankAccountNo')
        expect(response.body.data.bankDetails).toHaveProperty('ifscCode')
        expect(response.body.data.bankDetails).toHaveProperty('beneficiaryName')
        expect(response.body.data.bankDetails).toHaveProperty('bankId')
        expect(response.body.data.bankDetails).toHaveProperty('accountType')
        expect(response.body.data.bankDetails).toHaveProperty('createdAt')
        expect(response.body.data.bankDetails).toHaveProperty('updatedAt')
    })
    it('customer id is not provided in /sampleDomesticPayments',async()=>{
        let data = {
            
            "bankName": "ICICI Bank",
            "bankAccountNo": "005701564040",
            "ifscCode": "ICIC0000057",
            "bankCode": "ICIC"
        }
        let response = await request(app).post('/loan-service/api/v1/sampleDomesticPayments')
            .send(data)
        expect(response.body.message).toBe('customerId not provided.')
        expect(response.body.status).toBe('failed')
        expect(response.statusCode).toBe(400)
    })
    it('bankname is not provided in /sampleDomesticPayments',async()=>{
        let data = {
            "customerId": "300712",
           
            "bankAccountNo": "005701564040",
            "ifscCode": "ICIC0000057",
            "bankCode": "ICIC"
        }
        let response = await request(app).post('/loan-service/api/v1/sampleDomesticPayments')
            .send(data)
        expect(response.body.message).toBe('bankName not provided.')
        expect(response.body.status).toBe('failed')
        expect(response.statusCode).toBe(400)
    })
    it('bankaccount no is not provided in /sampleDomesticPayments',async()=>{
        let data = {
            "customerId": "300712",
            "bankName": "ICICI Bank",
            
            "ifscCode": "ICIC0000057",
            "bankCode": "ICIC"
        }
        let response = await request(app).post('/loan-service/api/v1/sampleDomesticPayments')
            .send(data)
        expect(response.body.message).toBe('bankAccountNo not provided.')
        expect(response.body.status).toBe('failed')
        expect(response.statusCode).toBe(400)
    })
    it('ifsccode  is not provided in /sampleDomesticPayments',async()=>{
        let data = {
            "customerId": "300712",
            "bankName": "ICICI Bank",
            "bankAccountNo": "005701564040",
            
            "bankCode": "ICIC"
        }
        let response = await request(app).post('/loan-service/api/v1/sampleDomesticPayments')
            .send(data)
        expect(response.body.message).toBe('ifsc not provided.')
        expect(response.body.status).toBe('failed')
        expect(response.statusCode).toBe(400)
    })
    it('bankcode is not provided in /sampleDomesticPayments',async()=>{
        let data = {
            "customerId": "300712",
            "bankName": "ICICI Bank",
            "bankAccountNo": "005701564040",
            "ifscCode": "ICIC0000057",
            
        }
        let response = await request(app).post('/loan-service/api/v1/sampleDomesticPayments')
            .send(data)
        expect(response.body.message).toBe('Bank code not provided.')
        expect(response.body.status).toBe('failed')
        expect(response.statusCode).toBe(400)
        
    })
    it('will check with databse in /sampleDomesticPayments',async()=>{
        let data = {
            "customerId": "300712",
            "bankName": "ICICI Bank",
            "bankAccountNo": "005701564040",
            "ifscCode": "ICIC0000057",
            "bankCode": "ICIC"
        }
        let response = await request(app).post('/loan-service/api/v1/sampleDomesticPayments')
            .send(data)
            const existingCustomerBankDetails = await bankdetails.BankDetails.findOne({ where: { customerId:300712,bankName:"ICICI Bank"} })
            console.log(existingCustomerBankDetails);
            expect(response.body.data.bankDetails.id).toBe(existingCustomerBankDetails.dataValues.id)
            expect(response.body.data.bankDetails.customerId).toBe(existingCustomerBankDetails.dataValues.customerId)
            expect(response.body.data.bankDetails.bankName).toBe(existingCustomerBankDetails.dataValues.bankName)
            expect(response.body.data.bankDetails.bankAccountNo).toBe(existingCustomerBankDetails.dataValues.bankAccountNo)
            expect(response.body.data.bankDetails.ifscCode).toBe(existingCustomerBankDetails.dataValues.ifscCode)
            expect(response.body.data.bankDetails.beneficiaryName).toBe(existingCustomerBankDetails.dataValues.beneficiaryName)
            expect(response.body.data.bankDetails.bankId).toBe(existingCustomerBankDetails.dataValues.bankId)
            expect(response.body.data.bankDetails.accountType).toBe(existingCustomerBankDetails.dataValues.accountType)
            expect(JSON.stringify(response.body.data.bankDetails.createdAt)).toBe(JSON.stringify(existingCustomerBankDetails.dataValues.createdAt))
            expect(JSON.stringify(response.body.data.bankDetails.updatedAt)).toBe(JSON.stringify(existingCustomerBankDetails.dataValues.updatedAt))

    })
    afterAllFN(db)
})