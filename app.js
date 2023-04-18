import express from 'express';

const app = express();
app.use(express.json());

// Global Error Handler
app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke');
});

app.listen(1001, () => {
      console.log('Server is running on port: 1001');
});
