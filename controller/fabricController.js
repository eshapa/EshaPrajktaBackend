const FabricCategory = require('../models/fabricModels');

exports.createMultipleCategories = async (req, res) => {
  try {
    const { shopId, categories } = req.body;
    const files = req.files || [];

    // categories is sent as JSON string, parse it
    const parsedCategories = JSON.parse(categories);

    // Map categories and link images to each subtype by matching fieldname
    const categoriesToSave = parsedCategories.map((cat, catIndex) => {
      const subtypesWithImages = cat.subtypes.map((sub, subIndex) => {
        // Use backticks for template literal here
        const fieldName = `images_cat${catIndex}_sub${subIndex}`;
        const matchingFiles = files.filter(f => f.fieldname === fieldName);

        return {
          name: sub.name,
          price: sub.price,
          images: matchingFiles.map(f => f.filename),
        };
      });

      return {
        shopId,
        categoryName: cat.categoryName,
        subtypes: subtypesWithImages,
      };
    });

    const savedCategories = await FabricCategory.insertMany(categoriesToSave);

    res.status(201).json({
      message: 'Fabric categories added successfully',
      data: savedCategories,
    });
  } catch (error) {
    console.error('Error adding fabric categories:', error.message);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

exports.getFabricsByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const fabrics = await FabricCategory.find({ shopId });
    res.status(200).json(fabrics);
  } catch (error) {
    console.error('Error fetching fabrics:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
