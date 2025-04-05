// ar15-grips.js
const mongoose = require('mongoose');
const {
  GRIP_COLORS,
  GRIP_SCREW_TYPES,
  TRIGGER_GUARD_TYPES,
  SAFETY_SELECTOR_TYPES,
  MAGWELL_TYPES,
  BUFFER_TUBE_TYPES,
  HAND_ORIENTATIONS,
  TEXTURES,
  GRIP_MATERIALS,
  GRIP_SUBCATEGORIES,
  GRIP_SHAPES,
  GRIP_FEATURES,
  GRIP_FINISHES
} = require('./enums');
const { vendorSchema } = require('../../vendor/vendor-schema');

// Specialized compatibility schema for AR-15 grips
const ar15GripCompatibilitySchema = new mongoose.Schema({
  requiredLowerReceiver: [{
    type: { type: String, required: true }, // e.g., "Mil-Spec"
    specifications: {
      fitmentType: { type: String, required: true }, // e.g., "Mil-Spec"
      id: { type: String } // Optional reference to a specific lower receiver
    }
  }],
  incompatibleLowerReceiver: [{
    type: { type: String }, // e.g., "Commercial"
    specifications: {
      fitmentType: { type: String }, // e.g., "Commercial"
      id: { type: String }
    }
  }],
  requiredGripScrew: {
    type: { type: String, enum: GRIP_SCREW_TYPES, required: true }, // e.g., "Hex Head"
    thread: { type: String, required: true }, // e.g., "1/4-28"
    length: { type: String, required: true } // e.g., "1 inch"
  },
  requiredTriggerGuard: {
    type: { type: String, enum: TRIGGER_GUARD_TYPES }, // e.g., "Standard"
    specifications: {
      fitmentType: { type: String }, // e.g., "Mil-Spec"
      id: { type: String } // Optional reference to a specific trigger guard
    }
  },
  incompatibleTriggerGuard: {
    type: { type: String, enum: TRIGGER_GUARD_TYPES }, // e.g., "Oversized"
    specifications: {
      fitmentType: { type: String }, // e.g., "Custom"
      id: { type: String }
    }
  },
  requiredSafetySelector: {
    type: { type: String, enum: SAFETY_SELECTOR_TYPES }, // e.g., "Standard"
    specifications: {
      fitmentType: { type: String }, // e.g., "Mil-Spec"
      id: { type: String } // Optional reference to a specific safety selector
    }
  },
  incompatibleSafetySelector: {
    type: { type: String, enum: SAFETY_SELECTOR_TYPES }, // e.g., "Extended Ambidextrous"
    specifications: {
      fitmentType: { type: String }, // e.g., "Custom"
      id: { type: String }
    }
  },
  magwellCompatibility: {
    type: { type: String, enum: MAGWELL_TYPES }, // e.g., "STANAG"
    flared: { type: Boolean } // e.g., false
  },
  requiredBufferTube: {
    type: { type: String, enum: BUFFER_TUBE_TYPES }, // e.g., "Mil-Spec"
    specifications: {
      fitmentType: { type: String }, // e.g., "Mil-Spec"
      id: { type: String } // Optional reference to a specific buffer tube
    }
  },
  incompatibleBufferTube: {
    type: { type: String, enum: BUFFER_TUBE_TYPES }, // e.g., "Custom"
    specifications: {
      fitmentType: { type: String }, // e.g., "Custom"
      id: { type: String }
    }
  },
  ergonomicRequirements: { type: String }, // e.g., "Requires finger grooves for optimal fit"
  handOrientation: { type: String, enum: HAND_ORIENTATIONS }, // e.g., "Ambidextrous"
  requiredGripAngleRange: {
    min: { type: String }, // e.g., "10 degrees"
    max: { type: String } // e.g., "20 degrees"
  },
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
  }]
});

// AR-15 Grip Variant Schema
const ar15GripSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'AR15GripGroup', required: true }, // References the _id of the grip group
  attributes: {
    color: { type: String, enum: GRIP_COLORS }, // Optional, for color variants
    materialType: { type: String, enum: GRIP_MATERIALS }, // Optional, for material variants
    texture: { type: String, enum: TEXTURES }, // Optional, for texture variants
    angle: { type: String }, // Optional, for angle variants
    subCategory: { type: String, enum: GRIP_SUBCATEGORIES }, // Optional, for subCategory variants
    shape: { type: String, enum: GRIP_SHAPES }, // Optional, for shape variants
    features: [{ type: String, enum: GRIP_FEATURES }], // Optional, for feature variants
    finishType: { type: String, enum: GRIP_FINISHES }, // Optional, for finish variants
    hasStorageCompartment: { type: Boolean }, // Optional, for storage compartment variants
    screwType: { type: String }, // Optional, for screw type variants
    beavertailSupport: { type: Boolean }, // Optional, for beavertail support variants
    antiSlipDesign: { type: Boolean } // Optional, for anti-slip design variants
  },
  upc: { type: String, required: true, unique: true },
  images: [{ type: String }],
  vendors: [vendorSchema],
  compatibility: ar15GripCompatibilitySchema,
  customerRating: { type: Number, default: 0 }
});

// Add text index for full-text search
ar15GripSchema.index({
  'attributes.materialType': 'text',
  'attributes.shape': 'text',
  'attributes.features': 'text',
  'attributes.subCategory': 'text',
  'attributes.finishType': 'text',
  'attributes.angle': 'text',
  'attributes.screwType': 'text'
}, {
  weights: {
    'attributes.materialType': 5,
    'attributes.shape': 5,
    'attributes.features': 3,
    'attributes.subCategory': 3,
    'attributes.finishType': 2,
    'attributes.angle': 2,
    'attributes.screwType': 1
  },
  name: 'TextIndex'
});

// Add indexes for performance
ar15GripSchema.index({ groupId: 1 });
ar15GripSchema.index({ "compatibility.handOrientation": 1 });
ar15GripSchema.index({ "compatibility.magwellCompatibility.type": 1 });

// Export the model
module.exports = mongoose.model('AR15Grip', ar15GripSchema);