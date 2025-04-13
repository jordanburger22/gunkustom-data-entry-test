// ar15-handguard-groups.js
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Schema for shared handguard group data
const handguardGroup = new Schema({
    name: { type: String, required: true, unique: true }, // Unique name for the handguard group, creates a unique index
    description: { type: String },
    components: {
      specifications: {
        brand: { type: String },
        weight: { type: String },
        length: { type: String },
        diameter: { type: String },
        includesMountingHardware: { type: Boolean }
      }
    },
    popularityScore: { type: Number, default: 0 }
  });

  // Index for full text search
  ar15handguardGroupSchema.index = ({
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