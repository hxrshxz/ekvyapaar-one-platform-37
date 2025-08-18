import express from 'express';
import { chromium } from 'playwright';

const app = express();
const port = 3000;

// Allow browser to call this API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/run-automation', async (req, res) => {
  try {
    // Launch browser (non-headless for demo)
    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();

    // Run your flashy test steps
    await page.goto('http://localhost:8080/');

    // Add flashy CSS
    await page.addStyleTag({ content: `
      .flashy { outline: 4px solid red !important; animation: flash 0.5s infinite alternate; }
      @keyframes flash { from { box-shadow: 0 0 5px red; } to { box-shadow: 0 0 20px yellow; } }
    `});
    const flash = async (locator, action) => {
      await locator.evaluate(el => el.classList.add('flashy'));
      await page.waitForTimeout(800);
      await action();
      await page.waitForTimeout(400);
      await locator.evaluate(el => el.classList.remove('flashy'));
    };

    // Example test steps
    await flash(page.locator('#home').getByRole('button', { name: 'Login' }),
      async () => { await page.locator('#home').getByRole('button', { name: 'Login' }).click(); });

    await flash(page.getByRole('button', { name: 'Login' }),
      async () => { await page.getByRole('button', { name: 'Login' }).click(); });

    await flash(page.getByRole('link', { name: 'Finance Hub' }),
      async () => { await page.getByRole('link', { name: 'Finance Hub' }).click(); });

    // Close browser after some delay so user can watch
    setTimeout(() => browser.close(), 8000);

    res.send('Automation started! Check your browser.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error running Playwright automation');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
