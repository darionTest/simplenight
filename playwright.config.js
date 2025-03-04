import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'], // Usa la configuración predeterminada de Chrome
        headless: true,
        baseURL: 'http://app.simplenight.com',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        viewport: { width: 1920, height: 1080 },  // Establece la resolución de la ventana
      },
    },
  ],
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});
