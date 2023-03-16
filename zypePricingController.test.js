const db=require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const zypepricing=require('../../src/utils/dbUtil')
const iconv=require('iconv-lite')
str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
buf = iconv.encode("Sample input string", 'win1251');

describe('check the api request of loanroute', () => {
    beforeAllFN(db)
    it('/zypePricingDetails', async () => {
        let response = await request(app).get('/loan-service/api/v1/zypePricingDetails')
         expect(response.body.status).toEqual('success')
        expect(response.statusCode).toBe(200)
        let length=response.body.message.length
        for(let i=0;i<length;i++){
            expect(response.body.message[i]).toHaveProperty('id')
            expect(response.body.message[i]).toHaveProperty('type')
            expect(response.body.message[i]).toHaveProperty('values')
            expect(response.body.message[i]).toHaveProperty('description')
        }
        
    })
    it('will check with database /zypePricingDetails',async()=>{
        let response = await request(app).get('/loan-service/api/v1/zypePricingDetails')
        const pricingdetails=await db.ZypePricing.findAll()
        
        
        
        for(let i=0;i<pricingdetails.length;i++){
            
            expect(response.body.message[i].id).toEqual(pricingdetails[i].dataValues.id)
            expect(response.body.message[i].type).toEqual(pricingdetails[i].dataValues.type)
            expect(response.body.message[i].values).toEqual(pricingdetails[i].dataValues.values)
            expect(response.body.message[i].description).toEqual(pricingdetails[i].dataValues.description)
          
        }
    })
    afterAllFN(db)
})