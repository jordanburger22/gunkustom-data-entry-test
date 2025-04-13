// handguard-enums.js

// Enum for handguard colors
const HANDGUARD_COLORS = ['Black', 'Flat Dark Earth', 'OD Green', 'Gray', 'Burnt Bronze']; // ADDED: For `color` field, aligning with grip/trigger guard patterns

// Enum for handguard material types
const HANDGUARD_MATERIALS = ['Aluminum', 'Polymer', 'Carbon Fiber']; // PRESERVED: Matches JSON and junior dev’s enums

// Enum for handguard finish types
const HANDGUARD_FINISHES = ['Anodized', 'Cerakote', 'Matte']; // PRESERVED: Matches JSON and junior dev’s enums

// Enum for handguard profiles
const HANDGUARD_PROFILES = ['Slim', 'Standard', 'Quad Rail']; // PRESERVED: Matches JSON and junior dev’s enums

// Enum for handguard subcategories
const HANDGUARD_SUBCATEGORIES = ['Free Float', 'Drop-In', 'Quad Rail', 'KeyMod', 'M-LOK']; // ADDED: For `subCategory`, aligning with grip/trigger guard

// Enum for handguard features
const HANDGUARD_FEATURES = [
  'QD Mounts',
  'Heat Shields',
  'Anti-Rotation Tabs',
  'Modular Design',
  'Integrated Sling Swivel',
  'Ventilation Slots',
  'Integrated Bipod Mount',
  'Full-Length Top Rail',
  'M-LOK Slots', // ADDED: Extended to include common feature, aligning with JSON’s intent
  'KeyMod Slots' // ADDED: Extended for completeness
];

// Enum for barrel nut types
const BARREL_NUT_TYPES = ['Standard Mil-Spec', 'Proprietary', 'Aero Precision', 'Delta Ring']; // CHANGED: Added 'Delta Ring' to support drop-in handguards like Magpul MOE SL

// Enum for mounting system types
const MOUNTING_SYSTEMS = ['M-LOK', 'KeyMod', 'Picatinny', 'Direct Attach']; // PRESERVED: Matches JSON and junior dev’s enums

// Enum for rail compatibility types
const RAIL_COMPATIBILITIES = ['Picatinny', 'Weaver', 'None']; // PRESERVED: Matches JSON and junior dev’s enums

// Enum for hand orientation
const HANDGUARD_HAND_ORIENTATIONS = ['Right-Handed', 'Left-Handed', 'Ambidextrous']; // PRESERVED: Matches junior dev’s enums, though schema defaults to 'Ambidextrous'

// Enum for gas system types
const GAS_SYSTEM_TYPES = ['Carbine', 'Mid-Length', 'Rifle-Length', 'Pistol']; // ADDED: For `requiredGasSystem` and `incompatibleGasSystem`, per JSON schema

// Export all enums
module.exports = {
  HANDGUARD_COLORS,
  HANDGUARD_MATERIALS,
  HANDGUARD_FINISHES,
  HANDGUARD_PROFILES,
  HANDGUARD_SUBCATEGORIES,
  HANDGUARD_FEATURES,
  BARREL_NUT_TYPES,
  MOUNTING_SYSTEMS,
  RAIL_COMPATIBILITIES,
  HANDGUARD_HAND_ORIENTATIONS,
  GAS_SYSTEM_TYPES
};