import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000/',
    video: false
  },
  env: {
    CHIEF_ID: 'uuu-bbb',
    EMPLOYEE_ID: 'uuu-aaa',
  },
});
