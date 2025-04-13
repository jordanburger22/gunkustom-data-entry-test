const express = require('express');
const ar15HandguardRouter = express.Router();
const AR15Handguard = require('../../models/ar-15/handguard/handguard');
const AR15HandguardGroup = require('../../models/ar-15/handguard/handguard-group');
const {
  HANDGUARD_COLORS,
  HANDGUARD_MATERIALS,
  HANDGUARD_FINISHES,
  HANDGUARD_PROFILES,
  HANDGUARD_SUBCATEGORIES,
  HANDGUARD_FEATURES,
  HANDGUARD_HAND_ORIENTATIONS,
  BARREL_NUT_TYPES,
  MOUNTING_SYSTEMS,
  RAIL_COMPATIBILITIES,
  GAS_SYSTEM_TYPES
} = require('../../models/ar-15/handguard/enums');

// POST /groups - Add a new handguard group
ar15HandguardRouter.post('/groups', async (req, res) => {
  try {
    const handguardGroupData = req.body;

    // Validate required fields for the handguard group
    if (!handguardGroupData.name) {
      return res.status(400).json({ message: 'Handguard group name is required' });
    }

    // Create the handguard group
    const handguardGroup = new AR15HandguardGroup({
      name: handguardGroupData.name,
      description: handguardGroupData.description,
      components: {
        specifications: handguardGroupData.components?.specifications
      },
      popularityScore: handguardGroupData.popularityScore || 0
    });

    try {
      await handguardGroup.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.name) {
        return res.status(400).json({
          message: `A handguard group with the name "${handguardGroupData.name}" already exists. Please use a different name or add a variant to the existing group.`,
          existingGroupId: (await AR15HandguardGroup.findOne({ name: handguardGroupData.name }))._id
        });
      }
      throw error;
    }

    res.status(201).json({ message: 'AR-15 handguard group added successfully', groupId: handguardGroup._id });
  } catch (error) {
    console.error('Error adding AR-15 handguard group:', error.message);
    res.status(500).json({ message: 'Failed to add AR-15 handguard group', error: error.message });
  }
});

// POST /groups/:groupId - Add a new handguard variant to an existing handguard group
ar15HandguardRouter.post('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const handguardData = req.body;

    // Validate required fields
    if (!handguardData.attributes || Object.keys(handguardData.attributes).length === 0) {
      return res.status(400).json({
        message: 'At least one variant-specific attribute is required. Examples include: color, profile, subCategory, features, innerDiameter, outerDiameter, hasCutouts, ventedDesign.'
      });
    }
    if (!handguardData.upc) {
      return res.status(400).json({ message: 'UPC is required for a handguard variant' });
    }

    // Verify that the groupId exists
    const handguardGroup = await AR15HandguardGroup.findById(groupId);
    if (!handguardGroup) {
      return res.status(404).json({ message: `Handguard group with _id "${groupId}" not found` });
    }

    // Create the handguard variant
    const newHandguard = new AR15Handguard({
      groupId: groupId,
      attributes: handguardData.attributes,
      upc: handguardData.upc,
      images: handguardData.images || [],
      vendors: handguardData.vendors || [],
      compatibility: handguardData.compatibility,
      customerRating: handguardData.customerRating || 0
    });

    try {
      await newHandguard.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.upc) {
        return res.status(400).json({ message: 'Failed to add AR-15 handguard variant: Duplicate UPC', error: error.message });
      }
      throw error;
    }

    res.status(201).json({ message: 'AR-15 handguard variant added successfully', handplasguardId: newHandguard._id });
  } catch (error) {
    console.error('Error adding AR-15 handguard variant:', error.message);
    res.status(500).json({ message: 'Failed to add AR-15 handguard variant', error: error.message });
  }
});

// GET /groups - Fetch all handguard groups
ar15HandguardRouter.get('/groups', async (req, res) => {
  try {
    const handguardGroups = await AR15HandguardGroup.find().lean();
    const response = handguardGroups.map(group => ({
      groupId: group._id,
      name: group.name,
      description: group.description,
      components: group.components,
      popularityScore: group.popularityScore
    }));
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching handguard groups:', error.message);
    res.status(500).json({ message: 'Failed to fetch handguard groups', error: error.message });
  }
});

// GET /groups/:groupId - Fetch a specific handguard group
ar15HandguardRouter.get('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const handguardGroup = await AR15HandguardGroup.findById(groupId).lean();
    if (!handguardGroup) {
      return res.status(404).json({ message: `Handguard group with _id "${groupId}" not found` });
    }
    const response = {
      groupId: handguardGroup._id,
      name: handguardGroup.name,
      description: handguardGroup.description,
      components: handguardGroup.components,
      popularityScore: handguardGroup.popularityScore
    };
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching handguard group:', error.message);
    res.status(500).json({ message: 'Failed to fetch handguard group', error: error.message });
  }
});

