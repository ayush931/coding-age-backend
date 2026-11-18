// this middleware used in all the routes to check, catch and handle the error in our own custom method

const errorMiddleware = async (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error"

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}

export default errorMiddleware;