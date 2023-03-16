const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const CustomerCreditProfile=require('../../src/utils/dbUtil')
const iconv=require('iconv-lite')
str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/creditProfile', async () => {
        let data = {
            approvedAmount: '10000',
            processingFee: '100',
            maxTenure: '1000',
            customerId: '300712',
            riskLevel: "ok",
            lmsClientId: '1',
            isActive: true,
            maxCashLimit: '10000',
            availableMaxCashLimit: '1009',
            l1Status: "Accepted",
            l2Status: "Accepted",
            annualInterestRate: '10',
            availableCreditLimit: '10000',
            dtiCap: '0',
            existingBureauEmi: '0',
            monthlyIncome: 10000
        }
        let response = await request(app).post('/loan-service/api/v1/creditProfile')
            .send(data)
        expect(response.statusCode).toBe(201)
        expect(response.body.status).toEqual('success')
        expect(response.body.message).toBe("Customer Credit Profile created successfully")
    },15000)
    it('/getCustomerCreditProfile/:customerId', async () => {
        let response = await request(app).get('/loan-service/api/v1/getCustomerCreditProfile/300712')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("customerId")
        expect(response.body).toHaveProperty("approvedAmount")
        expect(response.body).toHaveProperty("processingFee")
        expect(response.body).toHaveProperty("maxTenure")
        expect(response.body).toHaveProperty("riskLevel")
        expect(response.body).toHaveProperty("maxCashLimit")
        expect(response.body).toHaveProperty("availableMaxCashLimit")
        expect(response.body).toHaveProperty("availableCreditLimit")
        expect(response.body).toHaveProperty("lmsClientId")
        expect(response.body).toHaveProperty("productId")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("advanceAmount")
        expect(response.body).toHaveProperty("annualInterestRate")
        expect(response.body).toHaveProperty("dtiCap")
        expect(response.body).toHaveProperty("existingBureauEmi")
        expect(response.body).toHaveProperty("monthlyIncome")
        expect(response.body).toHaveProperty("autoPayEnabled")
        expect(response.body).toHaveProperty("l1Status")
        expect(response.body).toHaveProperty("l2Status")
        expect(response.body).toHaveProperty("onlineTransactionLimit")
        expect(response.body).toHaveProperty("offlineTransactionLimit")
        expect(response.body).toHaveProperty("offlineTransactionEnabled")
        expect(response.body).toHaveProperty("isContactlessTransactionEnabled")
        expect(response.body).toHaveProperty("isFirstTimeCashTransferDone")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("penalInterest")
        expect(response.body).toHaveProperty("delayPaymentCharges")
        const{delayPaymentCharges}=response.body
        const length=delayPaymentCharges.length
        for(let i=0;i<length;i++){
            expect(response.body.delayPaymentCharges[i]).toHaveProperty("minValue")
            expect(response.body.delayPaymentCharges[i]).toHaveProperty("maxValue")
            expect(response.body.delayPaymentCharges[i]).toHaveProperty("amount")
        }
        
        expect(response.statusCode).toBe(200)

        
    },15000)
    it('will check response with database',async()=>{
        let response = await request(app).get('/loan-service/api/v1/getCustomerCreditProfile/300712')
        const customerCreditProfile = await CustomerCreditProfile.CustomerCreditProfile.findOne({where:{customerId:300712}})
        expect(response.body.customerId).toEqual(customerCreditProfile.dataValues.customerId)
        expect(response.body.approvedAmount).toEqual(customerCreditProfile.dataValues.approvedAmount)
        expect(response.body.processingFee).toEqual(customerCreditProfile.dataValues.processingFee)
        expect(response.body.maxTenure).toEqual(customerCreditProfile.dataValues.maxTenure)
        expect(response.body.riskLevel).toEqual(customerCreditProfile.dataValues.riskLevel)
        expect(response.body.maxCashLimit).toEqual(customerCreditProfile.dataValues.maxCashLimit)
        expect(response.body.availableMaxCashLimit).toEqual(customerCreditProfile.dataValues.availableMaxCashLimit)
        expect(response.body.availableCreditLimit).toEqual(customerCreditProfile.dataValues.availableCreditLimit)
        expect(response.body.lmsClientId).toEqual(customerCreditProfile.dataValues.lmsClientId)
        expect(response.body.productId).toEqual(customerCreditProfile.dataValues.productId)
        expect(response.body.isActive).toEqual(customerCreditProfile.dataValues.isActive)
        expect(response.body.advanceAmount).toEqual(customerCreditProfile.dataValues.advanceAmount)
        expect(response.body.annualInterestRate).toEqual(customerCreditProfile.dataValues.annualInterestRate)
        expect(response.body.dtiCap).toEqual(customerCreditProfile.dataValues.dtiCap)
        expect(response.body.existingBureauEmi).toEqual(customerCreditProfile.dataValues.existingBureauEmi)
        expect(response.body.monthlyIncome).toEqual(customerCreditProfile.dataValues.monthlyIncome)
        expect(response.body.autoPayEnabled).toEqual(customerCreditProfile.dataValues.autoPayEnabled)
        expect(response.body.l1Status).toEqual(customerCreditProfile.dataValues.l1Status)
        expect(response.body.l2Status).toEqual(customerCreditProfile.dataValues.l2Status)
        expect(response.body.onlineTransactionLimit).toEqual(customerCreditProfile.dataValues.onlineTransactionLimit)
        expect(response.body.onlineTransactionEnabled).toEqual(customerCreditProfile.dataValues.onlineTransactionEnabled)
        expect(response.body.offlineTransactionLimit).toEqual(customerCreditProfile.dataValues.offlineTransactionLimit)
        expect(response.body.offlineTransactionEnabled).toEqual(customerCreditProfile.dataValues.offlineTransactionEnabled)
        expect(response.body.isContactlessTransactionEnabled).toEqual(customerCreditProfile.dataValues.isContactlessTransactionEnabled)
        expect(response.body.isFirstTimeCashTransferDone).toEqual(customerCreditProfile.dataValues.isFirstTimeCashTransferDone)
        expect(JSON.stringify(response.body.createdAt)).toEqual(JSON.stringify(customerCreditProfile.dataValues.createdAt))
        expect(JSON.stringify(response.body.updatedAt)).toEqual(JSON.stringify(customerCreditProfile.dataValues.updatedAt))
        const length=customerCreditProfile.length
        for(let i=0;i<length;i++){
            expect(response.body.delayPaymentCharges[i].minValue).toEqual(customerCreditProfile.dataValues.minValue)
            expect(response.body.delayPaymentCharges[i].maxValue).toEqual(customerCreditProfile.dataValues.maxValue)
            expect(response.body.delayPaymentCharges[i].amount).toEqual(customerCreditProfile.dataValues.amount)
        }
    },15000)
    afterAllFN(db)
})