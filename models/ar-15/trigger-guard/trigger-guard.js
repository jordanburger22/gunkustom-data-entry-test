const mongoose = require('mongoose');
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
} = require('./enums');
const { vendorSchema } = require('../../vendor/vendor-schema');

// Specialized compatibility schema for AR-15 trigger guards
const ar15TriggerGuardCompatibilitySchema = new mongoose.Schema({
  requiredLowerReceiver: [{
    type: { type: String, required: true }, // e.g., "Mil-Spec"
    specifications: {
      fitmentType: { type: String, required: true }, // e.g., "Mil-Spec"
      id: { type: String } // Optional
    }
  }],
  incompatibleLowerReceiver: [{
    type: { type: String }, // e.g., "Proprietary"
    specifications: {
      fitmentType: { type: String }, // e.g., "POF-USA Gen 4"
      id: { type: String }
    }
  }],
  requiredGrip: {
    type: { type: String, enum: GRIP_TYPES }, // e.g., "Standard Pistol Grip"
    specifications: {
      fitmentType: { type: String }, // e.g., "Mil-Spec"
      id: { type: String }
    }
  },
  incompatibleGrip: {
    type: { type: String, enum: GRIP_TYPES }, // e.g., "Oversized Pistol Grip"
    specifications: {
      fitmentType: { type: String }, // e.g., "Custom"
      id: { type: String }
    }
  },
  requiredScrewOrPin: {
    type: { type: String, enum: TRIGGER_GUARD_SCREW_TYPES, required: true }, // e.g., "Roll Pin"
    thread: { type: String }, // e.g., "None"
    length: { type: String, required: true } // e.g., "0.25 in"
  },
  requiredSafetySelector: {
    type: { type: String, enum: SAFETY_SELECTOR_TYPES }, // e.g., "Standard"
    specifications: {
      fitmentType: { type: String }, // e.g., "Mil-Spec"
      id: { type: String }
    }
  },
  incompatibleSafetySelector: {
    type: { type: String, enum: SAFETY_SELECTOR_TYPES } // e.g., null
  },
  magwellCompatibility: {
    type: { type: String, enum: MAGWELL_TYPES }, // e.g., "STANAG"
    flared: { type: Boolean } // e.g., false
  },
  ergonomicRequirements: { type: String }, // e.g., "Undercut design supports high-grip shooting..."
  handOrientation: { type: String, enum: HAND_ORIENTATIONS, default: 'Ambidextrous' }, // e.g., "Ambidextrous"
  installationType: { type: String, enum: ['Drop-In', 'Gunsmithing'], required: true }, // e.g., "Drop-In"
  notes: { type: String }, // e.g., "No gunsmithing required..."
  fitmentExplanation: { type: String }, // e.g., "Designed for standard AR-15 lowers..."
  version: { type: String, required: true }, // e.g., "1.0"
  lastUpdated: { type: String, required: true }, // e.g., "2025-04-12"
  compatibilityStatus: { type: String }, // e.g., "Verified"
  statusReason: { type: String }, // e.g., "Tested with Mil-Spec components"
  compatibilityWarnings: [{ type: String }], // e.g., ["Check lower receiver for integrated..."]
  suggestedComponents: [{
    category: { type: String }, // e.g., "Grip"
    type: { type: String }, // e.g., "Magpul MOE Grip"
    specifications: { type: Object }, // e.g., { "fitmentType": "Mil-Spec" }
    id: { type: String }
  }]
});

// AR-15 Trigger Guard Variant Schema
const ar15TriggerGuardSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'AR15TriggerGuardGroup', required: true }, // e.g., "507f1f77bcf86cd799439011"
  attributes: {
    color: { type: String, enum: TRIGGER_GUARD_COLORS }, // e.g., "Black"
    materialType: { type: String, enum: TRIGGER_GUARD_MATERIALS }, // e.g., "Aluminum"
    texture: { type: String, enum: TRIGGER_GUARD_TEXTURES }, // e.g., "Smooth"
    subCategory: { type: String, enum: TRIGGER_GUARD_SUBCATEGORIES }, // e.g., "Enhanced"
    shape: { type: String, enum: TRIGGER_GUARD_SHAPES }, // e.g., "Enlarged"
    features: [{ type: String, enum: TRIGGER_GUARD_FEATURES }], // e.g., ["Enlarged Trigger Area", ...]
    finishType: { type: String, enum: TRIGGER_GUARD_FINISHES }, // e.g., "Anodized"
    hasIntegratedMagwellFlare: { type: Boolean }, // e.g., false
    undercutDesign: { type: Boolean }, // e.g., true
    antiSlipDesign: { type: Boolean }, // e.g., false
    triggerAreaWidth: { type: String } // e.g., "0.9 in"
  },
  upc: { type: String, required: true, unique: true }, // e.g., "873750002996"
  images: [{ type: String }], // e.g., ["https://example.com/..."]
  vendors: [vendorSchema], // e.g., [{ name: "Brownells", ... }]
  compatibility: ar15TriggerGuardCompatibilitySchema,
  customerRating: { type: Number, default: 0 } // e.g., 0
});

// Add text index for full-text search
ar15TriggerGuardSchema.index({
  'attributes.materialType': 'text',
  'attributes.shape': 'text',
  'attributes.features': 'text',
  'attributes.subCategory': 'text',
  'attributes.finishType': 'text',
  'attributes.triggerAreaWidth': 'text'
}, {
  weights: {
    'attributes.materialType': 5,
    'attributes.shape': 5,
    'attributes.features': 3,
    'attributes.subCategory': 3,
    'attributes.finishType': 2,
    'attributes.triggerAreaWidth': 1
  },
  name: 'TextIndex'
});

// Add indexes for performance
ar15TriggerGuardSchema.index({ groupId: 1 });
ar15TriggerGuardSchema.index({ 'compatibility.handOrientation': 1 });
ar15TriggerGuardSchema.index({ 'compatibility.magwellCompatibility.type': 1 });

// Export the model
module.exports = mongoose.model('AR15TriggerGuard', ar15TriggerGuardSchema);