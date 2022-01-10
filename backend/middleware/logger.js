const logger = (req, res, next) => {
    // console.log(`Endpoint hit:\t${req.url}\t${req.method}`);
    console.log("Endpoint hit:\t"+req.url+"\t "+req.method);
    // console.log(req.url);

    next();
};

module.exports = logger;