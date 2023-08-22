const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjYxNTkyNDI0ODR9.Hb0he3KrlfSKKus2chaTekbAWdOmvqFulLqZa9Zlhxg';

describe('GET /getOffers', () => {

    it('should get array of offers', (done) => {
        
        request(app)
        .get('/api/v1/admin/offer/getOffers')
        .set('token', token)
        // request(app)
        // .get('/hello')
        .send()
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('data');
            expect(body.data).to.be.an('array');
            body.data.map((item) => {
                expect(item).to.contain.property('offers');
                expect(item.offers).to.be.an('object');
                expect(item.offers).to.contain.property('offerImage');
                expect(item.offers).to.contain.property('offerName');
                expect(item.offers).to.contain.property('offerCreatedBy');
                expect(item.offers).to.contain.property('offerCreatedOn');
                expect(item).to.contain.property('offerProvided');
                expect(item.offerProvided).to.be.an('object');
                expect(item.offerProvided).to.contain.property('offerApplyArea');
                expect(item.offerProvided).to.contain.property('offer');
                expect(item).to.contain.property('offerPeriod');
                expect(item.offerPeriod).to.be.an('object');
                expect(item.offerPeriod).to.contain.property('offerMode');
                expect(item.offerPeriod.offerMode).to.be.an('object');
                expect(item.offerPeriod.offerMode).to.contain.property('offerType');
                expect(item.offerPeriod.offerMode).to.contain.property('from');
                expect(item.offerPeriod.offerMode).to.contain.property('to');
                expect(item.offerPeriod).to.contain.property('offerRepeat');
                expect(item.offerPeriod.offerRepeat).to.be.an('object');
                expect(item.offerPeriod.offerRepeat).to.contain.property('offerRepeatType');
                expect(item.offerPeriod.offerRepeat).to.contain.property('weekday');
                expect(item.offerPeriod.offerRepeat).to.contain.property('order');
                expect(item).to.contain.property('location');
                expect(item.location).to.be.an('object');
                expect(item.location).to.contain.property('otherLocation');
                expect(item.location).to.contain.property('offerTermAndCondition');
                expect(item).to.contain.property('status');
                expect(item).to.contain.property('_id');
                expect(item).to.contain.property('userId');
                expect(item).to.contain.property('createdAt');
                expect(item).to.contain.property('reason');
                expect(item).to.contain.property('serviceProvider');               

            })
            done();
        })
        .catch(err => done(err))
        
    })
})