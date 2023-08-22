module.exports = function (http, app) {

    const io = require('socket.io')(http);
    const redisAdapter = require('socket.io-redis');
    io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
    app.set('socketio', io);

    const User = require('../models/userTable');
    const Driver = require('../models/drivertable');
    const Chat = require('../models/chatTable');
    const Message = require('../models/chatHistory');

    //all socket listent request
    io.on('connection', function (socket) {
        // console.log('socket connected',socket)

        require('./customerSocket')(socket);
        require('./driverSocket')(socket);

        socket.on("sendMessage", function (data) {
            data = JSON.stringify(data);
            data = JSON.parse(data);
            console.log("sendMessage From: ",data);
            Chat.addChat(data, async (err, chatdata) => {
                if (err || chatdata == null) {
                    console.log("addChat err", err);
                } else {

                    var messageData = {
                        msg: data.msg,
                        customerId: chatdata.customerId,
                        driverId: chatdata.driverId,
                        chatId: chatdata._id,
                        byCustomer: data.byCustomer,
                        byCarrier: data.byCarrier
                    }

                    var userDetails = await User.getUserByIdAsync(chatdata.customerId);
                    // console.log('userDetails',userDetails)
                    var driverDetails = await Driver.getDriverByIdAsync(chatdata.driverId);
                   
                    if (data.byCustomer) {
                        User.addCustomerSocket({socketId:socket.id}, function(error,respp){
                            if (error) {
                                console.log('someting went wrong',error);
                            }else{
                               
                                if (driverDetails.socketStatus == "yes") {
                                    console.log("newMessage carrier Socket hit");
                                  
                                    helper.emitChatSocket(driverDetails.socketId, messageData);
                                    helper.emitChatSocket(respp.socketId, messageData);
                                   
                                } else {
                                    helper.emitChatSocket(respp.socketId, messageData);
                                    if (driverDetails.firebaseToken != null) {
                                        if (driverDetails.firebaseToken != undefined && driverDetails.firebaseToken != '' && driverDetails.firebaseToken != null && driverDetails.firebaseToken != "none") {
                                            var title = __("NEW_MESSAGE_RECEIVED");
                                            var body = __("NEW_MESSAGE_RECEIVED_FROM",userDetails.name);
                                            var registrationToken = driverDetails.firebaseToken;
                                            var payloadData = {
                                                "type":'chatMessage',
                                                "chatId":chatdata._id.toString(),
                                                "customerId":chatdata.customerId.toString()
                                            };

                                            helper.sendPushNotificationDriver(title, body,payloadData,registrationToken);
                                        }
                                    }

                                }
                            }
                        })
                    }else{
                        Driver.addDriverSocket({socketId:socket.id}, async (error, respp) => {
                            if (error) {
                                console.log('someting went wrong',error);
                                
                            }else{
                                
                                if (userDetails.socketStatus == "yes" ) {
                                    helper.emitChatSocket(userDetails.socketId, messageData);
                                    helper.emitChatSocket(respp.socketId, messageData);

                                } else {
                                    helper.emitChatSocket(respp.socketId, messageData);
                                    if (userDetails.firebaseToken != null) {
                                        if (userDetails.firebaseToken != undefined && userDetails.firebaseToken != '' && userDetails.firebaseToken != null && userDetails.firebaseToken != "none") {
                                            var title = __("NEW_MESSAGE_RECEIVED");
                                            var body = __("NEW_MESSAGE_RECEIVED_FROM",driverDetails.name);
                                            var registrationToken = userDetails.firebaseToken;
                                            var payloadData = {
                                                "type":'chatMessage',
                                                "chatId":chatdata._id.toString(),
                                                "driverId":chatdata.driverId.toString()
                                            };

                                            helper.sendPushNotificationCustomer(title, body,payloadData,registrationToken);
                                        }
                                    }

                                }
                            }
                        })
                    }


                    //chat history
                    Message.addMessage(messageData, (error, resdata) => {
                        if (error || resdata == null) {
                            console.log("resdata err", error);
                        } else {
                            console.log("resdata success", resdata);
                        }
                    });
                }
            })
        });

        socket.on('newMessage',function(data){
            console.log('data new message=======',data)
        })

        socket.on('disconnect', function (reason) {
            if (socket.type === "customer") {
                User.removeSocketCustomer(socket.id, (err, call) => {
                    if (err) {
                        console.log("customer socket error",err);
                    }
                })
            }

            if (socket.type === "driver") {
                try {
                    Driver.removeSocketDriver(socket.id, (err, call) => {
                        if (err) {
                            console.log("Driverd socket error",err);
                        }
                    })
                }catch (err) {
                    console.log('disconnect err',err)
                }
            }

            socket.disconnect();

        });
    });
}
