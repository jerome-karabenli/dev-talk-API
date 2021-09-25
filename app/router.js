const rootRouter = require('express').Router()
const {verifyToken, isAdmin} = require('./services/authJwt')
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

rootRouter.use(verifyToken, redis)


rootRouter.all("/admin/*", isAdmin)

rootRouter.use([userRoutes, subjectRoutes, commentRoutes, adminRoutes])






module.exports = rootRouter