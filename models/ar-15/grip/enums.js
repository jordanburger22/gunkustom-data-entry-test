// grip-enums.js

// Enum for grip texture
const TEXTURES = ["Smooth", "Textured", "Rubberized", "Cobblestone", "Stippled", "Checkered", "Non-Slip Textured Surface", "Aggressive Textured Surface"];

// Enum for hand orientation
const HAND_ORIENTATIONS = ["Right-Handed", "Left-Handed", "Ambidextrous"];

// Enum for grip sub-category
const GRIP_SUBCATEGORIES = ["Pistol Grip", "Vertical Foregrip", "Angled Foregrip"];

// Enum for grip shape
const GRIP_SHAPES = ["Ergonomic", "Straight", "Contoured", "Beavertail", "Pistol", "Vertical", "Ergonomic with extended tang"];

// Enum for grip features (can be used as an array)
const GRIP_FEATURES = [
  "Finger Grooves",
  "Palm Swells",
  "Thumb Rest",
  "Beavertail Extension",
  "Non-Slip Surface",
  "Grooved Back Straps",
  "Receiver Gap Filler",
  "Storage Compartment",
  "Battery Cradle",
  "Anti-Slip Design",
  "Recoil Absorbing",
  "Heat Resistant"
];

// Enum for grip material type
const GRIP_MATERIALS = ["Polymer", "Rubber", "Aluminum", "Wood", "G10", "OverMolded Rubber", "Thermoplastic Elastomer", "Reinforced Polymer"];

// Enum for grip finish type
const GRIP_FINISHES = ["Textured", "Smooth", "Matte", "Glossy", "Stippled", "Anodized", "Cerakote"];

// Enum for grip color
const GRIP_COLORS = ["Black", "FDE", "Scorched Dark Earth", "OD Green", "Gray", "Tan", "Burnt Bronze", "Sniper Gray", "Tungsten", "Olive Drab", "Desert Tan", "Coyote Brown", "Stealth Gray"];

// Enum for grip screw type
const GRIP_SCREW_TYPES = ["Hex Head", "Slotted", "Phillips", "Torx"];

// Enum for trigger guard type
const TRIGGER_GUARD_TYPES = ["Standard", "Enhanced", "Integrated", "Oversized", "Custom"];

// Enum for safety selector type
const SAFETY_SELECTOR_TYPES = ["Standard", "Ambidextrous", "Extended Ambidextrous", "Custom"];

// Enum for magwell type
const MAGWELL_TYPES = ["STANAG", "Custom"];

// Enum for buffer tube type
const BUFFER_TUBE_TYPES = ["Mil-Spec", "Commercial", "Custom"];

// Export all enums
module.exports = {
  TEXTURES,
  HAND_ORIENTATIONS,
  GRIP_SUBCATEGORIES,
  GRIP_SHAPES,
  GRIP_FEATURES,
  GRIP_MATERIALS,
  GRIP_FINISHES,
  GRIP_COLORS,
  GRIP_SCREW_TYPES,
  TRIGGER_GUARD_TYPES,
  SAFETY_SELECTOR_TYPES,
  MAGWELL_TYPES,
  BUFFER_TUBE_TYPES
};