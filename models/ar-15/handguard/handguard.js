const mongoose = require('mongoose');
const { Schema } = mongoose;

// Requires enums from models/handguard/enums.js
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

// Define the AR-15 Handguard base schema (common attributes)
const AR15HandguardBaseSchema = new Schema({
  // Physical and cosmetic attributes of the handguard
  attributes: {
    materialType: {
      type: String,
      enum: HANDGUARD_MATERIALS, // Enum for materials
    },
    finishType: {
      type: String,
      enum: HANDGUARD_FINISHES, // Enum for finishes
    },
    profile: {
      type: String,
      enum: HANDGUARD_PROFILES, // Enum for profiles
    },
    features: {
      type: [String],
      enum: HANDGUARD_FEATURES, // Enum for features
    },
    length: String,
    weight: String,
    innerDiameter: String,
    outerDiameter: String,
    hasCutouts: Boolean,
    ventedDesign: Boolean
  },

  // Universal Product Code (unique identifier)
  upc: {
    type: String,
    required: true,
    unique: true
  },

  // Image URLs or paths
  images: [String],

  vendors: [Object],
  // Customer rating (default 0 if unrated)
  customerRating: {
    type: Number,
    default: 0
  }
});

// Define the AR-15 Handguard compatibility schema (for compatibility-related fields)
const AR15HandguardCompatibilitySchema = new Schema({
  // Compatibility requirements and restrictions
  compatibility: {
    // Must be used with one of these upper receiver types
    requiredUpperReceiver: [
      {
        type: {
          type: String,
          required: true
        },
        specifications: {
          fitmentType: {
            type: String,
            required: true
          },
          id: String // Reference ID for specific receiver
        }
      }
    ],

    // Known incompatible upper receiver types
    incompatibleUpperReceiver: [
      {
        type: String,
        specifications: {
          fitmentType: String,
          id: String
        }
      }
    ],

    // Required barrel nut specifications
    requiredBarrelNut: {
      type: {
        type: String,
        enum: BARREL_NUT_TYPES, // Enum for barrel nut types
        required: true
      },
      thread: { type: String, required: true },
      diameter: { type: String, required: true }
    },

    // Known incompatible barrel nut types
    incompatibleBarrelNut: {
      type: {
        type: String,
        enum: BARREL_NUT_TYPES // Enum for barrel nut types
      },
      specifications: {
        thread: String,
        id: String
      }
    },

    // Mounting system (e.g., M-LOK, KeyMod, etc.)
    mountingSystem: {
      type: {
        type: String,
        enum: MOUNTING_SYSTEMS, // Enum for mounting systems
        required: true
      },
      slots: Number // Number of mounting slots
    },

    // Rail system compatibility
    railCompatibility: {
      type: {
        type: String,
        enum: RAIL_COMPATIBILITIES // Enum for rail compatibility
      },
      continuous: Boolean // True if the rail is continuous across the top
    },

    // Barrel diameter compatibility range
    barrelDiameterCompatibility: {
      min: String,
      max: String
    },

    // Handguard orientation
    handOrientation: {
      type: String,
      enum: HANDGUARD_HAND_ORIENTATIONS // Enum for handguard orientations
    },

    // General notes and fitment explanation
    notes: String,
    fitmentExplanation: String,

    // Metadata for version control and updates
    version: {
      type: String,
      required: true
    },
    lastUpdated: {
      type: String,
      required: true
    },

    // Additional compatibility metadata
    compatibilityStatus: String,        // e.g., "verified", "experimental"
    statusReason: String,               // Explanation for status
    compatibilityWarnings: [String],   // Any alerts for edge cases or issues

    // Suggested components that pair well with this handguard
    suggestedComponents: [
      {
        category: String,
        type: String,
        specifications: Schema.Types.Mixed,
        id: String
      }
    ],

    // Required gas block size and shape
    requiredGasBlock: {
      type: String,
      specifications: {
        height: String,
        width: String,
        id: String
      }
    },

    // Known incompatible gas blocks
    incompatibleGasBlock: {
      type: String,
      specifications: {
        height: String,
        id: String
      }
    },

    // Barrel profile compatibility
    barrelProfileCompatibility: {
      compatibleProfiles: [String],
      incompatibleProfiles: [String],
      maxDiameterAtChamber: String
    },

    // Front sight compatibility
    frontSightCompatibility: {
      type: String,
      requiresRemoval: Boolean,
      specifications: {
        height: String,
        id: String
      }
    },

    // Delta ring fitment
    deltaRingCompatibility: {
      type: String,
      requiresDeltaRing: Boolean,
      requiresRemoval: Boolean
    },

    // Muzzle device clearance and compatibility
    muzzleDeviceCompatibility: {
      type: String,
      clearanceDiameter: String,
      lengthRelation: String,
      id: String
    }
  }
});

// Define the final AR-15 Handguard schema that combines both base and compatibility schemas
const AR15HandguardSchema = new Schema({
  // Reference to a group of handguards (e.g., product line)
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'AR15HandguardGroup',
    required: true
  },

  // Embed base schema (common attributes)
  base: {
    type: AR15HandguardBaseSchema, // Reference to the base schema
    required: true
  },

  // Embed compatibility schema
  compatibility: {
    type: AR15HandguardCompatibilitySchema, // Reference to the compatibility schema
    required: true
  }
});



// Add text index for full-text search
ar15HandguardSchema.index({
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
  ar15HandguardSchema.index({ groupId: 1 });
  ar15HandguardSchema.index({ "compatibility.handOrientation": 1 });
  ar15HandguardSchema.index({ "compatibility.magwellCompatibility.type": 1 });
  ar15HandguardSchema.index({ "compatibility.requiredBufferTube.type": 1 });
  ar15HandguardSchema.index({ "compatibility.requiredGripScrew.type": 1 });
  
// Export the final AR-15 Handguard model
module.exports = mongoose.model('AR15Handguard', AR15HandguardSchema);
