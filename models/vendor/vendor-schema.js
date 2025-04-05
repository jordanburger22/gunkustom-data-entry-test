// shared-schemas.js
const mongoose = require('mongoose');

// Schema for vendor details
const vendorSchema = new mongoose.Schema({
  vendorName: { type: String, required: true }, // e.g., "OpticsPlanet, Inc"
  affiliateLink: { type: String, required: true }, // e.g., "https://www.shareasale.com/m-pr.cfm?merchantID=4355&userID=3299258&productID=1234567890"
  price: { type: Number }, // e.g., 19.99
  availability: { type: String }, // e.g., "In Stock"
  shippingEstimate: { type: String } // e.g., "Free over $49"
});

module.exports = { vendorSchema };