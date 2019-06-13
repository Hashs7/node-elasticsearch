exports.logError = (msg, statusCode, data = false) => {
    const error = new Error(msg);
    error.statusCode = statusCode;
    if(data) { error.data = data.array() }

    throw error;
}