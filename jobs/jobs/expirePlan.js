
const helper = require('../../helper/helper');
module.exports = function(agenda) {
    agenda.define('expireSubscription', async function(job, done) {
        var driverId = job.attrs.data.driverId
        console.log('driverId',driverId)
    });
};