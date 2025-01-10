const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');
const OPTIMIZED_DIR = path.join(SCREENSHOT_DIR, 'optimized');

const OPTIMIZATION_CONFIG = {
  desktop: { width: 1200 },
  tablet: { width: 768 },
  mobile: { width: 375 }
};

async function optimizeScreenshots() {
  try {
    // Create optimized directory
    await fs.mkdir(OPTIMIZED_DIR, { recursive: true });

    // Get all PNG files
    const files = await fs.readdir(SCREENSHOT_DIR);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    for (const file of pngFiles) {
      console.log(`Optimizing ${file}...`);

      const inputPath = path.join(SCREENSHOT_DIR, file);
      const outputPath = path.join(OPTIMIZED_DIR, file);

      // Determine size based on filename
      let config = OPTIMIZATION_CONFIG.desktop;
      if (file.includes('mobile')) {
        config = OPTIMIZATION_CONFIG.mobile;
      } else if (file.includes('tablet')) {
        config = OPTIMIZATION_CONFIG.tablet;
      }

      await sharp(inputPath)
        .resize(config.width)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(outputPath);
    }

    console.log('Screenshots optimized successfully!');
  } catch (error) {
    console.error('Error optimizing screenshots:', error);
    process.exit(1);
  }
}

optimizeScreenshots(); 