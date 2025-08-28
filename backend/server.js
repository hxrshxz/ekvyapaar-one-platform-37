// server.js
import express from 'express';
import runAutomation from './spreadsheetTest.spec.js';
const app = express();
const port = 3000;


app.get('/run-automation', async (req, res) => {
  try {
    await runAutomation();  // call the test logic
    res.send('Automation started! Check your browser.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error running Playwright automation');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
