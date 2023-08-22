const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjYxNTkyNDI0ODR9.Hb0he3KrlfSKKus2chaTekbAWdOmvqFulLqZa9Zlhxg';

describe('PATCH /updateStatus', () => {

    it('should update status', (done) => {
        
        request(app)
        .patch('/api/v1/admin/offer/updateStatus/60f013494a4e9e133c418f96')
        .set('token', token)
        .send({
            status:"Cancelled",
            reason:"new reject reason"
        })
        .then((res) => {
            const body = res.body;
            console.log(body)
            expect(body).to.contain.property('data');
                        expect(body.data).to.be.an('object');
                        expect(body.data).to.contain.property('offers');
                        expect(body.data.offers).to.be.an('object');
                        expect(body.data.offers).to.contain.property('offerImage');
                        expect(body.data.offers).to.contain.property('offerName');
                        expect(body.data.offers).to.contain.property('offerCreatedBy');
                        expect(body.data.offers).to.contain.property('offerCreatedOn');
                        expect(body.data).to.contain.property('offerProvided');
                        expect(body.data.offerProvided).to.be.an('object');
                        expect(body.data.offerProvided).to.contain.property('offerApplyArea');
                        expect(body.data.offerProvided).to.contain.property('offer');
                        expect(body.data).to.contain.property('offerPeriod');
                        expect(body.data.offerPeriod).to.be.an('object');
                        expect(body.data.offerPeriod).to.contain.property('offerMode');
                        expect(body.data.offerPeriod.offerMode).to.be.an('object');
                        expect(body.data.offerPeriod.offerMode).to.contain.property('offerType');
                        expect(body.data.offerPeriod.offerMode).to.contain.property('from');
                        expect(body.data.offerPeriod.offerMode).to.contain.property('to');
                        expect(body.data.offerPeriod).to.contain.property('offerRepeat');
                        expect(body.data.offerPeriod.offerRepeat).to.be.an('object');
                        expect(body.data.offerPeriod.offerRepeat).to.contain.property('offerRepeatType');
                        expect(body.data.offerPeriod.offerRepeat).to.contain.property('weekday');
                        expect(body.data.offerPeriod.offerRepeat).to.contain.property('order');
                        expect(body.data).to.contain.property('location');
                        expect(body.data.location).to.be.an('object');
                        expect(body.data.location).to.contain.property('otherLocation');
                        expect(body.data.location).to.contain.property('offerTermAndCondition');
                        expect(body.data).to.contain.property('status');
                        expect(body.data).to.contain.property('_id');
                        expect(body.data).to.contain.property('userId');
                        expect(body.data).to.contain.property('createdAt');
                        expect(body.data).to.contain.property('reason');
                        expect(body.data).to.contain.property('serviceProvider');               

            done();
        })
        .catch(err => done(err))
    })
})