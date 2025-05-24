const fs = require('fs');
const cloudinary = require('./utils/cloudinary');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const Image = require('./Models/imageModels');
const FabricCategory = require('./Models/fabricModels');

dotenv.config();

async function uploadImageToCloudinary(localPath) {
  try {
    const result = await cloudinary.uploader.upload(localPath, { folder: 'Divyluck' });
    return result.secure_url;
  } catch (error) {
    console.error(`Cloudinary upload error for ${localPath}:`, error);
    return null;
  }
}

async function migrateImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB for migration');

    const images = await Image.find({});
    for (const img of images) {
      if (!img.imagePath) {
        console.warn(`Image _id: ${img._id} has no imagePath`);
        continue;
      }

      const localImagePath = path.join(__dirname, 'uploads', 'portfolio', path.basename(img.imagePath));

      if (!fs.existsSync(localImagePath)) {
        console.warn(`File not found: ${localImagePath}`);
        continue;
      }

      const cloudUrl = await uploadImageToCloudinary(localImagePath);
      if (cloudUrl) {
        img.imagePath = cloudUrl;
        await img.save();
        console.log(`✅ Updated Image _id: ${img._id}`);
      }
    }

    const fabricCategories = await FabricCategory.find({});
    for (const category of fabricCategories) {
      let updated = false;

      for (const subtype of category.subtypes) {
        for (let i = 0; i < subtype.images.length; i++) {
          const filename = subtype.images[i];
          if (!filename) continue;

          const localImagePath = path.join(__dirname, 'uploads', 'portfolio', path.basename(filename));
          if (!fs.existsSync(localImagePath)) {
            console.warn(`File not found: ${localImagePath}`);
            continue;
          }

          const cloudUrl = await uploadImageToCloudinary(localImagePath);
          if (cloudUrl) {
            subtype.images[i] = cloudUrl;
            updated = true;
            console.log(`✅ Updated fabric image in category ${category._id}`);
          }
        }
      }

      if (updated) await category.save();
    }

    console.log('✅ Migration complete!');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Migration error:', error);
  }
}

migrateImages();
