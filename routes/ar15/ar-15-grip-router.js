// routes/ar15-grips.js
const express = require('express');
const ar15GripRouter = express.Router();
const AR15Grip = require('../../models/ar-15/grip/grip');
const AR15GripGroup = require('../../models/ar-15/grip/grip-group');
const {
  GRIP_COLORS,
  GRIP_SUBCATEGORIES,
  GRIP_SHAPES,
  GRIP_FEATURES,
  GRIP_MATERIALS,
  GRIP_FINISHES,
  TEXTURES,
  GRIP_SCREW_TYPES,
  TRIGGER_GUARD_TYPES,
  SAFETY_SELECTOR_TYPES,
  MAGWELL_TYPES,
  BUFFER_TUBE_TYPES,
  HAND_ORIENTATIONS
} = require('../../models/ar-15/grip/enums');

// POST /groups - Add a new grip group
ar15GripRouter.post('/groups', async (req, res) => {
  try {
    const gripGroupData = req.body;

    // Validate required fields for the grip group
    if (!gripGroupData.name) {
      return res.status(400).json({ message: 'Grip group name is required' });
    }

    // Create the grip group
    const gripGroup = new AR15GripGroup({
      name: gripGroupData.name,
      description: gripGroupData.description,
      components: {
        specifications: gripGroupData.components?.specifications
      },
      popularityScore: gripGroupData.popularityScore || 0
    });

    try {
      await gripGroup.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.name) {
        return res.status(400).json({
          message: `A grip group with the name "${gripGroupData.name}" already exists. Please use a different name or add a variant to the existing group.`,
          existingGroupId: (await AR15GripGroup.findOne({ name: gripGroupData.name }))._id
        });
      }
      throw error;
    }

    // Return success response with the new grip group's ID
    res.status(201).json({ message: 'AR-15 grip group added successfully', groupId: gripGroup._id });
  } catch (error) {
    console.error('Error adding AR-15 grip group:', error.message);
    res.status(500).json({ message: 'Failed to add AR-15 grip group', error: error.message });
  }
});

// POST /groups/:groupId - Add a new grip variant to an existing grip group
ar15GripRouter.post('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const gripData = req.body;

    // Validate required fields
    if (!gripData.attributes || Object.keys(gripData.attributes).length === 0) {
      return res.status(400).json({ 
        message: 'At least one variant-specific attribute is required. Examples include: color, materialType, texture, angle, subCategory, shape, features, finishType, hasStorageCompartment, screwType, beavertailSupport, antiSlipDesign.'
      });
    }
    if (!gripData.upc) {
      return res.status(400).json({ message: 'UPC is required for a grip variant' });
    }

    // Verify that the groupId exists in ar15-grip-groups
    const gripGroup = await AR15GripGroup.findById(groupId);
    if (!gripGroup) {
      return res.status(404).json({ message: `Grip group with _id "${groupId}" not found` });
    }

    // Create the grip variant
    const newGrip = new AR15Grip({
      groupId: groupId,
      attributes: gripData.attributes,
      upc: gripData.upc,
      images: gripData.images || [],
      vendors: gripData.vendors || [],
      compatibility: gripData.compatibility,
      customerRating: gripData.customerRating || 0
    });

    try {
      await newGrip.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.upc) {
        return res.status(400).json({ message: 'Failed to add AR-15 grip variant: Duplicate UPC', error: error.message });
      }
      throw error;
    }

    // Return success response with the new grip's ID
    res.status(201).json({ message: 'AR-15 grip variant added successfully', gripId: newGrip._id });
  } catch (error) {
    console.error('Error adding AR-15 grip variant:', error.message);
    res.status(500).json({ message: 'Failed to add AR-15 grip variant', error: error.message });
  }
});

