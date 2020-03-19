const Message = require('../../../models/Message');

const getAllMessages = (req, res) => {
    console.log(req.query);
    if (req.query.user) {
        Message.findOne({ user: req.query.user })
            .then(messageFound => {
                if (!messageFound) {
                    res.json({
                        "status": "error",
                        "message": "Could not find message"
                    });
                }
                if (messageFound) {
                    return res.json(messageFound);
                }
            })
    }
    else {
        Message.find({}, (err, messages) => {
            if (err) {
                res.json({
                    "status": "error",
                    "message": "Could not show messages"
                });
            }
            if (!err) {
                res.json(messages);
            }
        });
    }
}

const getMessageById = (req, res) => {
    Message.findById(req.params.id)
        .then(messageFound => {
            if (!messageFound) {
                res.json({
                    "status": "error",
                    "message": "Could not find message"
                });
            }
            if (messageFound) {
                return res.json(messageFound);
            }
        })
}

const createMessage = (req, res) => {
    if(!req.body.message){
        res.json({
            message:"Please provide request body to create message"
        });
    }
    let message = new Message();
    message.text = req.body.message.text;
    message.user = req.body.message.user;

    message.save((err, doc) => {
        if (err) {
            res.json({
                status: "error",
                message: "Could not save the message"
            });
        }
        if (!err) {
            res.json({
                "status": "succes",
                "data": {
                    "message": doc
                }
            });
        }
    });
}

const removeMessage = (req, res) => {
    Message.findByIdAndRemove(req.params.id).then(messageFound => {
        if (!messageFound) {
            res.json({
                "status": "error",
                "message": "Could not find message"
            })
        }
        if (messageFound) {
            res.json({
                "status": "succes",
                "message": "removed message"
            })
        }
    });
}

const updateMessage = (req, res) => {
    Message.findById(req.params.id, (err, doc) => {
        if (err) {
            res.json({
                "result": "error",
                "message": "can not update message"
            });
        }
        if (!err) {
            if(!req.body.message){
                res.json({
                    message:"Please provide request body to update message"
                });
            }
            doc.text = req.body.message.text;
            doc.user = req.body.message.user;
            doc.save((err, doc) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: "Could not save the message"
                    });
                }
                if (!err) {
                    res.json({
                        "status": "succes",
                        "data": {
                            "message": doc
                        }
                    });
                }

            });
        }
    });
}


module.exports.getAllMessages = getAllMessages;

module.exports.getMessageById = getMessageById;

module.exports.createMessage = createMessage;

module.exports.removeMessage = removeMessage;

module.exports.updateMessage = updateMessage;

