const express = require('express');
const ar15HandguardRouter = express.Router();
const AR15Handguard = require('../../models/ar-15/handguard/handguard');
const AR15HandguardGroup = require('../../models/ar-15/handguard/handguard-group');

const {
    HANDGUARD_MATERIALS,
    HANDGUARD_FINISHES,
    HANDGUARD_PROFILES,
    HANDGUARD_FEATURES,
    HANDGUARD_HAND_ORIENTATIONS,
    BARREL_NUT_TYPES,
    MOUNTING_SYSTEMS,
    RAIL_COMPATIBILITIES
} = require('./enums');

// POST /groups - Add a new handguard group
ar15HandguardRouter.post('/groups', async (req, res) => {
  try {
    const handguardGroupData = req.body;

    // Validate required fields for the grip group
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