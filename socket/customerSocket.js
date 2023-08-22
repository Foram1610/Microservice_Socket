const User = require('../models/userTable');
const Driver = require('../models/drivertable');

module.exports = function (socket) {

    socket.on('customersocket', (socketData,acknowledgement) => {
        try {
            // console.log('acknowledgement',typeof acknowledgement)
            var stringfiedData = JSON.stringify(socketData);
            var data = JSON.parse(stringfiedData);
            // console.log('data customer socket',data)
            data.socketId = socket.id;
            socket.type = "customer";

            if (data.customerId != undefined && data.customerId != '' && data.customerId != null) {
                User.addCustomerSocket(data, (err, verifydata) => {
                    if (err) {
                        console.log("customer socket error",err);
                        var tripRequestSocketDataErr = {
                            success: false,
                            customerId: verifydata._id,
                            loadId:'',
                            customerStatus: null
                        }
                        acknowledgement(tripRequestSocketDataErr);

                    } else {

                        var tripRequestSocketData = {
                            success: true,
                            customerId:verifydata._id,
                            loadId:'',
                            customerStatus:verifydata.customerStatus
                        }

                        return acknowledgement(tripRequestSocketData);
                    }
                });
            }
        }catch (err) {
            console.log('error',err)
        }
    });

};