const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbGlzdGEiLCJzdWIiOiI2MGU2ZGVlMzBlMWIzNjg3MTBiNzM1ZGIiLCJpYXQiOjE2MjYxNTkyNDI0ODR9.Hb0he3KrlfSKKus2chaTekbAWdOmvqFulLqZa9Zlhxg';

describe('DELETE /deleteOffer', () => {

    it('should delete task', (done) => {
        
        request(app)
        .delete('/api/v1/admin/offer/deleteOffer/6124c66ad8ffcb319803f7b3')
        .set('token', token)
        .send()
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('status');
            expect(body.status).to.equal('success');
            expect(body).to.contain.property('message');
            expect(body.message).to.equal('The offer has been deleted!');
            done();
        })
        .catch(err => done(err))
    })
})