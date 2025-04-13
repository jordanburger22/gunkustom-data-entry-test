const express = require('express');
const ar15TriggerGuardRouter = express.Router();
const AR15TriggerGuard = require('../../models/ar-15/trigger-guard/trigger-guard');
const AR15TriggerGuardGroup = require('../../models/ar-15/trigger-guard/trigger-guard-group');
const {
  TRIGGER_GUARD_COLORS,
  TRIGGER_GUARD_SCREW_TYPES,
  GRIP_TYPES,
  LOWER_RECEIVER_TYPES,
  SAFETY_SELECTOR_TYPES,
  MAGWELL_TYPES,
  HAND_ORIENTATIONS,
  TRIGGER_GUARD_TEXTURES,
  TRIGGER_GUARD_MATERIALS,
  TRIGGER_GUARD_SUBCATEGORIES,
  TRIGGER_GUARD_SHAPES,
  TRIGGER_GUARD_FEATURES,
  TRIGGER_GUARD_FINISHES
} = require('../../models/ar-15/trigger-guard/enums');

// POST /groups - Add a new trigger guard group
ar15TriggerGuardRouter.post('/groups', async (req, res) => {
  try {
    const triggerGuardGroupData = req.body;

    // Validate required fields for the trigger guard group
    if (!triggerGuardGroupData.name) {
      return res.status(400).json({ message: 'Trigger guard group name is required' });
    }

    // Create the trigger guard group
    const triggerGuardGroup = new AR15TriggerGuardGroup({
      name: triggerGuardGroupData.name,
      description: triggerGuardGroupData.description,
      components: {
        specifications: triggerGuardGroupData.components?.specifications
      },
      popularityScore: triggerGuardGroupData.popularityScore || 0
    });

    try {
      await triggerGuardGroup.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.name) {
        return res.status(400).json({
          message: `A trigger guard group with the name "${triggerGuardGroupData.name}" already exists. Please use a different name or add a variant to the existing group.`,
          existingGroupId: (await AR15TriggerGuardGroup.findOne({ name: triggerGuardGroupData.name }))._id
        });
      }
      throw error;
    }

    // Return success response with the new trigger guard group's ID
    res.status(201).json({ message: 'AR-15 trigger guard group added successfully', groupId: triggerGuardGroup._id });
  } catch (error) {
    console.error('Error adding AR-15 trigger guard group:', error.message);
    res.status(500).json({ message: 'Failed to add AR-15 trigger guard group', error: error.message });
  }
});

// POST /groups/:groupId - Add a new trigger guard variant to an existing trigger guard group
ar15TriggerGuardRouter.post('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const triggerGuardData = req.body;

    // Validate required fields
    if (!triggerGuardData.attributes || Object.keys(triggerGuardData.attributes).length === 0) {
      return res.status(400).json({ 
        message: 'At least one variant-specific attribute is required. Examples include: color, materialType, texture, subCategory, shape, features, finishType, hasIntegratedMagwellFlare, undercutDesign, antiSlipDesign, triggerAreaWidth.'
      });
    }
    if (!triggerGuardData.upc) {
      return res.status(400).json({ message: 'UPC is required for a trigger guard variant' });
    }

    // Verify that the groupId exists in ar15-trigger-guard-groups
    const triggerGuardGroup = await AR15TriggerGuardGroup.findById(groupId);
    if (!triggerGuardGroup) {
      return res.status(404).json({ message: `Trigger guard group with _id "${groupId}" not found` });
    }

    // Create the trigger guard variant
    const newTriggerGuard = new AR15TriggerGuard({
      groupId: groupId,
      attributes: triggerGuardData.attributes,
      upc: triggerGuardData.upc,
      images: triggerGuardData.images || [],
      vendors: triggerGuardData.vendors || [],
      compatibility: triggerGuardData.compatibility,
      customerRating: triggerGuardData.customerRating || 0
    });

    try {
      await newTriggerGuard.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.upc) {
        return res.status(400).json({ message: 'Failed to add AR-15 trigger guard variant: Duplicate UPC', error: error.message });
      }
      throw error;
    }

    // Return success response with the new trigger guard's ID
    res.status(201).json({ message: 'AR-15 trigger guard variant added successfully', triggerGuardId: newTriggerGuard._id });
  } catch (error) {
    console.error('Error adding AR-15 trigger guard variant:', error.message);
    res.status(500).json({ message: 'Failed to add AR-15 trigger guard variant', error: error.message });
  }
});

