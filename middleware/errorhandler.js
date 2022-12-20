const errorhandler = (error, req, res, next) => {
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message:message, data:data})
};

module.exports = errorhandler;