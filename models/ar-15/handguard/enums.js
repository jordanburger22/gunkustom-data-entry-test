// handguard-enums.js

// Enum for handguard colors
const HANDGUARD_COLORS = [
  'Black',
  'Flat Dark Earth',
  'OD Green',
  'Gray',
  'Burnt Bronze',
  'Tungsten',
  'Coyote Tan',
  'Midnight Bronze',
  'Sniper Gray',
  'Foliage Green'
];

// Enum for handguard material types
const HANDGUARD_MATERIALS = [
  'Aluminum',
  'Polymer',
  'Carbon Fiber',
  'Aluminum (6061-T6)',
  'Aluminum (7075-T6)',
  'Magnesium Alloy',
  'Steel',
  'Titanium'
];

// Enum for handguard finish types
const HANDGUARD_FINISHES = [
  'Anodized',
  'Cerakote',
  'Matte',
  'Hardcoat Anodized',
  'Polished',
  'Nitron',
  'Parkerized',
  'DuraCoat'
];

// Enum for handguard profiles
const HANDGUARD_PROFILES = [
  'Slim',
  'Standard',
  'Quad Rail',
  'Octagonal',
  'Round',
  'Hybrid'
];

// Enum for handguard subcategories
const HANDGUARD_SUBCATEGORIES = [
  'Free Float',
  'Drop-In',
  'Quad Rail',
  'KeyMod',
  'M-LOK',
  'Hybrid',
  'Skeletal',
  'Retro'
];

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
  'Full-Length Picatinny Rail',
  'M-LOK Slots',
  'KeyMod Slots',
  'Barrel Nut Cutouts',
  'Angled Foregrip Compatibility',
  'Built-In Handstop',
  'Lightening Cuts',
  'Integrated Optics Rail',
  'Textured Grip Surface'
];

const BARREL_NUT_TYPES = [
  'Standard Mil-Spec',
  'Proprietary',
  'Aero Precision',
  'Delta Ring',
  'YHM Diamond',
  'BCM KMR',
  'Geissele BAR',
  'Midwest Industries',
  'ATLAS System'
];

// Enum for mounting system types
const MOUNTING_SYSTEMS = [
  'M-LOK',
  'KeyMod',
  'Picatinny',
  'Direct Attach',
  'Weaver',
  'Magpul MOE',
  'Slick'
];

// Enum for rail compatibility types
const RAIL_COMPATIBILITIES = [
  'Picatinny',
  'Weaver',
  'None',
  'NATO STANAG',
  'Magpul MOE Slots'
];

// Enum for hand orientation
const HANDGUARD_HAND_ORIENTATIONS = [
  'Right-Handed',
  'Left-Handed',
  'Ambidextrous'
];

// Enum for gas system types
const GAS_SYSTEM_TYPES = [
  'Carbine',
  'Mid-Length',
  'Rifle-Length',
  'Pistol',
  'Short-Stroke Piston',
  'Adjustable Gas Block',
  'Dissipator'
];

// Enum for installation types
const INSTALLATION_TYPES = [
  'Drop-In',
  'Gunsmithing'
];

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
  GAS_SYSTEM_TYPES,
  INSTALLATION_TYPES
};