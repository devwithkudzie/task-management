const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');
const APP_URL = 'http://localhost:5173'; // Your Vite dev server URL

const VIEWPORT_SIZES = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 }
};

const SCREENSHOTS_CONFIG = [
  {
    name: 'dashboard-overview',
    path: '/',
    viewport: VIEWPORT_SIZES.desktop,
    waitFor: '.dashboard-stats' // CSS selector to wait for
  },
  {
    name: 'light-theme',
    path: '/tasks',
    viewport: VIEWPORT_SIZES.desktop,
    beforeCapture: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        window.location.reload();
      });
    }
  },
  {
    name: 'dark-theme',
    path: '/tasks',
    viewport: VIEWPORT_SIZES.desktop,
    beforeCapture: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
        window.location.reload();
      });
    }
  },
  {
    name: 'task-creation',
    path: '/tasks',
    viewport: VIEWPORT_SIZES.desktop,
    beforeCapture: async (page) => {
      await page.click('[data-testid="add-task-button"]');
      await page.waitForSelector('.task-form-dialog');
    }
  },
  {
    name: 'task-list',
    path: '/tasks',
    viewport: VIEWPORT_SIZES.desktop,
    waitFor: '.task-list'
  },
  {
    name: 'mobile-view',
    path: '/',
    viewport: VIEWPORT_SIZES.mobile
  },
  {
    name: 'tablet-view',
    path: '/',
    viewport: VIEWPORT_SIZES.tablet
  }
];

async function captureScreenshots() {
  try {
    // Create screenshots directory if it doesn't exist
    await fs.mkdir(SCREENSHOT_DIR, { recursive: true });

    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null
    });

    const page = await browser.newPage();

    // Add sample data
    await page.evaluate(() => {
      localStorage.setItem('sampleData', JSON.stringify([
        {
          id: 1,
          title: 'Complete Project Documentation',
          description: 'Write comprehensive documentation for the project',
          status: 'pending',
          priority: 'high',
          category: 'Work',
          dueDate: '2024-03-25'
        },
        {
          id: 2,
          title: 'Review Pull Requests',
          description: 'Review and merge team pull requests',
          status: 'completed',
          priority: 'medium',
          category: 'Work',
          dueDate: '2024-03-22'
        }
        // Add more sample tasks as needed
      ]));
    });

    for (const config of SCREENSHOTS_CONFIG) {
      console.log(`Capturing ${config.name}...`);

      // Set viewport
      await page.setViewport(config.viewport);

      // Navigate to page
      await page.goto(`${APP_URL}${config.path}`);

      // Wait for specific element if specified
      if (config.waitFor) {
        await page.waitForSelector(config.waitFor);
      }

      // Run any pre-capture actions
      if (config.beforeCapture) {
        await config.beforeCapture(page);
      }

      // Wait for animations to complete
      await page.waitForTimeout(1000);

      // Take screenshot
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `${config.name}.png`),
        fullPage: config.fullPage || false
      });
    }

    await browser.close();
    console.log('Screenshots captured successfully!');
  } catch (error) {
    console.error('Error capturing screenshots:', error);
    process.exit(1);
  }
}

captureScreenshots(); 