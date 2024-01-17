import express from 'express';
const app = express();
const port = 3000;
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use('/', async (req, res, next) => {
    res.send('Hello World');
})
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});