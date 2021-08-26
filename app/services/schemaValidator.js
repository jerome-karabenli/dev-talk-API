module.exports = {
    validateBody: schema => (req, res, next) => {
        
        const {error, value} = schema.validate(req.body);
        if (error) return res.status(400).json({message: error.message});
        req.body = value
        next();
    },

    validateQuery: schema => (req, res, next) => {
        const {error, value} = schema.validate(req.query);
        if (error) return res.status(400).json({message: error.message});
        req.query = value
        next();
    },

    validateParams: schema => (req, res, next) => {
        const {error, value} = schema.validate(req.params);
        if (error) return res.status(400).json({message: error.message});
        req.params = value
        next();
    }
}