const { db } = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const CustomerCreditProfile=require('../../src/utils/dbUtil')
const loanrepaymen=require('../../src/utils/dbUtil')
const iconv=require('iconv-lite')
str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
describe('check the api request of loanroute', () => {
    
    it('/loanTransactionLimits/:customerId', async () => {
        let response = await request(app).get('/loan-service/api/v1/loanTransactionLimits/300712')
            //.set('authorization', `Bearer ${authToken}`)
        //console.log(response.body)
        expect(response.statusCode).toBe(200)
        expect(typeof response.body).toBe('object')
        expect(response.body.message).toBeInstanceOf(Object)
        expect(response.body.message).toHaveProperty('customerId')
        expect(response.body.message).toHaveProperty('availableCreditLimit')
        expect(response.body.message).toHaveProperty('spentAmount')
        expect(response.body.message).toHaveProperty('totalAmount')
        expect(response.body.message).toHaveProperty('availableCash')
        expect(response.body.message).toHaveProperty('maxTenure')
        expect(response.body.message).toHaveProperty('isActive')
    },9000)
    it('/loanTransactionLimits/:customerId will compare with database',async()=>{
        let response = await request(app).get('/loan-service/api/v1/loanTransactionLimits/300712')
        const customerloandetails=await CustomerCreditProfile.CustomerCreditProfile.findOne({where:{customerId:300712}})
       
        expect(response.body.message.availableCreditLimit).toBe(customerloandetails.dataValues.availableCreditLimit)
        expect(response.body.message.spentAmount).toBe(customerloandetails.dataValues.approvedAmount-customerloandetails.dataValues.availableCreditLimit)
        expect(response.body.message.totalAmount).toBe(customerloandetails.dataValues.approvedAmount)
        expect(response.body.message.availableCash).toBe(customerloandetails.dataValues.availableMaxCashLimit)
        expect(response.body.message.maxTenure).toBe(customerloandetails.dataValues.maxTenure)
        expect(response.body.message.isActive).toBe(customerloandetails.dataValues.isActive)
    },9000)
    it('/repayment', async () => {
        let data = {
            "customerId": 300190,
            "amount": 10000,
            "orderId": 10
        }
        
        let response = await request(app).post('/loan-service/api/v1/repayment')
            .send(data)
        
        expect(response.body.message).toBeFalsy()
        expect(response.body.status).toBe("success")
        expect(response.statusCode).toBe(200)
        
    },18000)
    
    //unable to fetch data from yesbank service
//     it('/transactionStatus internal server err', async () => {
//         let data = {
//             txnId: 50,
//             customerRefId: 300712
//         }
//         let response = await request(app).post('/loan-service/api/v1/transactionStatus')
//             .send(data)
//         expect(response.statusCode).toBe(500)
//         expect(response.body.status).toEqual('failed')
//         expect(response.body.message).toEqual('error:0480006C:PEM routines::no start line')
//         //console.log(response.body);
//     })
//mobile no is not defined in database
// it('/loans/detail/create not customerId or  internal server err', async () => {
//         let data = {
//             customerId: "300002",
//             mobileNumber: "+919640284085",
//             approvedAmount: 10000,
//             processingFee: 200,
//             interest: 10,
//             tenure: 6
//         }
//         let response = await request(app).post('/loan-service/api/v1/loans/detail/create')
//             .send(data)
//         //console.log(response.body)
//         expect(response.statusCode).toBe(201)
//         expect(response.body.message).toBe("One of the attributes 'customerId' or  'mobileNumber' not provided ")

//     })
    it('customer id  is not provided in  /loans/detail/create',async()=>{
        let data = {
            
            mobileNumber: "+919640284085",
            approvedAmount: 10000,
            processingFee: 200,
            interest: 10,
            tenure: 6
        }
        
               let response = await request(app).post('/loan-service/api/v1/loans/detail/create')
            .send(data)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toBe('customerId not provided')
        expect(response.statusCode).toBe(201)
    },9000)
    it('mobile no not  is not provided in /loans/detail/create',async()=>{
        let data = {
            customerId: "300002",
            
            approvedAmount: 10000,
            processingFee: 200,
            interest: 10,
            tenure: 6
        }
        
          let response = await request(app).post('/loan-service/api/v1/loans/detail/create')
            .send(data)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toBe('mobileNumber not provided')
        expect(response.statusCode).toBe(201)
    },9000)
    it('customer id must be a string in /loans/detail/create',async()=>{
        let data = {
            customerId: 300002,
            mobileNumber: "+919640284085",
            approvedAmount: 10000,
            processingFee: 200,
            interest: 10,
            tenure: 6
        }
        
          let response = await request(app).post('/loan-service/api/v1/loans/detail/create')
            .send(data)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toBe('customerId must be a string ! ')
        expect(response.statusCode).toBe(201)
    },9000)
    
})