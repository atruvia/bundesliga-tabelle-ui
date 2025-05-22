import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByText('1', { exact: true }).click();
  await page.getByRole('cell', { name: 'Vereinswappen FC Bayern Mü' }).click();
  await page.locator('td:nth-child(3)').first().click();
  await page.getByRole('cell', { name: '25' }).first().click();
  await page.locator('td:nth-child(5)').first().click();
  await page.getByRole('cell', { name: '2', exact: true }).first().click();
  await page.getByRole('cell', { name: '99' }).click();
  await page.getByRole('cell', { name: '32' }).first().click();
  await page.getByRole('cell', { name: '67' }).first().click();
  await page.getByText('82', { exact: true }).click();
  await page.locator('td:nth-child(11)').first().click();
  await page.locator('.letzte-5 > img').first().click();
  await page.locator('img:nth-child(2)').first().click();
  await page.locator('img:nth-child(3)').first().click();
  await page.locator('img:nth-child(4)').first().click();
  await page.locator('img:nth-child(5)').first().click();
});
