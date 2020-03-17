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
    let message = new Message();
    message.text = req.body.text;
    message.user = req.body.user;

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
            doc.text = req.body.text;
            doc.user = req.body.user;
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

