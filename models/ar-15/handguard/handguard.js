const mongoose = require('mongoose');
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
  GAS_SYSTEM_TYPES,
  INSTALLATION_TYPES // Added
} = require('./enums');
const { vendorSchema } = require('../../vendor/vendor-schema');

// Compatibility schema for AR-15 handguards
const ar15HandguardCompatibilitySchema = new mongoose.Schema({
  requiredUpperReceiver: [{
    type: { type: String, required: true },
    specifications: {
      fitmentType: { type: String, required: true },
      id: { type: String }
    }
  }],
  incompatibleUpperReceiver: [{
    type: { type: String },
    specifications: {
      fitmentType: { type: String },
      id: { type: String }
    }
  }],
  requiredBarrelNut: {
    type: { type: String, required: true },
    thread: { type: String }, // Changed: Made optional
    diameter: { type: String } // Changed: Made optional
  },
  incompatibleBarrelNut: {
    type: { type: String, enum: BARREL_NUT_TYPES },
    specifications: {
      thread: { type: String },
      id: { type: String }
    }
  },
  requiredGasSystem: {
    type: { type: String, enum: GAS_SYSTEM_TYPES },
    specifications: {
      length: { type: String },
      id: { type: String }
    }
  },
  incompatibleGasSystem: {
    type: { type: String, enum: GAS_SYSTEM_TYPES },
    specifications: {
      length: { type: String },
      id: { type: String }
    }
  },
  mountingSystem: {
    type: { type: String, enum: MOUNTING_SYSTEMS, required: true },
    slots: { type: Number }
  },
  railCompatibility: {
    type: { type: String, enum: RAIL_COMPATIBILITIES },
    continuous: { type: Boolean }
  },
  barrelDiameterCompatibility: {
    min: { type: String },
    max: { type: String }
  },
  handOrientation: { type: String, enum: HANDGUARD_HAND_ORIENTATIONS, default: 'Ambidextrous' },
  installationType: { type: String, enum: INSTALLATION_TYPES, required: true },
  platformCompatibility: { type: String },
  ergonomicRequirements: { type: String },
  notes: { type: String },
  fitmentExplanation: { type: String },
  version: { type: String, required: true },
  lastUpdated: { type: String, required: true },
  compatibilityStatus: { type: String },
  statusReason: { type: String },
  compatibilityWarnings: [{ type: String }],
  suggestedComponents: [{
    category: { type: String },
    type: { type: String },
    specifications: { type: Object },
    id: { type: String }
  }],
  requiredGasBlock: {
    type: { type: String },
    specifications: {
      height: { type: String },
      width: { type: String },
      id: { type: String }
    }
  },
  incompatibleGasBlock: {
    type: { type: String },
    specifications: {
      height: { type: String },
      id: { type: String }
    }
  },
  barrelProfileCompatibility: {
    compatibleProfiles: [{ type: String }],
    incompatibleProfiles: [{ type: String }],
    maxDiameterAtChamber: { type: String }
  },
  frontSightCompatibility: {
    type: { type: String },
    requiresRemoval: { type: Boolean },
    specifications: {
      height: { type: String },
      id: { type: String }
    }
  },
  deltaRingCompatibility: {
    type: { type: String },
    requiresDeltaRing: { type: Boolean },
    requiresRemoval: { type: Boolean }
  },
  muzzleDeviceCompatibility: {
    type: { type: String },
    clearanceDiameter: { type: String },
    lengthRelation: { type: String },
    id: { type: String }
  },
  suppressorCompatibility: {
    maxDiameter: { type: String },
    notes: { type: String }
  },
  mountingHardwareThreadPitch: { type: String },
  railHeight: { type: String },
  heatShielding: {
    hasHeatShield: { type: Boolean },
    type: { type: String }
  }
});

// Main AR-15 Handguard schema
const ar15HandguardSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'AR15HandguardGroup', required: true },
  attributes: {
    color: { type: String, enum: HANDGUARD_COLORS },
    materialType: { type: String, enum: HANDGUARD_MATERIALS },
    finishType: { type: String, enum: HANDGUARD_FINISHES },
    weight: { type: String },
    length: { type: String },
    profile: { type: String, enum: HANDGUARD_PROFILES },
    subCategory: { type: String, enum: HANDGUARD_SUBCATEGORIES },
    features: [{ type: String, enum: HANDGUARD_FEATURES }],
    innerDiameter: { type: String },
    outerDiameter: { type: String },
    hasCutouts: { type: Boolean },
    ventedDesign: { type: Boolean }
  },
  upc: { type: String, required: true, unique: true },
  images: [{ type: String }],
  vendors: [vendorSchema],
  compatibility: ar15HandguardCompatibilitySchema,
  customerRating: { type: Number, default: 0, min: 0 }
});

// Add text index for full-text search
ar15HandguardSchema.index({
  'attributes.materialType': 'text',
  'attributes.finishType': 'text',
  'attributes.weight': 'text',
  'attributes.length': 'text',
  'attributes.profile': 'text',
  'attributes.features': 'text',
  'attributes.subCategory': 'text'
}, {
  weights: {
    'attributes.materialType': 5,
    'attributes.finishType': 4,
    'attributes.weight': 3,
    'attributes.length': 3,
    'attributes.profile': 5,
    'attributes.features': 3,
    'attributes.subCategory': 3
  },
  name: 'TextIndex'
});

// Add indexes for performance
ar15HandguardSchema.index({ groupId: 1 });
ar15HandguardSchema.index({ 'compatibility.handOrientation': 1 });
ar15HandguardSchema.index({ 'compatibility.mountingSystem.type': 1 });
ar15HandguardSchema.index({ 'compatibility.requiredBarrelNut.type': 1 });

// Export the model
module.exports = mongoose.model('AR15Handguard', ar15HandguardSchema);