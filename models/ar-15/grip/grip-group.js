// ar15-grip-groups.js
const mongoose = require('mongoose');

// Schema for shared grip group data
const ar15GripGroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique name for the grip group, creates a unique index
  description: { type: String },
  components: {
    specifications: {
      brand: { type: String },
      weight: { type: String },
      length: { type: String },
      height: { type: String },
      width: { type: String },
      includesMountingHardware: { type: Boolean }
    }
  },
  popularityScore: { type: Number, default: 0 }
});

// Add text index for full-text search
ar15GripGroupSchema.index({
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
// Removed duplicate index on name, as unique: true already creates one
ar15GripGroupSchema.index({ popularityScore: -1 });

// Export the model
module.exports = mongoose.model('AR15GripGroup', ar15GripGroupSchema);