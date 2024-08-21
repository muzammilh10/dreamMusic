const http = require('http')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./utils/global.middleware')

// const tourRouter = require('./routes/tours.routes')
// const userRouter = require('./routes/users.route')
// const reviewRouter = require('./routes/reviews.routes')
// const bookingRouter = require('./routes/booking.route') 
// const paymentRoute = require('./controllers/payment')

const playerRouter = require('./route/player.Router')
const userRoutes = require('./route/user')

const app = express()

const corsOption = {
    origin:true,
    Credentials:true
} 


// middleware
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser());

app.use("/api/user", userRoutes)
app.use('/api/playlist',playerRouter)



app.use(globalErrorHandler)


module.exports = app