// GET /groups/:groupId/variants - Fetch all variants for a specific handguard group
ar15HandguardRouter.get('/groups/:groupId/variants', async (req, res) => {
  try {
    const { groupId } = req.params;
    const handguardGroup = await AR15HandguardGroup.findById(groupId);
    if (!handguardGroup) {
      return res.status(404).json({ message: `Handguard group with _id "${groupId}" not found` });
    }
    const variants = await AR15Handguard.find({ groupId }).lean();
    const response = variants.map(variant => ({
      variantId: variant._id,
      attributes: variant.attributes,
      upc: variant.upc,
      images: variant.images || [],
      vendors: variant.vendors || [],
      compatibility: variant.compatibility,
      customerRating: variant.customerRating || 0
    }));
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching handguard variants:', error.message);
    res.status(500).json({ message: 'Failed to fetch handguard variants', error: error.message });
  }
});

// GET /enums - Fetch all enums for handguards
ar15HandguardRouter.get('/enums', (req, res) => {
  try {
    const enums = {
      colors: HANDGUARD_COLORS,
      materials: HANDGUARD_MATERIALS,
      finishes: HANDGUARD_FINISHES,
      profiles: HANDGUARD_PROFILES,
      subCategories: HANDGUARD_SUBCATEGORIES,
      features: HANDGUARD_FEATURES,
      handOrientations: HANDGUARD_HAND_ORIENTATIONS,
      barrelNutTypes: BARREL_NUT_TYPES,
      mountingSystems: MOUNTING_SYSTEMS,
      railCompatibilities: RAIL_COMPATIBILITIES,
      gasSystemTypes: GAS_SYSTEM_TYPES
    };
    res.status(200).json(enums);
  } catch (error) {
    console.error('Error fetching enums:', error.message);
    res.status(500).json({ message: 'Failed to fetch enums', error: error.message });
  }
});

// PUT /groups/:groupId - Update an existing handguard group
ar15HandguardRouter.put('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const handguardGroupData = req.body;

    // Validate required fields for the handguard group
    if (!handguardGroupData.name) {
      return res.status(400).json({ message: 'Handguard group name is required' });
    }

    // Find the existing handguard group
    const handguardGroup = await AR15HandguardGroup.findById(groupId);
    if (!handguardGroup) {
      return res.status(404).json({ message: `Handguard group with _id "${groupId}" not found` });
    }

    // Update the handguard group fields
    handguardGroup.name = handguardGroupData.name;
    handguardGroup.description = handguardGroupData.description;
    handguardGroup.components.specifications = handguardGroupData.components?.specifications || handguardGroup.components.specifications;
    handguardGroup.popularityScore = handguardGroupData.popularityScore || handguardGroup.popularityScore;

    try {
      await handguardGroup.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.name) {
        return res.status(400).json({
          message: `A handguard group with the name "${handguardGroupData.name}" already exists. Please use a different name.`,
          existingGroupId: (await AR15HandguardGroup.findOne({ name: handguardGroupData.name }))._id
        });
      }
      throw error;
    }

    res.status(200).json({ message: 'AR-15 handguard group updated successfully', groupId: handguardGroup._id });
  } catch (error) {
    console.error('Error updating AR-15 handguard group:', error.message);
    res.status(500).json({ message: 'Failed to update AR-15 handguard group', error: error.message });
  }
});

// PUT /variants/:variantId - Update an existing handguard variant
ar15HandguardRouter.put('/variants/:variantId', async (req, res) => {
  try {
    const { variantId } = req.params;
    const handguardData = req.body;

    // Validate required fields
    if (!handguardData.attributes || Object.keys(handguardData.attributes).length === 0) {
      return res.status(400).json({
        message: 'At least one variant-specific attribute is required. Examples include: color, profile, subCategory, features, innerDiameter, outerDiameter, hasCutouts, ventedDesign.'
      });
    }
    if (!handguardData.upc) {
      return res.status(400).json({ message: 'UPC is required for a handguard variant' });
    }

    // Find the existing handguard variant
    const handguardVariant = await AR15Handguard.findById(variantId);
    if (!handguardVariant) {
      return res.status(404).json({ message: `Handguard variant with _id "${variantId}" not found` });
    }

    // Update the handguard variant fields
    handguardVariant.attributes = handguardData.attributes;
    handguardVariant.upc = handguardData.upc;
    handguardVariant.images = handguardData.images || handguardVariant.images;
    handguardVariant.vendors = handguardData.vendors || handguardVariant.vendors;
    handguardVariant.compatibility = handguardData.compatibility || handguardVariant.compatibility;
    handguardVariant.customerRating = handguardData.customerRating || handguardVariant.customerRating;

    try {
      await handguardVariant.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.upc) {
        return res.status(400).json({ message: 'Failed to update AR-15 handguard variant: Duplicate UPC', error: error.message });
      }
      throw error;
    }

    res.status(200).json({ message: 'AR-15 handguard variant updated successfully', variantId: handguardVariant._id });
  } catch (error) {
    console.error('Error updating AR-15 handguard variant:', error.message);
    res.status(500).json({ message: 'Failed to update AR-15 handguard variant', error: error.message });
  }
});

module.exports = ar15HandguardRouter;