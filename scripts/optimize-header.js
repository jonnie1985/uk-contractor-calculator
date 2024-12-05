const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/header-bg.png');
const outputPath = path.join(__dirname, '../public/images/header-bg-mobile.png');

async function optimizeHeader() {
    try {
        await sharp(inputPath)
            .resize(430, 120, {  // Updated to iPhone 15 Pro Max width, reduced height for better mobile proportions
                fit: 'cover',
                position: 'center'
            })
            .png({
                quality: 80,
                compressionLevel: 9
            })
            .toFile(outputPath);
        
        console.log('Mobile header image created successfully!');
    } catch (error) {
        console.error('Error creating mobile header:', error);
    }
}

optimizeHeader();