// GET /groups - Fetch all trigger guard groups
ar15TriggerGuardRouter.get('/groups', async (req, res) => {
  try {
    // Fetch all trigger guard groups
    const triggerGuardGroups = await AR15TriggerGuardGroup.find().lean();

    // Format the response
    const response = triggerGuardGroups.map(group => ({
      groupId: group._id,
      name: group.name,
      description: group.description,
      components: group.components,
      popularityScore: group.popularityScore
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching trigger guard groups:', error.message);
    res.status(500).json({ message: 'Failed to fetch trigger guard groups', error: error.message });
  }
});

// GET /groups/:groupId - Fetch a specific trigger guard group
ar15TriggerGuardRouter.get('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;

    // Fetch the trigger guard group
    const triggerGuardGroup = await AR15TriggerGuardGroup.findById(groupId).lean();
    if (!triggerGuardGroup) {
      return res.status(404).json({ message: `Trigger guard group with _id "${groupId}" not found` });
    }

    // Format the response
    const response = {
      groupId: triggerGuardGroup._id,
      name: triggerGuardGroup.name,
      description: triggerGuardGroup.description,
      components: triggerGuardGroup.components,
      popularityScore: triggerGuardGroup.popularityScore
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching trigger guard group:', error.message);
    res.status(500).json({ message: 'Failed to fetch trigger guard group', error: error.message });
  }
});

// GET /groups/:groupId/variants - Fetch all variants for a specific trigger guard group
ar15TriggerGuardRouter.get('/groups/:groupId/variants', async (req, res) => {
  try {
    const { groupId } = req.params;

    // Verify that the groupId exists in ar15-trigger-guard-groups
    const triggerGuardGroup = await AR15TriggerGuardGroup.findById(groupId);
    if (!triggerGuardGroup) {
      return res.status(404).json({ message: `Trigger guard group with _id "${groupId}" not found` });
    }

    // Fetch all variants for the trigger guard group
    const variants = await AR15TriggerGuard.find({ groupId }).lean();

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
    console.error('Error fetching trigger guard variants:', error.message);
    res.status(500).json({ message: 'Failed to fetch trigger guard variants', error: error.message });
  }
});

// GET /enums - Fetch all enums for trigger guards
ar15TriggerGuardRouter.get('/enums', (req, res) => {
  try {
    const enums = {
      colors: TRIGGER_GUARD_COLORS,
      screwTypes: TRIGGER_GUARD_SCREW_TYPES,
      gripTypes: GRIP_TYPES,
      lowerReceiverTypes: LOWER_RECEIVER_TYPES,
      safetySelectorTypes: SAFETY_SELECTOR_TYPES,
      magwellTypes: MAGWELL_TYPES,
      handOrientations: HAND_ORIENTATIONS,
      textures: TRIGGER_GUARD_TEXTURES,
      materials: TRIGGER_GUARD_MATERIALS,
      subCategories: TRIGGER_GUARD_SUBCATEGORIES,
      shapes: TRIGGER_GUARD_SHAPES,
      features: TRIGGER_GUARD_FEATURES,
      finishes: TRIGGER_GUARD_FINISHES
    };
    res.status(200).json(enums);
  } catch (error) {
    console.error('Error fetching enums:', error.message);
    res.status(500).json({ message: 'Failed to fetch enums', error: error.message });
  }
});

// PUT /groups/:groupId - Update an existing trigger guard group
ar15TriggerGuardRouter.put('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const triggerGuardGroupData = req.body;

    // Validate required fields for the trigger guard group
    if (!triggerGuardGroupData.name) {
      return res.status(400).json({ message: 'Trigger guard group name is required' });
    }

    // Find the existing trigger guard group
    const triggerGuardGroup = await AR15TriggerGuardGroup.findById(groupId);
    if (!triggerGuardGroup) {
      return res.status(404).json({ message: `Trigger guard group with _id "${groupId}" not found` });
    }

    // Update the trigger guard group fields
    triggerGuardGroup.name = triggerGuardGroupData.name;
    triggerGuardGroup.description = triggerGuardGroupData.description;
    triggerGuardGroup.components.specifications = triggerGuardGroupData.components?.specifications || triggerGuardGroup.components.specifications;
    triggerGuardGroup.popularityScore = triggerGuardGroupData.popularityScore || triggerGuardGroup.popularityScore;

    try {
      await triggerGuardGroup.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.name) {
        return res.status(400).json({
          message: `A trigger guard group with the name "${triggerGuardGroupData.name}" already exists. Please use a different name.`,
          existingGroupId: (await AR15TriggerGuardGroup.findOne({ name: triggerGuardGroupData.name }))._id
        });
      }
      throw error;
    }

    // Return success response
    res.status(200).json({ message: 'AR-15 trigger guard group updated successfully', groupId: triggerGuardGroup._id });
  } catch (error) {
    console.error('Error updating AR-15 trigger guard group:', error.message);
    res.status(500).json({ message: 'Failed to update AR-15 trigger guard group', error: error.message });
  }
});

