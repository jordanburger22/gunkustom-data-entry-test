// handguard-enums.js

// Enum for handguard material types
const HANDGUARD_MATERIALS = ["Aluminum", "Polymer", "Carbon Fiber"];

// Enum for handguard finish types
const HANDGUARD_FINISHES = ["Anodized", "Cerakote", "Matte"];

// Enum for handguard profiles
const HANDGUARD_PROFILES = ["Slim", "Standard", "Quad Rail"];

// Enum for handguard features
const HANDGUARD_FEATURES = [
  "QD Mounts",
  "Heat Shields",
  "Anti-Rotation Tabs",
  "Modular Design",
  "Integrated Sling Swivel",
  "Ventilation Slots",
  "Integrated Bipod Mount",
  "Full-Length Top Rail"
];

// Enum for barrel nut types
const BARREL_NUT_TYPES = ["Standard Mil-Spec", "Proprietary", "Aero Precision"];

// Enum for mounting system types
const MOUNTING_SYSTEMS = ["M-LOK", "KeyMod", "Picatinny", "Direct Attach"];

// Enum for rail compatibility types
const RAIL_COMPATIBILITIES = ["Picatinny", "Weaver", "None"];

// Enum for hand orientation
const HANDGUARD_HAND_ORIENTATIONS = ["Right-Handed", "Left-Handed", "Ambidextrous"];

// Export all enums
module.exports = {
  HANDGUARD_MATERIALS,
  HANDGUARD_FINISHES,
  HANDGUARD_PROFILES,
  HANDGUARD_FEATURES,
  BARREL_NUT_TYPES,
  MOUNTING_SYSTEMS,
  RAIL_COMPATIBILITIES,
  HANDGUARD_HAND_ORIENTATIONS
};