// GET /groups - Fetch all grip groups
ar15GripRouter.get('/groups', async (req, res) => {
  try {
    // Fetch all grip groups
    const gripGroups = await AR15GripGroup.find().lean();

    // Format the response
    const response = gripGroups.map(group => ({
      groupId: group._id,
      name: group.name,
      description: group.description,
      components: group.components,
      popularityScore: group.popularityScore
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching grip groups:', error.message);
    res.status(500).json({ message: 'Failed to fetch grip groups', error: error.message });
  }
});

// GET /groups/:groupId - Fetch a specific grip group
ar15GripRouter.get('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;

    // Fetch the grip group
    const gripGroup = await AR15GripGroup.findById(groupId).lean();
    if (!gripGroup) {
      return res.status(404).json({ message: `Grip group with _id "${groupId}" not found` });
    }

    // Format the response
    const response = {
      groupId: gripGroup._id,
      name: gripGroup.name,
      description: gripGroup.description,
      components: gripGroup.components,
      popularityScore: gripGroup.popularityScore
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching grip group:', error.message);
    res.status(500).json({ message: 'Failed to fetch grip group', error: error.message });
  }
});

// GET /groups/:groupId/variants - Fetch all variants for a specific grip group
ar15GripRouter.get('/groups/:groupId/variants', async (req, res) => {
  try {
    const { groupId } = req.params;

    // Verify that the groupId exists in ar15-grip-groups
    const gripGroup = await AR15GripGroup.findById(groupId);
    if (!gripGroup) {
      return res.status(404).json({ message: `Grip group with _id "${groupId}" not found` });
    }

    // Fetch all variants for the grip group
    const variants = await AR15Grip.find({ groupId }).lean();

    // Format the response
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
    console.error('Error fetching grip variants:', error.message);
    res.status(500).json({ message: 'Failed to fetch grip variants', error: error.message });
  }
});

// GET /enums - Fetch all enums for grips
ar15GripRouter.get('/enums', (req, res) => {
  try {
    const enums = {
      colors: GRIP_COLORS,
      subCategories: GRIP_SUBCATEGORIES,
      shapes: GRIP_SHAPES,
      features: GRIP_FEATURES,
      materials: GRIP_MATERIALS,
      finishes: GRIP_FINISHES,
      textures: TEXTURES,
      screwTypes: GRIP_SCREW_TYPES,
      triggerGuardTypes: TRIGGER_GUARD_TYPES,
      safetySelectorTypes: SAFETY_SELECTOR_TYPES,
      magwellTypes: MAGWELL_TYPES,
      bufferTubeTypes: BUFFER_TUBE_TYPES,
      handOrientations: HAND_ORIENTATIONS
    };
    res.status(200).json(enums);
  } catch (error) {
    console.error('Error fetching enums:', error.message);
    res.status(500).json({ message: 'Failed to fetch enums', error: error.message });
  }
});

// PUT /groups/:groupId - Update an existing grip group
ar15GripRouter.put('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const gripGroupData = req.body;

    // Validate required fields for the grip group
    if (!gripGroupData.name) {
      return res.status(400).json({ message: 'Grip group name is required' });
    }

    // Find the existing grip group
    const gripGroup = await AR15GripGroup.findById(groupId);
    if (!gripGroup) {
      return res.status(404).json({ message: `Grip group with _id "${groupId}" not found` });
    }

    // Update the grip group fields
    gripGroup.name = gripGroupData.name;
    gripGroup.description = gripGroupData.description;
    gripGroup.components.specifications = gripGroupData.components?.specifications || gripGroup.components.specifications;
    gripGroup.popularityScore = gripGroupData.popularityScore || gripGroup.popularityScore;

    try {
      await gripGroup.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.name) {
        return res.status(400).json({
          message: `A grip group with the name "${gripGroupData.name}" already exists. Please use a different name.`,
          existingGroupId: (await AR15GripGroup.findOne({ name: gripGroupData.name }))._id
        });
      }
      throw error;
    }

    // Return success response
    res.status(200).json({ message: 'AR-15 grip group updated successfully', groupId: gripGroup._id });
  } catch (error) {
    console.error('Error updating AR-15 grip group:', error.message);
    res.status(500).json({ message: 'Failed to update AR-15 grip group', error: error.message });
  }
});

// PUT /variants/:variantId - Update an existing grip variant
ar15GripRouter.put('/variants/:variantId', async (req, res) => {
  try {
    const { variantId } = req.params;
    const gripData = req.body;

    // Validate required fields
    if (!gripData.attributes || Object.keys(gripData.attributes).length === 0) {
      return res.status(400).json({ 
        message: 'At least one variant-specific attribute is required. Examples include: color, materialType, texture, angle, subCategory, shape, features, finishType, hasStorageCompartment, screwType, beavertailSupport, antiSlipDesign.'
      });
    }
    if (!gripData.upc) {
      return res.status(400).json({ message: 'UPC is required for a grip variant' });
    }

    // Find the existing grip variant
    const gripVariant = await AR15Grip.findById(variantId);
    if (!gripVariant) {
      return res.status(404).json({ message: `Grip variant with _id "${variantId}" not found` });
    }

    // Update the grip variant fields
    gripVariant.attributes = gripData.attributes;
    gripVariant.upc = gripData.upc;
    gripVariant.images = gripData.images || gripVariant.images;
    gripVariant.vendors = gripData.vendors || gripVariant.vendors;
    gripVariant.compatibility = gripData.compatibility || gripVariant.compatibility;
    gripVariant.customerRating = gripData.customerRating || gripVariant.customerRating;

    try {
      await gripVariant.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.upc) {
        return res.status(400).json({ message: 'Failed to update AR-15 grip variant: Duplicate UPC', error: error.message });
      }
      throw error;
    }

    // Return success response
    res.status(200).json({ message: 'AR-15 grip variant updated successfully', variantId: gripVariant._id });
  } catch (error) {
    console.error('Error updating AR-15 grip variant:', error.message);
    res.status(500).json({ message: 'Failed to update AR-15 grip variant', error: error.message });
  }
});

module.exports = ar15GripRouter;