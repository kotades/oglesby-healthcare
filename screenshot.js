const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const page = await context.newPage();
  
  const routes = ['/', '/auth/login', '/dashboard'];
  
  for (const route of routes) {
    console.log(`Navigating to http://localhost:4002${route}...`);
    try {
      await page.goto(`http://localhost:4002${route}`, { waitUntil: 'networkidle', timeout: 30000 });
      const safeRoute = route === '/' ? 'home' : route.replace(/\//g, '_');
      await page.screenshot({ path: `screenshot_${safeRoute}.png`, fullPage: true });
      console.log(`Saved screenshot_${safeRoute}.png`);
    } catch (e) {
      console.error(`Failed on ${route}:`, e);
    }
  }
  
  await browser.close();
})();
