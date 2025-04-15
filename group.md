# AR-15 Part Group and Variant Documentation

This document describes the `AR15PartGroup` model and its relationship with variant objects for AR-15 gun parts, supporting an app for compatibility checking and price comparison via affiliate links, without holding inventory. The `AR15PartGroup` model defines shared properties for part groups displayed on the inventory page, while variant objects provide specific configurations shown on the details page.

## AR15PartGroup Model
The `AR15PartGroup` model is a single Mongoose model representing all part groups (e.g., handguards, upper receivers) on the inventory page. It uses a `partType` field to categorize the part and a `category` array for hierarchical grouping.

### Example JSON: AR15PartGroup (Complete Upper Receiver)
This represents a group for a complete upper receiver, as seen on an inventory page like OpticsPlanet.

```json
{
  "model": "AR15PartGroup",
  "_id": "507f1f77bcf86cd799439012",
  "name": "7.5\" 5.56 CMV Barrel, Pistol length",
  "partType": "CompleteUpperReceiver",
  "category": ["CompleteUpperReceiver", "UpperReceiver"],
  "description": "Complete upper receiver with a 7.5-inch 5.56mm CMV barrel, designed for AR-15 pistol builds, featuring a pistol-length gas system and 7075-T6 aluminum construction.",
  "lowestPrice": 123.89,
  "popularity": 150,
  "averageRating": 4.5,
  "createdAt": "2025-04-15T10:28:00.000Z",
  "updatedAt": "2025-04-15T10:28:00.000Z"
}
```

#### Field Definitions
- **_id**: MongoDB-generated identifier, used as the `groupId` in variant objects.
- **name**: Display name for the group on the inventory page (e.g., "7.5\" 5.56 CMV Barrel, Pistol length").
- **partType**: Specific type of part, one of 38 possible values (e.g., "CompleteUpperReceiver").
- **category**: Array of categories for hierarchical grouping (e.g., `["CompleteUpperReceiver", "UpperReceiver"]`).
- **description**: Brief overview for the inventory page.
- **lowestPrice**: Lowest price among all variants (e.g., $123.89).
- **popularity**: Metric for sorting groups by popularity.
- **averageRating**: Average rating from reviews (e.g., 4.5 stars).
- **createdAt/updatedAt**: Timestamps for tracking creation and updates.

### Purpose
The `AR15PartGroup` object is used to populate the inventory page, providing a high-level view of each part group with key metrics (price, rating, popularity). The `category` array allows filtering by broader categories (e.g., "UpperReceiver") while `partType` enables specific filtering (e.g., "CompleteUpperReceiver").

## Variant Object
Variant objects represent specific configurations of a part group (e.g., different finishes, lengths) and are linked to the `AR15PartGroup` via the `groupId` field, which matches the group's `_id`. These objects are stored separately (e.g., in collections like `AR15CompleteUpperReceiver`) and displayed on the details page.

### Example JSON: Variant (AR15CompleteUpperReceiver)
This variant is linked to the `AR15PartGroup` above via `groupId`.

```json
{
  "model": "AR15CompleteUpperReceiver",
  "upc": "123456789012",
  "groupId": "507f1f77bcf86cd799439012",
  "receiverType": "Mil-Spec",
  "takedownPinDiameter": 0.25,
  "barrelNutThread": "1-7/16-16",
  "railType": "Picatinny",
  "material": "7075-T6 Aluminum",
  "weight": 48.0,
  "finish": "Hardcoat Anodized",
  "color": ["Black"],
  "caliber": "5.56mm",
  "length": 24.0,
  "brand": "Aero Precision",
  "durability": "High-strength, corrosion-resistant",
  "notes": "Includes 7.5in Mil-Spec barrel, BCG, and charging handle; compatible with Mil-Spec lowers",
  "categoryTags": ["UpperReceiver", "Receiver"],
  "includedParts": ["AR15BarrelGroup", "AR15HandguardGroup", "AR15BoltCarrierGroupGroup", "AR15ChargingHandleGroup", "AR15GasSystemGroup", "AR15MuzzleDeviceGroup"],
  "vendor": []
}
```

#### Key Linking Field
- **groupId**: Matches the `_id` of the corresponding `AR15PartGroup` (e.g., `"507f1f77bcf86cd799439012"`), establishing the relationship between the group and its variants.

## Relationship Between AR15PartGroup and Variants
- **Inventory Page**: The `AR15PartGroup` objects are queried to display groups (e.g., "7.5\" 5.56 CMV Barrel, Pistol length") with their `lowestPrice`, `averageRating`, and `popularity`. The `category` array enables filtering (e.g., show all "UpperReceiver" parts).
- **Details Page**: When a user selects a group, the app queries variants with the matching `groupId` (e.g., all `AR15CompleteUpperReceiver` documents where `groupId` is `"507f1f77bcf86cd799439012"`) to show specific configurations (e.g., Black Anodized, FDE Cerakote versions).
- **Data Management**: The `AR15PartGroup` consolidates shared data (e.g., name, description) at the group level, while variant objects store configuration-specific details (e.g., weight, finish), reducing redundancy and ensuring consistency.

This structure supports efficient querying, filtering, and display for your app’s inventory and details pages.
