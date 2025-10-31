export function errorHandler(error, request, response, next){
    console.log(error)

    const statusCode = error.statusCode || 500
    const message = error.message || "internal server error"

    response.status(statusCode).json({
        sucess: false,
        statusCode,
        message
    })
}