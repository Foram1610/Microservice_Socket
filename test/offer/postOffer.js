const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjYxNTkyNDI0ODR9.Hb0he3KrlfSKKus2chaTekbAWdOmvqFulLqZa9Zlhxg';

describe('POST /addOffer', () => {

    it('should add Offer', (done) => {
        
        request(app)
        .post('/api/v1/admin/offer/addOffer')
        .set('token', token)
        .send({
            
            countryId:"6101126a1c6d2f0cf8100244",
            userId:"60e6dee30e1b368710b735db",
            serviceProvider:"NewServiceProvider",
            status:"Cancelled",
            reason:"newReason",
            offers:{
                    offerName: "newOffer",
               offerCreatedBy:"SUPERADMIN", 
               offerImage:"https://alistadocuments.s3.us-east-2.amazonaws.com/1626267975417Contract-Address-0xd4e392f650a46c94e2ea808360f7826d88eb517e-BscScan%20%282%29.png", 
               offerCreatedOn:"15 JUL,2021 2:16 PM"
            },
            offerProvided:{
                offerApplyArea:"installation",
                offer:"choose 3 servvices get 1 free service"
                },
            offerPeriod:{
               offerMode:{ 
                offerType:"Repeat monthly",
                from:"15 JUL 2021",
                to:"15 AUG 2021"
                },
                offerRepeat:{
                    offerRepeatType:"Monthly",
                     weekday:"Tuesday",
                      order:"First",
                       from:"10:00 AM",
                        to:"12:00 PM"
                }
            },
            location:{
                otherLocation:"pakistan",
                offerTermAndCondition:"test terms dummy terms"
            },
            name:"newName"
        })
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('data');
            expect(body.data).to.be.an('object');
            expect(body.data).to.contain.property('offerPeriod');
            expect(body.data.offerPeriod).to.be.an('object');
            expect(body.data.offerPeriod).to.contain.property('offerMode');
            expect(body.data.offerPeriod.offerMode).to.be.an('object');
            expect(body.data.offerPeriod).to.contain.property('offerRepeat');
            expect(body.data.offerPeriod.offerRepeat).to.be.an('object');
            expect(body.data).to.contain.property('status');
            expect(body.data).to.contain.property('_id');
            expect(body.data).to.contain.property('userId');
            expect(body.data).to.contain.property('serviceProvider');
            expect(body.data).to.contain.property('reason');
            expect(body.data).to.contain.property('offers');
            expect(body.data.offers).to.be.an('object');
            expect(body.data).to.contain.property('offerProvided');
            expect(body.data.offerProvided).to.be.an('object');
            expect(body.data).to.contain.property('location');
            expect(body.data.location).to.be.an('object');
            expect(body.data).to.contain.property('createdAt');

            done();
        })
        .catch(err => done(err))
    })
})