// PUT /variants/:variantId - Update an existing trigger guard variant
ar15TriggerGuardRouter.put('/variants/:variantId', async (req, res) => {
  try {
    const { variantId } = req.params;
    const triggerGuardData = req.body;

    // Validate required fields
    if (!triggerGuardData.attributes || Object.keys(triggerGuardData.attributes).length === 0) {
      return res.status(400).json({ 
        message: 'At least one variant-specific attribute is required. Examples include: color, materialType, texture, subCategory, shape, features, finishType, hasIntegratedMagwellFlare, undercutDesign, antiSlipDesign, triggerAreaWidth.'
      });
    }
    if (!triggerGuardData.upc) {
      return res.status(400).json({ message: 'UPC is required for a trigger guard variant' });
    }

    // Find the existing trigger guard variant
    const triggerGuardVariant = await AR15TriggerGuard.findById(variantId);
    if (!triggerGuardVariant) {
      return res.status(404).json({ message: `Trigger guard variant with _id "${variantId}" not found` });
    }

    // Update the trigger guard variant fields
    triggerGuardVariant.attributes = triggerGuardData.attributes;
    triggerGuardVariant.upc = triggerGuardData.upc;
    triggerGuardVariant.images = triggerGuardData.images || triggerGuardVariant.images;
    triggerGuardVariant.vendors = triggerGuardData.vendors || triggerGuardVariant.vendors;
    triggerGuardVariant.compatibility = triggerGuardData.compatibility || triggerGuardVariant.compatibility;
    triggerGuardVariant.customerRating = triggerGuardData.customerRating || triggerGuardVariant.customerRating;

    try {
      await triggerGuardVariable.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.upc) {
        return res.status(400).json({ message: 'Failed to update AR-15 trigger guard variant: Duplicate UPC', error: error.message });
      }
      throw error;
    }

    // Return success response
    res.status(200).json({ message: 'AR-15 trigger guard variant updated successfully', variantId: triggerGuardVariant._id });
  } catch (error) {
    console.error('Error updating AR-15 trigger guard variant:', error.message);
    res.status(500).json({ message: 'Failed to update AR-15 trigger guard variant', error: error.message });
  }
});

module.exports = ar15TriggerGuardRouter;