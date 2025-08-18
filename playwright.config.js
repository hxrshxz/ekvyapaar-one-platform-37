import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
    launchOptions: {
      slowMo: 500,  // <-- slow down by 500ms per action
    },
  },
});
