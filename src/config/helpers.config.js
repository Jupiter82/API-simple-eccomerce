const randomString = (len = 100) => {
    const chars = "-_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = chars.length;
    let random = "";
    for (let i = 0; i < len; i++) {
        const posn = Math.ceil((Math.random()*(length-1)));
        random += chars[posn]
    }
    return random;
}

module.exports = {
    randomString
}