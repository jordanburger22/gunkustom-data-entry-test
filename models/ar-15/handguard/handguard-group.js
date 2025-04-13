const mongoose = require('mongoose');

// Schema for shared handguard group data
const ar15HandguardGroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Magpul MOE SL Handguard"
  description: { type: String },
  components: {
    specifications: {
      brand: { type: String }, // e.g., "Magpul"
      weight: { type: String }, // e.g., "8.7 oz"
      length: { type: String }, // e.g., "8.9 in"
      innerDiameter: { type: String }, // Matches JSON schema for variant dimensions, used here for group-level specs
      outerDiameter: { type: String }, // Matches JSON schema for variant dimensions
      includesMountingHardware: { type: Boolean }, // e.g., false
      platformCompatibility: { type: String }, // e.g., "AR-15"
      materialType: { type: String, enum: require('./enums').HANDGUARD_MATERIALS }, // ADDED: Integrated `HANDGUARD_MATERIALS` from enums.js to specify group-level material, aligning with JSON
      finishType: { type: String, enum: require('./enums').HANDGUARD_FINISHES } // ADDED: Integrated `HANDGUARD_FINISHES` to specify group-level finish, aligning with JSON
    }
  },
  popularityScore: { type: Number, default: 0 }
});

// Add text index for full-text search
ar15HandguardGroupSchema.index({
  name: 'text',
  'components.specifications.brand': 'text',
  'components.specifications.materialType': 'text', // ADDED: Included `materialType` in text index for better searchability
  'components.specifications.finishType': 'text' // ADDED: Included `finishType` in text index
}, {
  weights: {
    name: 10,
    'components.specifications.brand': 5,
    'components.specifications.materialType': 3, // Lower weight for material
    'components.specifications.finishType': 2 // Lower weight for finish
  },
  name: 'TextIndex'
});

// Add index for performance
ar15HandguardGroupSchema.index({ popularityScore: -1 });

// Export the model
module.exports = mongoose.model('AR15HandguardGroup', ar15HandguardGroupSchema);