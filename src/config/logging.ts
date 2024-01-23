const morgan = require("morgan");

export const setupLogging = (app: any) => {
    app.use(morgan('combined'));
}
