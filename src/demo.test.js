import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.locator('#home').getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Finance Hub' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('div:nth-child(4) > .border.text-card-foreground > .p-6.flex.items-center > a > .inline-flex').click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Apply Here' }).click();
  await page1.locator('div:nth-child(3) > .all-scheme-details > .schme-btn-apply > a > button').click();
  await page1.locator('div:nth-child(3) > .all-scheme-details > .schme-btn-apply > a > button').click();
  await page1.locator('div:nth-child(5) > .all-scheme-details > .schme-btn-apply > a > button').click();
  await page1.goto('https://amdcf.udyamimitra.in/AMDCFLogin/AMDCFRegistration');
  await page1.getByLabel('Scheme Name *').selectOption('6');
});