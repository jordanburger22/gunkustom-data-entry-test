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
  GAS_SYSTEM_TYPES
} = require('./enums');
const { vendorSchema } = require('../../vendor/vendor-schema');

// Compatibility schema for AR-15 handguards
const ar15HandguardCompatibilitySchema = new mongoose.Schema({
  requiredUpperReceiver: [{
    type: { type: String, required: true }, // e.g., "Mil-Spec"
    specifications: {
      fitmentType: { type: String, required: true }, // e.g., "Mil-Spec"
      id: { type: String }
    }
  }],
  incompatibleUpperReceiver: [{
    type: { type: String }, // e.g., "Proprietary"
    specifications: {
      fitmentType: { type: String }, // e.g., "Aero M5"
      id: { type: String }
    }
  }],
  requiredBarrelNut: {
    type: { type: String, enum: BARREL_NUT_TYPES, required: true }, // e.g., "Standard Mil-Spec"
    thread: { type: String, required: true }, // e.g., "1-7/16-16"
    diameter: { type: String, required: true } // e.g., "1.25 in"
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
      length: { type: String }, // e.g., "9 in"
      id: { type: String }
    }
  },
  incompatibleGasSystem: {
    type: { type: String, enum: GAS_SYSTEM_TYPES },
    specifications: {
      length: { type: String }, // e.g., "12 in"
      id: { type: String }
    }
  },
  mountingSystem: {
    type: { type: String, enum: MOUNTING_SYSTEMS, required: true }, // e.g., "M-LOK"
    slots: { type: Number } // e.g., 8
  },
  railCompatibility: {
    type: { type: String, enum: RAIL_COMPATIBILITIES }, // e.g., "None"
    continuous: { type: Boolean } // e.g., false
  },
  barrelDiameterCompatibility: {
    min: { type: String }, // e.g., "0.625 in"
    max: { type: String } // e.g., "1.0 in"
  },
  handOrientation: { type: String, enum: HANDGUARD_HAND_ORIENTATIONS, default: 'Ambidextrous' },
  installationType: { type: String, enum: ['Drop-In', 'Gunsmithing'], required: true },
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
    category: { type: String }, // e.g., "Gas Block"
    type: { type: String }, // e.g., "Low Profile"
    specifications: { type: Object },
    id: { type: String }
  }],
  requiredGasBlock: {
    type: { type: String }, // e.g., "Low Profile"
    specifications: {
      height: { type: String }, // e.g., "1.0 in"
      width: { type: String }, // e.g., "0.75 in"
      id: { type: String }
    }
  },
  incompatibleGasBlock: {
    type: { type: String }, // e.g., "A2 Front Sight"
    specifications: {
      height: { type: String },
      id: { type: String }
    }
  },
  barrelProfileCompatibility: {
    compatibleProfiles: [{ type: String }], // e.g., ["Government", "M4"]
    incompatibleProfiles: [{ type: String }], // e.g., ["Bull"]
    maxDiameterAtChamber: { type: String } // e.g., "1.2 in"
  },
  frontSightCompatibility: {
    type: { type: String }, // e.g., "Fixed"
    requiresRemoval: { type: Boolean }, // e.g., false
    specifications: {
      height: { type: String }, // e.g., "1.5 in"
      id: { type: String }
    }
  },
  deltaRingCompatibility: {
    type: { type: String }, // e.g., "Standard"
    requiresDeltaRing: { type: Boolean }, // e.g., true
    requiresRemoval: { type: Boolean } // e.g., false
  },
  muzzleDeviceCompatibility: {
    type: { type: String }, // e.g., "A2 Flash Hider"
    clearanceDiameter: { type: String }, // e.g., "1.0 in"
    lengthRelation: { type: String }, // e.g., "Flush"
    id: { type: String }
  },
  // Newly added fields
  suppressorCompatibility: {
    maxDiameter: { type: String }, // e.g., "1.5 in"
    notes: { type: String } // e.g., "Clears most standard suppressors"
  },
  mountingHardwareThreadPitch: { type: String }, // e.g., "10-32"
  railHeight: { type: String }, // e.g., "Standard Picatinny height"
  heatShielding: {
    hasHeatShield: { type: Boolean }, // e.g., true
    type: { type: String } // e.g., "Integrated aluminum shield"
  }
});

// Main AR-15 Handguard schema (unchanged)
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