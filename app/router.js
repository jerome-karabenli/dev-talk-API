const rootRouter = require('express').Router()
const {verifyAccessToken, isAdmin} = require('./services/authJwt')
const dataValidator = require("./services/dataValidator")
const redis = require("./services/cache")

const {
    userRoutes, 
    subjectRoutes, 
    commentRoutes,
    adminRoutes, 
    authRoutes
} = require('./routes')


rootRouter.use(dataValidator)

rootRouter.use(authRoutes)

rootRouter.use(verifyAccessToken)


rootRouter.use([userRoutes, subjectRoutes, commentRoutes])

rootRouter.use(isAdmin, adminRoutes)


module.exports = rootRouter