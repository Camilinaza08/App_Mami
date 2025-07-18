function logger(req,res,next){
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        const now = new Date();
        const fechaHora = now.toISOString();

        const log = `[${fechaHora}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`

        console.log(log)
    })

    next();
}

export default logger