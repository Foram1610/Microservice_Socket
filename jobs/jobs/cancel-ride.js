const helper = require('../../helper/helper');

module.exports = function(agenda) {
    agenda.define('cancelBooking', async function(job, done) {
        
        var loadId = job.attrs.data.loadId
        console.log('loadId',loadId)
    });
};