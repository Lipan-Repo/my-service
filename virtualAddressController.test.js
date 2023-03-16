const { db} = require('../../src/utils/dbUtil')
const app = require('../../loanservice')
const request = require('supertest')
const { beforeAllFN, afterAllFN } = require('../helpers/helpers')
const virtualadressdetail=require('../../src/utils/dbUtil')
describe('testcases for customerRouteConfig', () => {
    beforeAllFN(db)
    it('/va/:customerId', async () => {

        let response = await request(app).get(`/loan-service/api/v1/va/109518`)
        expect(response.body).toEqual(expect.arrayContaining([]))
        expect(response.statusCode).toBe(200)
        let len=response.body.length
        
        for(let i=0;i<len;i++){
            expect(response.body[i]).toHaveProperty('id')
            expect(response.body[i]).toHaveProperty('customerId')
            expect(response.body[i]).toHaveProperty('isActive')
            expect(response.body[i]).toHaveProperty('createdAt')
            expect(response.body[i]).toHaveProperty('updatedAt')
            
        }
        

    },7000)
    it('/va', async () => {
        let data = {
            "customerId": 109518,
            "va": "807652793@yesb"
        }
        let response = await request(app).post('/loan-service/api/v1/va')
            .send(data)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('status')
        expect(response.body.status).toEqual('success')
    })
    it('will check with database of /va',async()=>{
        
        let response = await request(app).get(`/loan-service/api/v1/va/109518`)
        
        const virtualadressdetai=await virtualadressdetail.VirtualAddressDetails.findOne({where:{customerId:109518}}) 
       
        let len=response.body.length
        
        for(let i=0;i<len;i++){
            expect(response.body[i].id).toEqual(virtualadressdetai.dataValues.id)
            expect(response.body[i].customerId).toEqual(virtualadressdetai.dataValues.customerId)
            expect(response.body[i].va).toEqual(virtualadressdetai.dataValues.va)
            expect(response.body[i].isActive).toEqual(virtualadressdetai.dataValues.isActive)
            expect(response.body[i].createdAt).toEqual(virtualadressdetai.dataValues.createdAt)
            expect(response.body[i].updatedAt).toEqual(virtualadressdetai.dataValues.updatedAt)
        }
        
    })
    
  
    afterAllFN(db)
})