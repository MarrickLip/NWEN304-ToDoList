module.exports.errorHandling = (handler) => {
    return (req, res) => {
        try {
            handler(req, res);
        } catch (e) {
            console.warn('Handled error', e);
            res.sendStatus(500);
        }
    }
};

module.exports.cors = (handler) => {
    return (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        handler(req, res);
    }
};