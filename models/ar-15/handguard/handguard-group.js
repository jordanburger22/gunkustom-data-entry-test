const mongoose = require('mongoose');

// Schema for shared handguard group data
const ar15HandguardGroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Magpul MOE SL Handguard"
  description: { type: String },
  components: {
    specifications: {
      brand: { type: String }, // e.g., "Magpul"
      innerDiameter: { type: String }, // Matches JSON schema for variant dimensions, used here for group-level specs
      outerDiameter: { type: String }, // Matches JSON schema for variant dimensions
      includesMountingHardware: { type: Boolean }, // e.g., false
      platformCompatibility: { type: String } // e.g., "AR-15"
    }
  },
  popularityScore: { type: Number, default: 0 }
});

// Add text index for full-text search
ar15HandguardGroupSchema.index({
  name: 'text',
  'components.specifications.brand': 'text'
}, {
  weights: {
    name: 10,
    'components.specifications.brand': 5
  },
  name: 'TextIndex'
});

// Add index for performance
ar15HandguardGroupSchema.index({ popularityScore: -1 });

// Export the model
module.exports = mongoose.model('AR15HandguardGroup', ar15HandguardGroupSchema);