// custom error class

// making the custom error method by inheriting the pre-built error class
class CodingAgeError extends Error {

    // error consists of 2 common things, statusCode and message
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)  // tracks the error and tells in which file and in which line the error exists
    }
}

export default CodingAgeError