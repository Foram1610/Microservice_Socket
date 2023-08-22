module.exports = function (socket) {

    socket.on('driversocket', async (data,acknowledgement) => { // NOSONAR
        try {
            // console.log('acknowledgement',typeof acknowledgement)
            const User = require('../models/userTable');
            const Driver = require('../models/drivertable');
            const Load = require('../models/loadTable');
            var data = JSON.stringify(data); // NOSONAR
            var data = JSON.parse(data); // NOSONAR
            console.log('acknowledgement data',data)

            socket.type = "driver";
            data.socketId = socket.id;

            data.loadId = data.loadId; // NOSONAR

            if (data.angle == undefined || data.angle == '' || data.angle == null) {
                data.angle = 0;
            }

            if (data.driverId != undefined && data.driverId != '' && data.driverId != null && data.driverLocation != undefined && data.angle != undefined) {

                data.driverLocation = { type: "Point", coordinates: [data.driverLocation.lng, data.driverLocation.lat] };

                Driver.addDriverSocket(data, async(err, verifydata) => {
                    if (err) {
                        console.log("Driver socket error");
                    } else {
                        var tripRequestSocketDataC = { // NOSONAR
                            success: false,
                            loadId:data.loadId,
                            tripStatus:null,
                            customerStatus:null,
                            driverLocation:data.driverLocation,
                            angle:0,
                            message:'Something went wrong!.'
                        }

                        if (data.loadId) {
                            var customerId = '';
                            var loadDetails = {};
                            data.loadId = verifydata.currentTripId;
                            try{
                                if (data.loadId) {
                                    loadDetails =  await Load.getLoadsByIdAsync(data.loadId);
                                    customerId = loadDetails.customerId
                                }
                                // console.log('loadDetails',loadDetails)
                            }catch(error){
                                console.log('load error ',error)

                                tripRequestSocketDataC.message = "Load id does not exist.";
                                return acknowledgement(tripRequestSocketData);
                            }

                            var tripStatus = loadDetails.tripStatus;
                            if (tripStatus == 'inroute' || tripStatus == 'picked' || tripStatus == 'job started') {

                                var tripRequestSocketData = {
                                    success: true,
                                    loadId: data.loadId,
                                    tripStatus: tripStatus,
                                    driverStatus:verifydata.driverStatus,
                                    driverLocation: data.driverLocation,
                                    angle: data.angle,
                                    message:''
                                }

                                User.getSocketDetails(customerId, (err, customerSocketData) => { // NOSONAR
                                    if (err || customerSocketData === null) {
                                        console.log("error",err);
                                        return acknowledgement(tripRequestSocketData);
                                    } else {
                                        if (customerSocketData.socketStatus == "yes") {
                                            var tripRequestSocketDataC = { // NOSONAR
                                                success: true,
                                                loadId:data.loadId,
                                                tripStatus:loadDetails.tripStatus,
                                                customerStatus:customerSocketData.customerStatus,
                                                driverLocation: data.driverLocation,
                                                angle: data.angle,
                                                message:''
                                            }

                                            helper.emitCustomerSocket(customerSocketData.socketId,tripRequestSocketDataC);
                                        }
                                    }
                                });

                                return acknowledgement(tripRequestSocketData);

                            }else {
                                tripRequestSocketDataC.message = 'Driver is not in route';

                                return acknowledgement(tripRequestSocketDataC);
                            }
                        }else{
                            Driver.addDriverSocket(data, async(err, verifydata) => { // NOSONAR
                                if (err) {
                                    console.log("Driver socket error");
                                } else {
                                    var tripRequestSocketData = { // NOSONAR
                                        success:true,
                                        loadId:data.loadId,
                                        tripStatus:null,
                                        driverStatus:verifydata.driverStatus,
                                        driverLocation:data.driverLocation,
                                        angle:data.angle,
                                        message:'Driver location updated!.'
                                    }

                                    acknowledgement(tripRequestSocketData);
                                }
                            })
                        }
                    }
                });
            } else {
                var tripRequestSocketDataC = {
                    success:false,
                    loadId:data.loadId,
                    tripStatus:null,
                    customerStatus:null,
                    driverLocation:null,
                    angle:0,
                    message:'Some params are missing!.'
                }

                return acknowledgement(tripRequestSocketDataC);
            }
        }catch (err) {
            var tripRequestSocketDataC = { // NOSONAR
                success:false,
                loadId:data.loadId,
                tripStatus:null,
                customerStatus:null,
                driverLocation:null,
                angle:0,
                message:'Some params are missing!.'
            }
            console.log("driversocket err", err);
            return acknowledgement(tripRequestSocketDataC);
        }
    });


};
