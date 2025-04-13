const mongoose = require('mongoose');

// Schema for shared trigger guard group data
const ar15TriggerGuardGroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Magpul Enhanced Trigger Guard, AR-15"
  description: { type: String }, // e.g., "The Magpul Enhanced Trigger Guard is a drop-in aluminum replacement..."
  components: {
    specifications: {
      brand: { type: String }, // e.g., "Magpul"
      weight: { type: String }, // e.g., "0.4 oz"
      length: { type: String }, // e.g., "2.5 in"
      height: { type: String }, // e.g., "0.8 in"
      width: { type: String }, // e.g., "0.5 in"
      includesMountingHardware: { type: Boolean }, // e.g., true
      platformCompatibility: { type: String } // e.g., "AR-15, M4"
    }
  },
  popularityScore: { type: Number, default: 0 } // e.g., 0
});

// Add text index for full-text search
ar15TriggerGuardGroupSchema.index({
  name: 'text',
  'components.specifications.brand': 'text'
}, {
  weights: {
    name: 10, // Higher weight for name matches
    'components.specifications.brand': 5
  },
  name: 'TextIndex'
});

// Add indexes for performance
ar15TriggerGuardGroupSchema.index({ popularityScore: -1 });

// Export the model
module.exports = mongoose.model('AR15TriggerGuardGroup', ar15TriggerGuardGroupSchema);