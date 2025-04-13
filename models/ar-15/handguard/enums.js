// handguard-enums.js

// Enum for handguard colors
// Common colors for AR-15 handguards, including Cerakote and anodized options
const HANDGUARD_COLORS = [
  'Black',
  'Flat Dark Earth',
  'OD Green',
  'Gray',
  'Burnt Bronze',
  'Tungsten', // Added: Popular Cerakote color (e.g., Aero Precision)
  'Coyote Tan', // Added: Common for tactical setups
  'Midnight Bronze', // Added: Seen in BCM, Geissele
  'Sniper Gray', // Added: Cerakote standard
  'Foliage Green' // Added: For mil-spec aesthetics
];

// Enum for handguard material types
// Materials used in AR-15 handguards, focusing on durability and weight
const HANDGUARD_MATERIALS = [
  'Aluminum',
  'Polymer',
  'Carbon Fiber',
  'Aluminum (6061-T6)', // Specific alloy for precision
  'Aluminum (7075-T6)', // Added: Stronger alloy (e.g., Geissele, Daniel Defense)
  'Magnesium Alloy', // Added: Lightweight option (e.g., some high-end models)
  'Steel', // Added: Rare, used in heavy-duty quad rails
  'Titanium' // Added: Exotic, lightweight, and strong (e.g., V Seven)
];

// Enum for handguard finish types
// Finishes affecting appearance and durability
const HANDGUARD_FINISHES = [
  'Anodized',
  'Cerakote',
  'Matte',
  'Hardcoat Anodized', // Added: Mil-spec Type III (e.g., Aero Precision)
  'Polished', // Added: Rare, for aesthetic builds
  'Nitron', // Added: SIG Sauer-style finish
  'Parkerized', // Added: Traditional steel finish
  'DuraCoat' // Added: Alternative to Cerakote
];

// Enum for handguard profiles
// Shapes affecting grip and accessory mounting
const HANDGUARD_PROFILES = [
  'Slim',
  'Standard',
  'Quad Rail',
  'Octagonal', // Added: Seen in M-LOK designs (e.g., BCM MCMR)
  'Round', // Added: Common in lightweight free-float
  'Hybrid' // Added: Combines slim and quad rail features
];

// Enum for handguard subcategories
// Types of handguard designs and attachment systems
const HANDGUARD_SUBCATEGORIES = [
  'Free Float',
  'Drop-In',
  'Quad Rail',
  'KeyMod',
  'M-LOK',
  'Hybrid', // Added: Combines KeyMod/M-LOK (e.g., Geissele Super Modular)
  'Skeletal', // Added: Lightweight, cut-out designs
  'Retro' // Added: For classic A2 or CAR-15 builds
];

// Enum for handguard features
// Functional and aesthetic features
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
  'Barrel Nut Cutouts', // Added: For low-profile gas blocks
  'Angled Foregrip Compatibility', // Added: For modern grips
  'Built-In Handstop', // Added: Seen in BCM, Geissele
  'Lightening Cuts', // Added: Weight reduction
  'Integrated Optics Rail', // Added: For red dots or scopes
  'Textured Grip Surface' // Added: Enhanced handling
];

// Enum for barrel nut types
// Attachment mechanisms for handguards
const BARREL_NUT_TYPES = [
  'Standard Mil-Spec',
  'Proprietary',
  'Aero Precision',
  'Delta Ring',
  'YHM Diamond', // Added: Yankee Hill Machine
  'BCM KMR', // Added: Bravo Company proprietary
  'Geissele BAR', // Added: Geissele proprietary
  'Midwest Industries' // Added: Common aftermarket
];

// Enum for mounting system types
// Accessory attachment systems
const MOUNTING_SYSTEMS = [
  'M-LOK',
  'KeyMod',
  'Picatinny',
  'Direct Attach',
  'Weaver', // Added: Older standard, still compatible
  'Magpul MOE', // Added: For polymer handguards
  'Slick' // Added: No mounting, smooth surface
];

// Enum for rail compatibility types
// Rail systems for accessory attachment
const RAIL_COMPATIBILITIES = [
  'Picatinny',
  'Weaver',
  'None',
  'NATO STANAG', // Added: For military-standard rails
  'Magpul MOE Slots' // Added: For specific polymer designs
];

// Enum for hand orientation
// Ergonomic considerations
const HANDGUARD_HAND_ORIENTATIONS = [
  'Right-Handed',
  'Left-Handed',
  'Ambidextrous'
];

// Enum for gas system types
// Compatibility with AR-15 gas systems
const GAS_SYSTEM_TYPES = [
  'Carbine',
  'Mid-Length',
  'Rifle-Length',
  'Pistol',
  'Short-Stroke Piston', // Added: For piston-driven ARs
  'Adjustable Gas Block', // Added: For tunable systems
  'Dissipator' // Added: For mock-dissipator builds
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
  GAS_SYSTEM_TYPES
};