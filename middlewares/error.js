class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    const msg=err.message || "Internal Server Error";
    const code=err.statusCode || 500;
    res.status(code).json({
        success: false,
        message: msg
    })
}

export default ErrorHandler;