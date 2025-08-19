import { chromium } from 'playwright';


(async () => {
  const browserContext = await chromium.launchPersistentContext('/home/hxrshxz/my-profile', {
    headless: false,
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled']
  });

  const page = await browserContext.newPage();
  await page.goto('https://docs.google.com/spreadsheets/d/11iCDIDAAY6oIGtubiRterWlYrauxMFhbgc0cwpg9egI/edit?usp=sharingt');
})();
