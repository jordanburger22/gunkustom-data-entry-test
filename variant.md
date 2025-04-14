# AR-15 Gun Parts Compatibility Matrix

This document outlines compatibility matrices and example specifications for AR-15 gun parts, designed to support an app for compatibility checking and price comparison via affiliate links, without holding inventory. It covers 37 variant models, split into upper receiver (17) and lower receiver (20) groups. Each model includes:

- **Compatibility Matrix**: Lists all interactions (as Model A and Model B) with direct comparison checks (e.g., `pinDiameter === triggerPinDiameter`).
- **Example JSON Object**: Includes validated compatibility fields (e.g., diameters, calibers), customer-relevant specs (e.g., material, weight, finish), and a `groupId` referencing the corresponding group model/schema (e.g., `AR15UpperReceiverGroup` or `AR15LowerReceiverGroup`). All fields are optional to prevent errors.

Composite parts use `includedParts` (e.g., `["AR15BarrelGroup"]`) to denote subparts, and `categoryTags` (e.g., `["UpperReceiver"]`) aid primary searches. An empty `vendor` array is included for future affiliate links.

---

## AR15Handguard
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                               |
|-----------------------|-----------------------|---------------------------------------------------------------------------------------------------|
| Handguard             | CompleteUpperReceiver | `requiredUpperReceiverType` === `receiverType`                                                    |
| Handguard             | StrippedUpperReceiver | `requiredUpperReceiverType` === `receiverType`                                                    |
| Handguard             | BarrelNut             | `requiredBarrelNutType` === `type` AND (`requiredBarrelNutThread` === `thread` OR both undefined) |
| Handguard             | Barrel                | `innerDiameter` >= `outerDiameterAtGasPort` AND `barrelDiameterMax` >= `outerDiameterAtGasPort`   |
| Handguard             | GasSystem             | `gasSystemCompatibility` includes `gasLength`                                                     |
| CompleteUpperReceiver | Handguard             | `receiverType` === `requiredUpperReceiverType`                                                    |
| StrippedUpperReceiver | Handguard             | `receiverType` === `requiredUpperReceiverType`                                                    |
| BarrelNut             | Handguard             | `type` === `requiredBarrelNutType` AND (`thread` === `requiredBarrelNutThread` OR both undefined) |
| Barrel                | Handguard             | `outerDiameterAtGasPort` <= `innerDiameter` AND `outerDiameterAtGasPort` <= `barrelDiameterMax`   |
| GasSystem             | Handguard             | `gasLength` in `gasSystemCompatibility`                                                           |

### Example JSON
```json
{
  "model": "AR15Handguard",
  "upc": "815421021035",
  "groupId": "507f1f77bcf86cd799439011",
  "length": 12.7,
  "innerDiameter": 1.3,
  "mountingSystem": "M-LOK",
  "railType": "Picatinny",
  "requiredBarrelNutType": "Mil-Spec",
  "requiredUpperReceiverType": "Mil-Spec",
  "gasSystemCompatibility": ["Mid-length", "Carbine"],
  "barrelDiameterMax": 1.0,
  "material": "6061-T6 Aluminum",
  "weight": 8.5,
  "finish": "Hardcoat Anodized",
  "color": ["Black"],
  "mountingSystemVariants": ["M-LOK", "KeyMod"],
  "railLength": 12.7,
  "attachmentType": "Free-Float",
  "brandExample": "Aero Precision",
  "durability": "High-strength, corrosion-resistant",
  "notes": "Compatible with Mil-Spec upper receivers, ideal for tactical builds",
  "categoryTags": ["Handguard", "UpperReceiver"],
  "includedParts": ["AR15HandguardGroup"],
  "vendor": []
}
```

---

## AR15CompleteUpperReceiver
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                     |
|-----------------------|-----------------------|---------------------------------------------------------------------------------------------------------|
| CompleteUpperReceiver | Handguard             | `receiverType` === `requiredUpperReceiverType`                                                          |
| CompleteUpperReceiver | StrippedUpperReceiver | `receiverType` === `receiverType` (via `includedParts`)                                                 |
| CompleteUpperReceiver | BarrelNut             | `barrelNutThread` === `thread` OR both undefined                                                        |
| CompleteUpperReceiver | Barrel                | Included `AR15BarrelGroup` in `includedParts`, `receiverType` === `receiverFit`                         |
| CompleteUpperReceiver | BoltCarrierGroup      | Included `AR15BoltCarrierGroupGroup` in `includedParts`, `receiverType` === `receiverFit`               |
| CompleteUpperReceiver | ChargingHandle        | Included `AR15ChargingHandleGroup` in `includedParts`, `receiverType` === `receiverFit`                 |
| CompleteUpperReceiver | GasSystem             | Included `AR15GasSystemGroup` in `includedParts`, `receiverType` compatible with barrel’s `receiverFit` |
| CompleteUpperReceiver | MuzzleDevice          | Included `AR15MuzzleDeviceGroup` in `includedParts`, matches barrel’s `threading` and `caliber`         |
| Handguard             | CompleteUpperReceiver | `requiredUpperReceiverType` === `receiverType`                                                          |
| StrippedUpperReceiver | CompleteUpperReceiver | `receiverType` === `receiverType` (via `includedParts`)                                                 |
| BarrelNut             | CompleteUpperReceiver | `thread` === `barrelNutThread` OR both undefined                                                        |
| Barrel                | CompleteUpperReceiver | Included in `includedParts` as `AR15BarrelGroup`, `receiverFit` === `receiverType`                      |
| BoltCarrierGroup      | CompleteUpperReceiver | Included in `includedParts` as `AR15BoltCarrierGroupGroup`, `receiverFit` === `receiverType`            |
| ChargingHandle        | CompleteUpperReceiver | `receiverFit` === `receiverType`                                                                        |
| GasSystem             | CompleteUpperReceiver | Included in `includedParts` as `AR15GasSystemGroup`                                                     |
| MuzzleDevice          | CompleteUpperReceiver | Included in `includedParts` as `AR15MuzzleDeviceGroup`, matches barrel’s `threading` and `caliber`      |
| CompleteLowerReceiver | CompleteUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes barrel’s `caliber`  |

### Example JSON
```json
{
  "model": "AR15CompleteUpperReceiver",
  "upc": "123456789012",
  "groupId": "507f1f77bcf86cd799439011",
  "receiverType": "Mil-Spec",
  "barrelNutThread": "1-7/16-16",
  "railType": "Picatinny",
  "material": "7075-T6 Aluminum",
  "weight": 48.0,
  "finish": "Hardcoat Anodized",
  "color": ["Black"],
  "caliber": "5.56mm",
  "length": 24.0,
  "brandExample": "BCM",
  "durability": "High-strength, corrosion-resistant",
  "notes": "Includes Mil-Spec barrel, BCG, and charging handle; compatible with Mil-Spec lowers",
  "categoryTags": ["UpperReceiver", "Receiver"],
  "includedParts": ["AR15BarrelGroup", "AR15HandguardGroup", "AR15BoltCarrierGroupGroup", "AR15ChargingHandleGroup", "AR15GasSystemGroup", "AR15MuzzleDeviceGroup"],
  "vendor": []
}
```

---

## AR15StrippedUpperReceiver
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                 |
|-----------------------|-----------------------|-----------------------------------------------------------------------------------------------------|
| StrippedUpperReceiver | Handguard             | `receiverType` === `requiredUpperReceiverType`                                                      |
| StrippedUpperReceiver | Barrel                | `receiverType` === `receiverFit`                                                                    |
| StrippedUpperReceiver | BoltCarrierGroup      | `receiverType` === `receiverFit`                                                                    |
| StrippedUpperReceiver | ChargingHandle        | `receiverType` === `receiverFit`                                                                    |
| StrippedUpperReceiver | ForwardAssist         | `receiverType` === `forwardAssistFit`                                                               |
| StrippedUpperReceiver | EjectionPortCover     | `receiverType` === `ejectionPortFit`                                                                |
| StrippedUpperReceiver | CompleteLowerReceiver | `receiverType` === `receiverFit` AND barrel/bolt `caliber` in `caliberCompatibility` (via assembly) |
| Handguard             | StrippedUpperReceiver | `requiredUpperReceiverType` === `receiverType`                                                      |
| Barrel                | StrippedUpperReceiver | `receiverFit` === `receiverType`                                                                    |
| BoltCarrierGroup      | StrippedUpperReceiver | `receiverFit` === `receiverType`                                                                    |
| ChargingHandle        | StrippedUpperReceiver | `receiverFit` === `receiverType`                                                                    |
| ForwardAssist         | StrippedUpperReceiver | `forwardAssistFit` === `receiverType`                                                               |
| EjectionPortCover     | StrippedUpperReceiver | `ejectionPortFit` === `receiverType`                                                                |
| CompleteLowerReceiver | StrippedUpperReceiver | `receiverFit` === `receiverType` AND barrel/bolt `caliber` in `caliberCompatibility` (via assembly) |

### Example JSON
```json
{
  "model": "AR15StrippedUpperReceiver",
  "upc": "123456789087",
  "groupId": "507f1f77bcf86cd799439011",
  "receiverType": "Mil-Spec",
  "material": "7075-T6 Aluminum",
  "weight": 6.9,
  "finish": "Hardcoat Anodized",
  "color": ["Black"],
  "brandExample": "Aero Precision",
  "durability": "Forged, lightweight",
  "notes": "Requires barrel, BCG, and handguard for completion",
  "categoryTags": ["UpperReceiver", "BaseComponent"],
  "includedParts": [],
  "vendor": []
}
```

---

## AR15Barrel
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                             |
|-----------------------|-----------------------|-------------------------------------------------------------------------------------------------|
| Barrel                | Handguard             | `outerDiameterAtGasPort` <= `innerDiameter` AND `outerDiameterAtGasPort` <= `barrelDiameterMax` |
| Barrel                | CompleteUpperReceiver | Included in `includedParts` as `AR15BarrelGroup`, `receiverFit` === `receiverType`              |
| Barrel                | GasSystem             | `gasPortLocation` === `gasLength` AND `caliber` === `caliberCompatibility`                      |
| Barrel                | BoltCarrierGroup      | `caliber` === included bolt’s `caliber`                                                         |
| Barrel                | MuzzleDevice          | `threading` === `threading` AND `caliber` === `caliberCompatibility`                            |
| Barrel                | Bolt                  | `caliber` === `caliber` AND `barrelType` === `boltType`                                         |
| Handguard             | Barrel                | `innerDiameter` >= `outerDiameterAtGasPort` AND `barrelDiameterMax` >= `outerDiameterAtGasPort` |
| CompleteUpperReceiver | Barrel                | Included `AR15BarrelGroup` in `includedParts`, `receiverType` === `receiverFit`                 |
| GasSystem             | Barrel                | `gasLength` === `gasPortLocation` AND `caliberCompatibility` === `caliber`                      |
| BoltCarrierGroup      | Barrel                | Included bolt’s `caliber` === `caliber`                                                         |
| MuzzleDevice          | Barrel                | `threading` === `threading` AND `caliber` === `caliberCompatibility`                            |
| Magazine              | Barrel                | `caliber` === `caliber` (inter-group via upper receiver)                                        |
| Bolt                  | Barrel                | `caliber` === `caliber` AND `boltType` === `barrelType`                                         |

### Example JSON
```json
{
  "model": "AR15Barrel",
  "upc": "123456789023",
  "groupId": "507f1f77bcf86cd799439011",
  "length": 16.0,
  "outerDiameterAtGasPort": 0.75,
  "gasPortLocation": "Mid-length",
  "threading": "1/2-28",
  "caliber": "5.56mm",
  "profile": "M4",
  "receiverFit": "Mil-Spec",
  "material": "4150 Chrome Moly Vanadium Steel",
  "weight": 28.0,
  "finish": "Phosphate",
  "color": ["Black"],
  "twistRate": "1:7",
  "profileVariants": ["M4", "Heavy"],
  "gasSystemType": "Mid-length",
  "brandExample": "Ballistic Advantage",
  "durability": "MIL-STD, corrosion-resistant",
  "notes": "Mid-length gas system, Mil-Spec compatible",
  "categoryTags": ["Barrel", "BarrelAssembly"],
  "includedParts": ["AR15BarrelGroup"],
  "vendor": []
}
```

---

## AR15BoltCarrierGroup
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                     |
|-----------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------|
| BoltCarrierGroup      | CompleteUpperReceiver | Included in `includedParts`, `receiverFit` matches `receiverType` AND `caliber` matches included barrel’s `caliber`     |
| BoltCarrierGroup      | StrippedUpperReceiver | `receiverFit` matches `receiverType` AND `caliber` matches included barrel’s `caliber` (via assembly)                   |
| BoltCarrierGroup      | Barrel                | `caliber` matches `caliber` AND `boltType` matches `barrelType`                                                         |
| BoltCarrierGroup      | Bolt                  | Included `AR15BoltGroup`, `boltType` matches BCG’s `boltType`                                                           |
| BoltCarrierGroup      | ChargingHandle        | `receiverFit` matches `receiverFit` (both must fit the same upper receiver)                                             |
| CompleteUpperReceiver | BoltCarrierGroup      | Included `AR15BoltCarrierGroup`, `receiverType` matches `receiverFit` AND `caliber` matches included barrel’s `caliber` |
| StrippedUpperReceiver | BoltCarrierGroup      | `receiverType` matches `receiverFit` AND `caliber` matches included barrel’s `caliber` (via assembly)                   |
| Barrel                | BoltCarrierGroup      | `caliber` matches `caliber` AND `barrelType` matches `boltType`                                                         |
| Bolt                  | BoltCarrierGroup      | Included in `includedParts`, `boltType` matches BCG’s `boltType`                                                        |
| ChargingHandle        | BoltCarrierGroup      | `receiverFit` matches `receiverFit` (both must fit the same upper receiver)                                             |

### Example JSON
```json
{
  "model": "AR15BoltCarrierGroup",
  "upc": "123456789045",
  "groupId": "507f1f77bcf86cd799439011",
  "receiverFit": "Mil-Spec",
  "caliber": "5.56mm",
  "boltType": "Standard",
  "material": "Steel",
  "weight": 11.5,
  "finish": "Nitride",
  "color": ["Black"],
  "brandExample": "Toolcraft",
  "durability": "High-strength, corrosion-resistant",
  "notes": "Compatible with Mil-Spec upper receivers and 5.56mm barrels",
  "categoryTags": ["UpperReceiver", "BoltCarrierGroup"],
  "includedParts": ["AR15BoltGroup"],
  "vendor": []
}
```

---

## AR15ChargingHandle
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                         |
|-----------------------|-----------------------|-----------------------------------------------------------------------------|
| ChargingHandle        | CompleteUpperReceiver | Included in `includedParts`, `receiverFit` matches `receiverType`           |
| ChargingHandle        | StrippedUpperReceiver | `receiverFit` matches `receiverType`                                        |
| ChargingHandle        | BoltCarrierGroup      | `receiverFit` matches `receiverFit` (both must fit the same upper receiver) |
| CompleteUpperReceiver | ChargingHandle        | Included `AR15ChargingHandleGroup`, `receiverType` matches `receiverFit`    |
| StrippedUpperReceiver | ChargingHandle        | `receiverType` matches `receiverFit`                                        |
| BoltCarrierGroup      | ChargingHandle        | `receiverFit` matches `receiverFit` (both must fit the same upper receiver) |

### Example JSON
```json
{
  "model": "AR15ChargingHandle",
  "upc": "123456789046",
  "groupId": "507f1f77bcf86cd799439011",
  "receiverFit": "Mil-Spec",
  "material": "Aluminum",
  "weight": 1.2,
  "finish": "Anodized",
  "color": ["Black", "FDE"],
  "brandExample": "Radian",
  "durability": "Lightweight, durable",
  "notes": "Ambidextrous design for Mil-Spec upper receivers",
  "categoryTags": ["UpperReceiver", "ChargingHandle"],
  "includedParts": ["AR15ChargingHandleGroup"],
  "vendor": []
}
```

---

## AR15GasSystem
### Compatibility Matrix
| Model A   | Model B   | Compatibility Check                                                                  |
|-----------|-----------|--------------------------------------------------------------------------------------|
| GasSystem | Barrel    | `gasLength` === `gasPortLocation` AND `caliberCompatibility` === `caliber`           |
| GasSystem | GasBlock  | Included `AR15GasBlockGroup` in `includedParts`, `gasSystemFit` matches              |
| GasSystem | GasTube   | Included `AR15GasTubeGroup` in `includedParts`, `gasSystemFit` === `gasSystemFit`    |
| GasSystem | Handguard | `gasSystemCompatibility` includes `gasLength`                                        |
| Barrel    | GasSystem | `gasPortLocation` === `gasLength` AND `caliber` === `caliberCompatibility`           |
| GasBlock  | GasSystem | Included in `includedParts` as `AR15GasBlockGroup`, `gasSystemFit` matches           |
| GasTube   | GasSystem | Included in `includedParts` as `AR15GasTubeGroup`, `gasSystemFit` === `gasSystemFit` |
| Handguard | GasSystem | `gasSystemCompatibility` includes `gasLength`                                        |

### Example JSON
```json
{
  "model": "AR15GasSystem",
  "upc": "123456789047",
  "groupId": "507f1f77bcf86cd799439011",
  "gasLength": "Mid-length",
  "caliberCompatibility": ["5.56mm"],
  "material": "Steel",
  "weight": 2.0,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "VLTOR",
  "durability": "High corrosion resistance",
  "notes": "Includes gas block and tube, optimized for 16-inch barrels",
  "categoryTags": ["GasSystem", "BarrelAssembly"],
  "includedParts": ["AR15GasBlockGroup", "AR15GasTubeGroup"],
  "vendor": []
}
```

---

## AR15MuzzleDevice
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                      |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------------------|
| MuzzleDevice          | Barrel                | `threading` === `threading` AND `caliber` === `caliberCompatibility`                                     |
| MuzzleDevice          | CompleteUpperReceiver | Included `AR15MuzzleDeviceGroup` in `includedParts`, matches included barrel’s `threading` and `caliber` |
| Barrel                | MuzzleDevice          | `threading` === `threading` AND `caliber` === `caliberCompatibility`                                     |
| CompleteUpperReceiver | MuzzleDevice          | Included `AR15MuzzleDeviceGroup` in `includedParts`, matches included barrel’s `threading` and `caliber` |

### Example JSON
```json
{
  "model": "AR15MuzzleDevice",
  "upc": "123456789048",
  "groupId": "507f1f77bcf86cd799439011",
  "threading": "1/2-28",
  "caliberCompatibility": "5.56mm",
  "type": "Flash Hider",
  "material": "Steel",
  "weight": 2.5,
  "finish": "Phosphate",
  "color": ["Black"],
  "length": 2.0,
  "brandExample": "SureFire",
  "durability": "High heat resistance",
  "notes": "Reduces muzzle flash, Mil-Spec threading",
  "categoryTags": ["Barrel", "BarrelAssembly"],
  "includedParts": ["AR15MuzzleDeviceGroup"],
  "vendor": []
}
```

---

## AR15EjectionPortCover
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                           |
|-----------------------|-----------------------|-----------------------------------------------------------------------------------------------|
| EjectionPortCover     | CompleteUpperReceiver | Included in `includedParts` as `AR15EjectionPortCoverGroup`, `receiverType` === `receiverFit` |
| EjectionPortCover     | StrippedUpperReceiver | `receiverFit` === `ejectionPortFit`                                                           |
| CompleteUpperReceiver | EjectionPortCover     | Included `AR15EjectionPortCoverGroup` in `includedParts`, `receiverType` === `receiverFit`    |
| StrippedUpperReceiver | EjectionPortCover     | `ejectionPortFit` === `receiverFit`                                                           |

### Example JSON
```json
{
  "model": "AR15EjectionPortCover",
  "upc": "123456789016",
  "groupId": "507f1f77bcf86cd799439011",
  "receiverFit": "Mil-Spec",
  "material": "Steel",
  "weight": 0.5,
  "finish": "Phosphate",
  "color": ["Black"],
  "length": 3.0,
  "brandExample": "Colt",
  "durability": "Robust, weather-resistant",
  "notes": "Fits Mil-Spec upper receivers, includes spring-loaded mechanism",
  "categoryTags": ["UpperReceiver", "ReceiverParts"],
  "includedParts": ["AR15EjectionPortCoverGroup"],
  "vendor": []
}
```

---

## AR15ForwardAssist
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                       |
|-----------------------|-----------------------|-------------------------------------------------------------------------------------------|
| ForwardAssist         | CompleteUpperReceiver | Included in `includedParts` as `AR15ForwardAssistGroup`, `receiverType` === `receiverFit` |
| ForwardAssist         | StrippedUpperReceiver | `receiverFit` === `forwardAssistFit`                                                      |
| CompleteUpperReceiver | ForwardAssist         | Included `AR15ForwardAssistGroup` in `includedParts`, `receiverType` === `receiverFit`    |
| StrippedUpperReceiver | ForwardAssist         | `forwardAssistFit` === `receiverFit`                                                      |

### Example JSON
```json
{
  "model": "AR15ForwardAssist",
  "upc": "123456789018",
  "groupId": "507f1f77bcf86cd799439011",
  "receiverFit": "Mil-Spec",
  "designType": "Round",
  "material": "Steel",
  "weight": 0.3,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "Daniel Defense",
  "durability": "Reliable under heavy use",
  "notes": "Standard round design for Mil-Spec uppers",
  "categoryTags": ["UpperReceiver", "ReceiverParts"],
  "includedParts": ["AR15ForwardAssistGroup"],
  "vendor": []
}
```

---

## AR15GasBlock
### Compatibility Matrix
| Model A               | Model B   | Compatibility Check                                                                                                           |
|-----------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------|
| GasBlock              | GasSystem | Included in `includedParts` as `AR15GasBlockGroup`, `gasSystemFit` matches                                                    |
| GasSystem             | GasBlock  | Included `AR15GasBlockGroup` in `includedParts`, `gasSystemFit` matches, `innerDiameter` >= barrel’s `outerDiameterAtGasPort` |
| CompleteUpperReceiver | GasBlock  | Included `AR15GasBlockGroup` in `includedParts` (via `AR15GasSystemGroup`), `gasSystemFit` matches                            |

### Example JSON
```json
{
  "model": "AR15GasBlock",
  "upc": "123456789026",
  "groupId": "507f1f77bcf86cd799439011",
  "innerDiameter": 0.75,
  "gasSystemFit": "Mid-length",
  "type": "Low-Profile",
  "material": "Steel",
  "weight": 1.5,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "Geissele",
  "durability": "High heat resistance",
  "notes": "Low-profile design for free-float handguards",
  "categoryTags": ["GasSystem", "BarrelAssembly"],
  "includedParts": ["AR15GasBlockGroup"],
  "vendor": []
}
```

---

### AR15GasTube
#### Compatibility Matrix
| Model A               | Model B   | Compatibility Check                                                                                 |
|-----------------------|-----------|-----------------------------------------------------------------------------------------------------|
| GasTube               | GasSystem | Included in `includedParts` as `AR15GasTubeGroup`, `gasSystemFit` === `gasSystemFit`                |
| GasSystem             | GasTube   | Included `AR15GasTubeGroup` in `includedParts`, `gasSystemFit` === `gasSystemFit`, `length` matches |
| CompleteUpperReceiver | GasTube   | Included `AR15GasTubeGroup` in `includedParts` (via `AR15GasSystemGroup`), `gasSystemFit` matches   |

### Example JSON
```json
{
  "model": "AR15GasTube",
  "upc": "123456789027",
  "groupId": "507f1f77bcf86cd799439011",
  "length": "Mid-length",
  "gasSystemFit": "Mid-length",
  "material": "Stainless Steel",
  "weight": 0.8,
  "finish": "Matte",
  "color": ["Silver"],
  "brandExample": "Odin Works",
  "durability": "Corrosion-resistant",
  "notes": "Fits Mid-length gas systems, Mil-Spec compatible",
  "categoryTags": ["GasSystem", "BarrelAssembly"],
  "includedParts": ["AR15GasTubeGroup"],
  "vendor": []
}
```

---

### AR15BarrelNut
#### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                               |
|-----------------------|-----------------------|---------------------------------------------------------------------------------------------------|
| BarrelNut             | Handguard             | `type` === `requiredBarrelNutType` AND (`thread` === `requiredBarrelNutThread` OR both undefined) |
| BarrelNut             | CompleteUpperReceiver | `thread` === `barrelNutThread` AND `receiverFit` === `receiverType` OR both undefined             |
| BarrelNut             | StrippedUpperReceiver | `thread` === `barrelNutThread` AND `receiverFit` === `receiverType` OR both undefined             |
| Handguard             | BarrelNut             | `requiredBarrelNutType` === `type` AND (`requiredBarrelNutThread` === `thread` OR both undefined) |
| CompleteUpperReceiver | BarrelNut             | `barrelNutThread` === `thread` OR both undefined                                                  |
| StrippedUpperReceiver | BarrelNut             | `barrelNutThread` === `thread` OR both undefined                                                  |

### Example JSON
```json
{
  "model": "AR15BarrelNut",
  "upc": "123456789029",
  "groupId": "507f1f77bcf86cd799439011",
  "type": "Mil-Spec",
  "thread": "1-7/16-16",
  "handguardFit": "Mil-Spec Handguard",
  "receiverFit": "Mil-Spec",
  "material": "Steel",
  "weight": 2.0,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "Midwest Industries",
  "durability": "High-torque capable",
  "notes": "Secures handguard to Mil-Spec upper receivers",
  "categoryTags": ["UpperReceiver", "ReceiverParts"],
  "includedParts": ["AR15BarrelNutGroup"],
  "vendor": []
}
```

---

### AR15CamPin
### Compatibility Matrix
| Model A               | Model B          | Compatibility Check                                                                                   |
|-----------------------|------------------|-------------------------------------------------------------------------------------------------------|
| CamPin                | BoltCarrierGroup | Included in `includedParts` as `AR15CamPinGroup`, `carrierFit` matches                                |
| CamPin                | Bolt             | Included `AR15CamPinGroup` in `includedParts`, `carrierFit` matches                                   |
| CompleteUpperReceiver | CamPin           | Included `AR15CamPinGroup` in `includedParts` (via `AR15BoltCarrierGroupGroup`), `carrierFit` matches |
| BoltCarrierGroup      | CamPin           | Included in `includedParts` as `AR15CamPinGroup`, `carrierFit` matches                                |
| Bolt                  | CamPin           | Included in `includedParts` as `AR15BoltGroup`, `carrierFit` matches                                  |

### Example JSON
```json
{
  "model": "AR15CamPin",
  "upc": "123456789022",
  "groupId": "507f1f77bcf86cd799439011",
  "carrierFit": "Mil-Spec Carrier",
  "material": "Steel",
  "weight": 0.1,
  "finish": "Chromed",
  "color": ["Silver"],
  "brandExample": "Bravo Company",
  "durability": "High wear resistance",
  "notes": "Essential for Mil-Spec BCG operation",
  "categoryTags": ["UpperReceiver", "BoltCarrier", "ReceiverParts"],
  "includedParts": ["AR15CamPinGroup"],
  "vendor": []
}
```

---

### AR15Bolt
### Compatibility Matrix
| Model A               | Model B          | Compatibility Check                                                                              |
|-----------------------|------------------|--------------------------------------------------------------------------------------------------|
| Bolt                  | BoltCarrierGroup | Included in `includedParts` as `AR15BoltGroup`, `carrierFit` matches                             |
| BoltCarrierGroup      | Bolt             | Included `AR15BoltGroup` in `includedParts`, `carrierFit` matches                                |
| CompleteUpperReceiver | Bolt             | Included `AR15BoltGroup` in `includedParts` (via `AR15BoltCarrierGroupGroup`), `caliber` matches |

### Example JSON
```json
{
  "model": "AR15Bolt",
  "upc": "123456789020",
  "groupId": "507f1f77bcf86cd799439011",
  "material": "Carpenter 158 Steel",
  "carrierFit": "Mil-Spec Carrier",
  "caliber": "5.56mm",
  "weight": 1.5,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "FailZero",
  "durability": "High wear resistance",
  "notes": "Fits Mil-Spec bolt carrier groups, tested for reliability",
  "categoryTags": ["UpperReceiver", "BoltCarrier", "ReceiverParts"],
  "includedParts": ["AR15BoltGroup"],
  "vendor": []
}
```

---

### AR15BoltHardware
### Compatibility Matrix
| Model A               | Model B          | Compatibility Check                                                                                         |
|-----------------------|------------------|-------------------------------------------------------------------------------------------------------------|
| BoltHardware          | BoltCarrierGroup | Included in `includedParts` as `AR15BoltHardwareGroup`, `carrierFit` matches                                |
| BoltCarrierGroup      | BoltHardware     | Included `AR15BoltHardwareGroup` in `includedParts`, `carrierFit` matches                                   |
| CompleteUpperReceiver | BoltHardware     | Included `AR15BoltHardwareGroup` in `includedParts` (via `AR15BoltCarrierGroupGroup`), `carrierFit` matches |

### Example JSON
```json
{
  "model": "AR15BoltHardware",
  "upc": "123456789021",
  "groupId": "507f1f77bcf86cd799439011",
  "carrierFit": "Mil-Spec Carrier",
  "components": ["Firing Pin", "Extractor", "Ejector"],
  "material": "Steel",
  "weight": 0.3,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "Spikes Tactical",
  "durability": "High-tension components",
  "notes": "Includes firing pin, extractor, and ejector for Mil-Spec BCGs",
  "categoryTags": ["UpperReceiver", "BoltCarrier", "ReceiverParts"],
  "includedParts": ["AR15BoltHardwareGroup"],
  "vendor": []
}
```

---

### AR15EjectionPortHardware
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                           |
|-----------------------|-----------------------|-----------------------------------------------------------------------------------------------|
| EjectionPortHardware  | CompleteUpperReceiver | Included in `includedParts` as `AR15EjectionPortHardwareGroup`, `receiverType` === `coverFit` |
| CompleteUpperReceiver | EjectionPortHardware  | Included `AR15EjectionPortHardwareGroup` in `includedParts`, `receiverType` === `coverFit`    |

### Example JSON
```json
{
  "model": "AR15EjectionPortHardware",
  "upc": "123456789017",
  "groupId": "507f1f77bcf86cd799439011",
  "coverFit": "Mil-Spec Cover",
  "material": "Steel",
  "weight": 0.2,
  "finish": "Phosphate",
  "color": ["Black"],
  "components": ["Spring", "Pin"],
  "brandExample": "Anderson Manufacturing",
  "durability": "High-tension, corrosion-resistant",
  "notes": "Includes spring and pin for Mil-Spec ejection port covers",
  "categoryTags": ["UpperReceiver", "ReceiverParts"],
  "includedParts": ["AR15EjectionPortHardwareGroup"],
  "vendor": []
}
```

---

### AR15CompleteLowerReceiver
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                              |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------------|
| CompleteLowerReceiver | CompleteUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group)       |
| CompleteLowerReceiver | StrippedUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group)       |
| CompleteLowerReceiver | Magazine              | Included `AR15MagazineGroup` in `includedParts`, `caliberCompatibility` includes `caliber`                                       |
| CompleteLowerReceiver | BufferKit             | Included `AR15BufferKitGroup` in `includedParts`, included buffer tube’s `type` matches stock’s `bufferTubeType`                 |
| CompleteLowerReceiver | Stock                 | Included `AR15StockGroup` in `includedParts`, `receiverType` compatible with included buffer tube’s `type`                       |
| CompleteLowerReceiver | TriggerGuard          | Included `AR15TriggerGuardGroup` in `includedParts`, `receiverType` === `receiverFit` AND `triggerPinDiameter` === `pinDiameter` |
| CompleteLowerReceiver | LowerPartsKit         | Included `AR15LowerPartsKitGroup` in `includedParts`, `receiverType` === `receiverFit`                                           |
| CompleteUpperReceiver | CompleteLowerReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group)       |
| StrippedUpperReceiver | CompleteLowerReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group)       |
| Magazine              | CompleteLowerReceiver | Included in `includedParts`, `caliber` in `caliberCompatibility`                                                                 |
| BufferKit             | CompleteLowerReceiver | Included in `includedParts`, included buffer tube’s `type` matches stock’s `bufferTubeType`                                      |
| Stock                 | CompleteLowerReceiver | Included in `includedParts`, `bufferTubeType` matches included buffer tube’s `type`                                              |
| TriggerGuard          | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType` AND `pinDiameter` === `triggerPinDiameter`                         |
| LowerPartsKit         | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                                                                    |

### Example JSON
```json
{
  "model": "AR15CompleteLowerReceiver",
  "upc": "123456789014",
  "groupId": "507f191e810c19729de860ea",
  "receiverType": "Mil-Spec",
  "takedownPinDiameter": 0.25,
  "triggerPinDiameter": 0.154,
  "caliberCompatibility": ["5.56mm", "Multi"],
  "material": "7075-T6 Aluminum",
  "weight": 32.0,
  "finish": "Hardcoat Anodized",
  "color": ["Black"],
  "length": 9.5,
  "brandExample": "Palmetto State Armory",
  "durability": "High-strength, impact-resistant",
  "notes": "Fully assembled with Mil-Spec trigger, stock, and buffer system",
  "categoryTags": ["LowerReceiver", "Receiver"],
  "includedParts": ["AR15TriggerGroup", "AR15TriggerGuardGroup", "AR15GripGroup", "AR15StockGroup", "AR15BufferKitGroup", "AR15TakedownPinGroup", "AR15SafetySelectorGroup", "AR15BoltCatchGroup", "AR15MagazineReleaseGroup", "AR15FireControlGroupGroup", "AR15ReceiverEndPlateGroup", "AR15CastleNutGroup", "AR15DetentGroup", "AR15SpringGroup"],
  "vendor": []
}
```

---

### AR15StrippedLowerReceiver
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                        |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------|
| StrippedLowerReceiver | CompleteUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group) |
| StrippedLowerReceiver | StrippedUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group) |
| StrippedLowerReceiver | Magazine              | `caliberCompatibility` includes `caliber`                                                                                  |
| StrippedLowerReceiver | BufferKit             | Buffer tube’s `type` matches stock’s `bufferTubeType` (via stock compatibility)                                            |
| StrippedLowerReceiver | Stock                 | `receiverType` compatible with buffer tube’s `type` (via buffer kit)                                                       |
| StrippedLowerReceiver | TriggerGuard          | `receiverType` === `receiverFit` AND `triggerPinDiameter` === `pinDiameter`                                                |
| StrippedLowerReceiver | LowerPartsKit         | `receiverType` === `receiverFit`                                                                                           |
| CompleteUpperReceiver | StrippedLowerReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group) |
| StrippedUpperReceiver | StrippedLowerReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group) |
| Magazine              | StrippedLowerReceiver | `caliber` in `caliberCompatibility`                                                                                        |
| BufferKit             | StrippedLowerReceiver | Included buffer tube’s `type` matches stock’s `bufferTubeType`                                                             |
| Stock                 | StrippedLowerReceiver | `bufferTubeType` matches buffer tube’s `type` (via buffer kit)                                                             |
| TriggerGuard          | StrippedLowerReceiver | `receiverFit` === `receiverType` AND `pinDiameter` === `triggerPinDiameter`                                                |
| LowerPartsKit         | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                                                           |

### Example JSON
```json
{
  "model": "AR15StrippedLowerReceiver",
  "upc": "123456789030",
  "groupId": "507f191e810c19729de860ea",
  "receiverType": "Mil-Spec",
  "takedownPinDiameter": 0.25,
  "triggerPinDiameter": 0.154,
  "caliberCompatibility": ["5.56mm", "Multi"],
  "material": "7075-T6 Aluminum",
  "weight": 8.5,
  "finish": "Hardcoat Anodized",
  "color": ["Black"],
  "length": 8.0,
  "brandExample": "Anderson Manufacturing",
  "durability": "High-strength, impact-resistant",
  "notes": "Requires assembly with trigger, grip, and other components",
  "categoryTags": ["LowerReceiver", "Receiver"],
  "includedParts": [],
  "vendor": []
}
```

---

### AR15LowerPartsKit
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                    |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------|
| LowerPartsKit         | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                          |
| LowerPartsKit         | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                       |
| LowerPartsKit         | Trigger               | Included `AR15TriggerGroup` in `includedParts`, `receiverFit` matches                  |
| LowerPartsKit         | SafetySelector        | Included `AR15SafetySelectorGroup` in `includedParts`, `receiverFit` matches           |
| LowerPartsKit         | BoltCatch             | Included `AR15BoltCatchGroup` in `includedParts`, `receiverFit` matches                |
| LowerPartsKit         | MagazineRelease       | Included `AR15MagazineReleaseGroup` in `includedParts`, `receiverFit` matches          |
| LowerPartsKit         | Detent                | Included `AR15DetentGroup` in `includedParts`, `receiverFit` matches                   |
| LowerPartsKit         | Spring                | Included `AR15SpringGroup` in `includedParts`, `receiverFit` matches                   |
| CompleteLowerReceiver | LowerPartsKit         | Included `AR15LowerPartsKitGroup` in `includedParts`, `receiverType` === `receiverFit` |
| StrippedLowerReceiver | LowerPartsKit         | `receiverType` === `receiverFit`                                                       |
| Trigger               | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                     |
| SafetySelector        | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                     |
| BoltCatch             | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                     |
| MagazineRelease       | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                     |
| Detent                | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                     |
| Spring                | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                     |

### Example JSON
```json
{
  "model": "AR15LowerPartsKit",
  "upc": "123456789031",
  "groupId": "507f191e810c19729de860ea",
  "receiverFit": "Mil-Spec",
  "triggerPinDiameter": 0.154,
  "material": "Steel/Polymer",
  "weight": 6.0,
  "finish": "Mixed (Phosphate/Polymer)",
  "color": ["Black"],
  "components": ["Takedown Pin", "Safety Selector", "Bolt Catch", "Magazine Release", "Detents", "Springs"],
  "brandExample": "CMMG",
  "durability": "Reliable, Mil-Spec quality",
  "notes": "Complete kit for assembling Mil-Spec lower receivers",
  "categoryTags": ["LowerReceiver", "ReceiverParts"],
  "includedParts": ["AR15TakedownPinGroup", "AR15SafetySelectorGroup", "AR15BoltCatchGroup", "AR15MagazineReleaseGroup", "AR15DetentGroup", "AR15SpringGroup"],
  "vendor": []
}
```

---

### AR15Grip
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                          |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------|
| Grip                  | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                                |
| Grip                  | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                             |
| Grip                  | TriggerGuard          | `receiverFit` === `receiverFit` AND `triggerGuardType` compatible (e.g., Standard)           |
| Grip                  | SafetySelector        | `receiverFit` === `receiverFit` AND `selectorType` compatible (e.g., Standard, Ambidextrous) |
| Grip                  | GripScrew             | `screwType` matches if specified (e.g., Hex Head)                                            |
| CompleteLowerReceiver | Grip                  | Included `AR15GripGroup` in `includedParts`, `receiverType` === `receiverFit`                |
| StrippedLowerReceiver | Grip                  | `receiverType` === `receiverFit`                                                             |
| TriggerGuard          | Grip                  | `receiverFit` === `receiverFit` AND `triggerGuardType` compatible                            |
| SafetySelector        | Grip                  | `receiverFit` === `receiverFit` AND `selectorType` compatible                                |

### Example JSON
```json
{
  "model": "AR15Grip",
  "upc": "123456789032",
  "groupId": "507f191e810c19729de860ea",
  "receiverFit": "Mil-Spec",
  "material": "Polymer",
  "weight": 2.8,
  "finish": "Textured",
  "color": ["Black", "FDE"],
  "length": 4.0,
  "texture": "Stippled",
  "features": ["Finger Grooves", "Beavertail Support"],
  "hasStorageCompartment": false,
  "angle": "17 degrees",
  "brandExample": "Magpul MOE",
  "durability": "Impact-resistant, ergonomic",
  "notes": "Fits Mil-Spec lowers, includes mounting screw",
  "categoryTags": ["LowerReceiver", "Grip"],
  "includedParts": ["AR15GripGroup"],
  "vendor": []
}
```

---

### AR15Trigger
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                    |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------|
| Trigger               | CompleteLowerReceiver | Included in `includedParts`, `pinDiameter` === `triggerPinDiameter`                    |
| Trigger               | StrippedLowerReceiver | `pinDiameter` === `triggerPinDiameter`                                                 |
| Trigger               | TriggerGuard          | `pinDiameter` === `pinDiameter`                                                        |
| Trigger               | FireControlGroup      | Included `AR15TriggerGroup`, `pinDiameter` matches                                     |
| CompleteLowerReceiver | Trigger               | Included `AR15TriggerGroup` in `includedParts`, `triggerPinDiameter` === `pinDiameter` |
| StrippedLowerReceiver | Trigger               | `triggerPinDiameter` === `pinDiameter`                                                 |
| TriggerGuard          | Trigger               | `pinDiameter` === `pinDiameter`                                                        |
| FireControlGroup      | Trigger               | Included `AR15TriggerGroup`, `pinDiameter` matches                                     |

### Example JSON
```json
{
  "model": "AR15Trigger",
  "upc": "123456789033",
  "groupId": "507f191e810c19729de860ea",
  "pinDiameter": 0.154,
  "receiverFit": "Mil-Spec",
  "triggerType": "Single-Stage",
  "pullWeight": 5.5,
  "material": "Steel",
  "weight": 2.5,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "ALG Defense",
  "durability": "Precision-machined, reliable",
  "notes": "Crisp break, fits Mil-Spec lowers",
  "categoryTags": ["LowerReceiver", "FireControl"],
  "includedParts": ["AR15TriggerGroup"],
  "vendor": []
}
```

---

### AR15TriggerGuard
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                              |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------------|
| TriggerGuard          | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType` AND `pinDiameter` === `triggerPinDiameter`                         |
| TriggerGuard          | StrippedLowerReceiver | `receiverFit` === `receiverType` AND `pinDiameter` === `triggerPinDiameter`                                                      |
| TriggerGuard          | Trigger               | `pinDiameter` === `pinDiameter`                                                                                                  |
| TriggerGuard          | Grip                  | `receiverFit` === `receiverFit` AND `triggerGuardType` compatible                                                                |
| CompleteLowerReceiver | TriggerGuard          | Included `AR15TriggerGuardGroup` in `includedParts`, `receiverType` === `receiverFit` AND `triggerPinDiameter` === `pinDiameter` |
| StrippedLowerReceiver | TriggerGuard          | `receiverType` === `receiverFit` AND `triggerPinDiameter` === `pinDiameter`                                                      |
| Trigger               | TriggerGuard          | `pinDiameter` === `pinDiameter`                                                                                                  |
| Grip                  | TriggerGuard          | `receiverFit` === `receiverFit` AND `triggerGuardType` compatible                                                                |

### Example JSON
```json
{
  "model": "AR15TriggerGuard",
  "upc": "123456789034",
  "groupId": "507f191e810c19729de860ea",
  "receiverFit": "Mil-Spec",
  "pinDiameter": 0.154,
  "material": "Aluminum",
  "weight": 0.4,
  "finish": "Anodized",
  "color": ["Black"],
  "brandExample": "Strike Industries",
  "durability": "Lightweight, sturdy",
  "notes": "Enhanced design for Mil-Spec lowers",
  "categoryTags": ["LowerReceiver", "ReceiverParts"],
  "includedParts": ["AR15TriggerGuardGroup"],
  "vendor": []
}
```

---

### AR15Stock
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                        |
|-----------------------|-----------------------|------------------------------------------------------------------------------------------------------------|
| Stock                 | CompleteLowerReceiver | Included in `includedParts`, `bufferTubeType` matches included buffer tube’s `type`                        |
| Stock                 | StrippedLowerReceiver | `bufferTubeType` matches buffer tube’s `type` (via buffer kit)                                             |
| Stock                 | BufferKit             | `bufferTubeType` === included buffer tube’s `type`                                                         |
| Stock                 | BufferTube            | `bufferTubeType` === `type`                                                                                |
| Stock                 | ReceiverEndPlate      | `bufferTubeType` === `bufferTubeFit` (via buffer kit)                                                      |
| Stock                 | CastleNut             | `bufferTubeType` === `bufferTubeFit` (via buffer kit)                                                      |
| CompleteLowerReceiver | Stock                 | Included `AR15StockGroup` in `includedParts`, `receiverType` compatible with included buffer tube’s `type` |
| StrippedLowerReceiver | Stock                 | `receiverType` compatible with buffer tube’s `type` (via buffer kit)                                       |
| BufferKit             | Stock                 | Included buffer tube’s `type` === `bufferTubeType`                                                         |
| BufferTube            | Stock                 | `type` === `bufferTubeType`                                                                                |
| ReceiverEndPlate      | Stock                 | `bufferTubeFit` === `bufferTubeType` (via buffer kit)                                                      |
| CastleNut             | Stock                 | `bufferTubeFit` === `bufferTubeType` (via buffer kit)                                                      |

### Example JSON
```json
{
  "model": "AR15Stock",
  "upc": "123456789035",
  "groupId": "507f191e810c19729de860ea",
  "bufferTubeType": "Mil-Spec",
  "material": "Polymer",
  "weight": 7.0,
  "finish": "Matte",
  "color": ["Black", "FDE"],
  "lengthOfPull": 13.5,
  "brandExample": "Magpul CTR",
  "durability": "Impact-resistant, adjustable",
  "notes": "Adjustable stock for Mil-Spec buffer tubes",
  "categoryTags": ["LowerReceiver", "ReceiverParts"],
  "includedParts": ["AR15StockGroup"],
  "vendor": []
}
```

---

### AR15BufferKit
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                              |
|-----------------------|-----------------------|------------------------------------------------------------------------------------------------------------------|
| BufferKit             | CompleteLowerReceiver | Included in `includedParts`, included buffer tube’s `type` matches stock’s `bufferTubeType`                      |
| BufferKit             | StrippedLowerReceiver | Included buffer tube’s `type` matches stock’s `bufferTubeType`                                                   |
| BufferKit             | Stock                 | Included buffer tube’s `type` === `bufferTubeType`                                                               |
| BufferKit             | Buffer                | Included `AR15BufferGroup`, `bufferType` matches                                                                 |
| BufferKit             | BufferTube            | Included `AR15BufferTubeGroup`, `type` matches                                                                   |
| BufferKit             | BufferSpring          | Included `AR15BufferSpringGroup`, `bufferTubeFit` matches                                                        |
| BufferKit             | ReceiverEndPlate      | Included buffer tube’s `type` === `bufferTubeFit`                                                                |
| BufferKit             | CastleNut             | Included buffer tube’s `type` === `bufferTubeFit`                                                                |
| CompleteLowerReceiver | BufferKit             | Included `AR15BufferKitGroup` in `includedParts`, included buffer tube’s `type` matches stock’s `bufferTubeType` |
| StrippedLowerReceiver | BufferKit             | Included buffer tube’s `type` matches stock’s `bufferTubeType`                                                   |
| Stock                 | BufferKit             | `bufferTubeType` === included buffer tube’s `type`                                                               |
| Buffer                | BufferKit             | Included in `includedParts`, `bufferType` matches                                                                |
| BufferTube            | BufferKit             | Included in `includedParts`, `type` matches                                                                      |
| BufferSpring          | BufferKit             | Included in `includedParts`, `bufferTubeFit` matches                                                             |
| ReceiverEndPlate      | BufferKit             | `bufferTubeFit` === included buffer tube’s `type`                                                                |
| CastleNut             | BufferKit             | `bufferTubeFit` === included buffer tube’s `type`                                                                |

### Example JSON
```json
{
  "model": "AR15BufferKit",
  "upc": "123456789036",
  "groupId": "507f191e810c19729de860ea",
  "bufferTubeType": "Mil-Spec",
  "bufferWeight": 3.0,
  "material": "Steel/Aluminum",
  "weight": 8.0,
  "finish": "Mixed (Phosphate/Anodized)",
  "color": ["Black"],
  "length": 7.0,
  "brandExample": "VLTOR",
  "durability": "Balanced for reliable cycling",
  "notes": "Includes buffer, tube, and spring for Mil-Spec stocks",
  "categoryTags": ["LowerReceiver", "BufferAssembly"],
  "includedParts": ["AR15BufferGroup", "AR15BufferTubeGroup", "AR15BufferSpringGroup"],
  "vendor": []
}
```

---

### AR15Buffer
### Compatibility Matrix
| Model A      | Model B      | Compatibility Check                               |
|--------------|--------------|---------------------------------------------------|
| Buffer       | BufferKit    | Included in `includedParts`, `bufferType` matches |
| Buffer       | BufferTube   | `bufferType` matches `bufferTubeFit`              |
| Buffer       | BufferSpring | `bufferType` matches `bufferSpringFit`            |
| BufferKit    | Buffer       | Included `AR15BufferGroup`, `bufferType` matches  |
| BufferTube   | Buffer       | `bufferTubeFit` matches `bufferType`              |
| BufferSpring | Buffer       | `bufferSpringFit` matches `bufferType`            |

### Example JSON
```json
{
  "model": "AR15Buffer",
  "upc": "123456789037",
  "groupId": "507f191e810c19729de860ea",
  "weight": 3.0,
  "bufferType": "Carbine",
  "material": "Steel",
  "weightTotal": 3.0,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "Spikes Tactical",
  "durability": "Balanced for standard cycling",
  "notes": "Carbine buffer for Mil-Spec buffer tubes",
  "categoryTags": ["LowerReceiver", "BufferAssembly"],
  "includedParts": ["AR15BufferGroup"],
  "vendor": []
}
```

---

### AR15BufferTube
### Compatibility Matrix
| Model A               | Model B          | Compatibility Check                                                                          |
|-----------------------|------------------|----------------------------------------------------------------------------------------------|
| BufferTube            | BufferKit        | Included in `includedParts`, `type` matches                                                  |
| BufferTube            | Stock            | `type` === `bufferTubeType`                                                                  |
| BufferTube            | ReceiverEndPlate | `type` === `bufferTubeFit`                                                                   |
| BufferTube            | CastleNut        | `type` === `bufferTubeFit`                                                                   |
| BufferKit             | BufferTube       | Included `AR15BufferTubeGroup`, `type` matches                                               |
| Stock                 | BufferTube       | `bufferTubeType` === `type`                                                                  |
| ReceiverEndPlate      | BufferTube       | `bufferTubeFit` === `type`                                                                   |
| CastleNut             | BufferTube       | `bufferTubeFit` === `type`                                                                   |
| CompleteLowerReceiver | BufferTube       | Included `AR15BufferTubeGroup` in `includedParts` (via `AR15BufferKitGroup`), `type` matches |

### Example JSON
```json
{
  "model": "AR15BufferTube",
  "upc": "123456789038",
  "groupId": "507f191e810c19729de860ea",
  "type": "Mil-Spec",
  "length": "Carbine",
  "material": "6061-T6 Aluminum",
  "weight": 3.8,
  "finish": "Anodized",
  "color": ["Black"],
  "diameter": 1.148,
  "brandExample": "B5 Systems",
  "durability": "Lightweight, sturdy",
  "notes": "Carbine-length for Mil-Spec stocks",
  "categoryTags": ["LowerReceiver", "BufferAssembly"],
  "includedParts": ["AR15BufferTubeGroup"],
  "vendor": []
}
```

---

### AR15BufferSpring
### Compatibility Matrix
| Model A      | Model B      | Compatibility Check                                       |
|--------------|--------------|-----------------------------------------------------------|
| BufferSpring | BufferKit    | Included in `includedParts`, `bufferTubeFit` matches      |
| BufferSpring | BufferTube   | `bufferTubeFit` matches `type`                            |
| BufferSpring | Buffer       | `bufferTubeFit` matches `bufferType`                      |
| BufferKit    | BufferSpring | Included `AR15BufferSpringGroup`, `bufferTubeFit` matches |
| BufferTube   | BufferSpring | `type` matches `bufferTubeFit`                            |
| Buffer       | BufferSpring | `bufferType` matches `bufferTubeFit`                      |

### Example JSON
```json
{
  "model": "AR15BufferSpring",
  "upc": "123456789039",
  "groupId": "507f191e810c19729de860ea",
  "bufferTubeFit": "Carbine",
  "material": "Stainless Steel",
  "weight": 1.5,
  "finish": "Polished",
  "color": ["Silver"],
  "length": 10.5,
  "brandExample": "Sprinco",
  "durability": "High-tension, corrosion-resistant",
  "notes": "Optimized for carbine buffer tubes",
  "categoryTags": ["LowerReceiver", "BufferAssembly"],
  "includedParts": ["AR15BufferSpringGroup"],
  "vendor": []
}
```

---

### AR15Magazine
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                        |
|-----------------------|-----------------------|--------------------------------------------------------------------------------------------|
| Magazine              | CompleteLowerReceiver | Included in `includedParts`, `caliber` in `caliberCompatibility`                           |
| Magazine              | StrippedLowerReceiver | `caliber` in `caliberCompatibility`                                                        |
| Magazine              | MagazineRelease       | `receiverFit` === `magazineFit`                                                            |
| Magazine              | CompleteUpperReceiver | `caliber` === included barrel’s `caliber` AND included bolt’s `caliber` (inter-group)      |
| Magazine              | StrippedUpperReceiver | `caliber` === included barrel’s `caliber` AND included bolt’s `caliber` (inter-group)      |
| CompleteLowerReceiver | Magazine              | Included `AR15MagazineGroup` in `includedParts`, `caliberCompatibility` includes `caliber` |
| StrippedLowerReceiver | Magazine              | `caliberCompatibility` includes `caliber`                                                  |
| MagazineRelease       | Magazine              | `magazineFit` === `receiverFit`                                                            |

### Example JSON
```json
{
  "model": "AR15Magazine",
  "upc": "123456789015",
  "groupId": "507f191e810c19729de860ea",
  "caliber": "5.56mm",
  "capacity": 30,
  "receiverFit": "Mil-Spec",
  "material": "Polymer",
  "weight": 4.5,
  "finish": "Matte",
  "color": ["Black", "Gray"],
  "length": 7.0,
  "brandExample": "Magpul PMAG",
  "durability": "Impact-resistant, durable under heavy use",
  "notes": "Standard capacity, compatible with Mil-Spec AR-15 lowers",
  "categoryTags": ["LowerReceiver", "Magazine"],
  "includedParts": ["AR15MagazineGroup"],
  "vendor": []
}
```

---

### AR15TakedownPin
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                      |
|-----------------------|-----------------------|------------------------------------------------------------------------------------------|
| TakedownPin           | CompleteLowerReceiver | Included in `includedParts`, `diameter` === `takedownPinDiameter`                        |
| TakedownPin           | StrippedLowerReceiver | `diameter` === `takedownPinDiameter`                                                     |
| TakedownPin           | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                       |
| CompleteLowerReceiver | TakedownPin           | Included `AR15TakedownPinGroup` in `includedParts`, `takedownPinDiameter` === `diameter` |
| StrippedLowerReceiver | TakedownPin           | `takedownPinDiameter` === `diameter`                                                     |
| LowerPartsKit         | TakedownPin           | Included `AR15TakedownPinGroup`, `receiverFit` matches                                   |

### Example JSON
```json
{
  "model": "AR15TakedownPin",
  "upc": "123456789040",
  "groupId": "507f191e810c19729de860ea",
  "diameter": 0.25,
  "receiverFit": "Mil-Spec",
  "material": "Steel",
  "weight": 0.2,
  "finish": "Phosphate",
  "color": ["Black"],
  "length": 1.5,
  "brandExample": "KNS Precision",
  "durability": "High-strength, reliable retention",
  "notes": "Includes detent and spring for Mil-Spec receivers",
  "categoryTags": ["LowerReceiver", "ReceiverParts"],
  "includedParts": ["AR15TakedownPinGroup"],
  "vendor": []
}
```

---

### AR15SafetySelector
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                     |
|-----------------------|-----------------------|-----------------------------------------------------------------------------------------|
| SafetySelector        | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                           |
| SafetySelector        | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                        |
| SafetySelector        | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                      |
| CompleteLowerReceiver | SafetySelector        | Included `AR15SafetySelectorGroup` in `includedParts`, `receiverType` === `receiverFit` |
| StrippedLowerReceiver | SafetySelector        | `receiverType` === `receiverFit`                                                        |
| LowerPartsKit         | SafetySelector        | Included `AR15SafetySelectorGroup`, `receiverFit` matches                               |

### Example JSON
```json
{
  "model": "AR15SafetySelector",
  "upc": "123456789041",
  "groupId": "507f191e810c19729de860ea",
  "receiverFit": "Mil-Spec",
  "material": "Steel",
  "weight": 0.3,
  "finish": "Phosphate",
  "color": ["Black"],
  "designType": "Standard",
  "brandExample": "Wilson Combat",
  "durability": "Smooth operation, durable",
  "notes": "Standard safety for Mil-Spec lowers",
  "categoryTags": ["LowerReceiver", "ReceiverParts"],
  "includedParts": ["AR15SafetySelectorGroup"],
  "vendor": []
}
```

---

### AR15BoltCatch
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                |
|-----------------------|-----------------------|------------------------------------------------------------------------------------|
| BoltCatch             | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                      |
| BoltCatch             | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                   |
| BoltCatch             | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                 |
| CompleteLowerReceiver | BoltCatch             | Included `AR15BoltCatchGroup` in `includedParts`, `receiverType` === `receiverFit` |
| StrippedLowerReceiver | BoltCatch             | `receiverType` === `receiverFit`                                                   |
| LowerPartsKit         | BoltCatch             | Included `AR15BoltCatchGroup`, `receiverFit` matches                               |

### Example JSON
```json
{
  "model": "AR15BoltCatch",
  "upc": "123456789042",
  "groupId": "507f191e810c19729de860ea",
  "receiverFit": "Mil-Spec",
  "material": "Steel",
  "weight": 0.4,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "Seekins Precision",
  "durability": "High-strength, reliable",
  "notes": "Fits Mil-Spec lowers, includes roll pin",
  "categoryTags": ["LowerReceiver", "ReceiverParts"],
  "includedParts": ["AR15BoltCatchGroup"],
  "vendor": []
}
```

---

### AR15MagazineRelease
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                                                  |
|-----------------------|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| MagazineRelease       | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType` AND `magazineFit` matches magazine’s `receiverFit`                                     |
| MagazineRelease       | StrippedLowerReceiver | `receiverFit` === `receiverType` AND `magazineFit` matches magazine’s `receiverFit`                                                                  |
| MagazineRelease       | Magazine              | `magazineFit` === `receiverFit`                                                                                                                      |
| MagazineRelease       | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                                                                                   |
| CompleteLowerReceiver | MagazineRelease       | Included `AR15MagazineReleaseGroup` in `includedParts`, `receiverType` === `receiverFit` AND `magazineFit` matches included magazine’s `receiverFit` |
| StrippedLowerReceiver | MagazineRelease       | `receiverType` === `receiverFit` AND `magazineFit` matches magazine’s `receiverFit`                                                                  |
| Magazine              | MagazineRelease       | `receiverFit` === `magazineFit`                                                                                                                      |
| LowerPartsKit         | MagazineRelease       | Included `AR15MagazineReleaseGroup`, `receiverFit` matches                                                                                           |

### Example JSON
```json
{
  "model": "AR15MagazineRelease",
  "upc": "123456789043",
  "groupId": "507f191e810c19729de860ea",
  "receiverFit": "Mil-Spec",
  "magazineFit": "Mil-Spec Magazine",
  "material": "Steel",
  "weight": 0.3,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "Troy Industries",
  "durability": "Reliable, smooth operation",
  "notes": "Includes button and spring for Mil-Spec magazines",
  "categoryTags": ["LowerReceiver", "Magazine", "ReceiverParts"],
  "includedParts": ["AR15MagazineReleaseGroup"],
  "vendor": []
}
```

---

### AR15FireControlGroup
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                             |
|-----------------------|-----------------------|-------------------------------------------------------------------------------------------------|
| FireControlGroup      | CompleteLowerReceiver | Included in `includedParts`, `pinDiameter` === `triggerPinDiameter`                             |
| FireControlGroup      | StrippedLowerReceiver | `pinDiameter` === `triggerPinDiameter`                                                          |
| FireControlGroup      | Trigger               | Included `AR15TriggerGroup`, `pinDiameter` matches                                              |
| CompleteLowerReceiver | FireControlGroup      | Included `AR15FireControlGroupGroup` in `includedParts`, `triggerPinDiameter` === `pinDiameter` |
| StrippedLowerReceiver | FireControlGroup      | `triggerPinDiameter` === `pinDiameter`                                                          |
| Trigger               | FireControlGroup      | Included `AR15TriggerGroup`, `pinDiameter` matches                                              |

### Example JSON
```json
{
  "model": "AR15FireControlGroup",
  "upc": "123456789044",
  "groupId": "507f191e810c19729de860ea",
  "pinDiameter": 0.154,
  "receiverFit": "Mil-Spec",
  "material": "Steel",
  "weight": 3.0,
  "finish": "Phosphate",
  "color": ["Black"],
  "triggerType": "Single-Stage",
  "brandExample": "Geissele",
  "durability": "Precision-machined, reliable",
  "notes": "Includes trigger, hammer, and springs for Mil-Spec lowers",
  "categoryTags": ["LowerReceiver", "FireControl"],
  "includedParts": ["AR15TriggerGroup", "AR15DetentGroup", "AR15SpringGroup"],
  "vendor": []
}
```

---

### AR15ReceiverEndPlate
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                        |
|-----------------------|-----------------------|------------------------------------------------------------------------------------------------------------|
| ReceiverEndPlate      | CompleteLowerReceiver | Included in `includedParts`, `bufferTubeFit` matches included buffer tube’s `type`                         |
| ReceiverEndPlate      | StrippedLowerReceiver | `bufferTubeFit` matches buffer tube’s `type` (via buffer kit)                                              |
| ReceiverEndPlate      | BufferKit             | `bufferTubeFit` === included buffer tube’s `type`                                                          |
| ReceiverEndPlate      | Stock                 | `bufferTubeFit` === `bufferTubeType` (via buffer kit)                                                      |
| ReceiverEndPlate      | BufferTube            | `bufferTubeFit` === `type`                                                                                 |
| CompleteLowerReceiver | ReceiverEndPlate      | Included `AR15ReceiverEndPlateGroup` in `includedParts`, included buffer tube’s `type` === `bufferTubeFit` |
| StrippedLowerReceiver | ReceiverEndPlate      | `bufferTubeFit` matches buffer tube’s `type` (via buffer kit)                                              |
| BufferKit             | ReceiverEndPlate      | Included buffer tube’s `type` === `bufferTubeFit`                                                          |
| Stock                 | ReceiverEndPlate      | `bufferTubeType` === `bufferTubeFit` (via buffer kit)                                                      |
| BufferTube            | ReceiverEndPlate      | `type` === `bufferTubeFit`                                                                                 |

### Example JSON
```json
{
  "model": "AR15ReceiverEndPlate",
  "upc": "123456789044",
  "groupId": "507f191e810c19729de860ea",
  "bufferTubeFit": "Mil-Spec",
  "material": "Steel",
  "weight": 0.5,
  "finish": "Phosphate",
  "color": ["Black"],
  "thickness": 0.1,
  "brandExample": "Aero Precision",
  "durability": "High-strength, corrosion-resistant",
  "notes": "Secures Mil-Spec buffer tubes, includes sling mount option",
  "categoryTags": ["LowerReceiver", "BufferAssembly"],
  "includedParts": ["AR15ReceiverEndPlateGroup"],
  "vendor": []
}
```

---

### AR15CastleNut
#### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                 |
|-----------------------|-----------------------|-----------------------------------------------------------------------------------------------------|
| CastleNut             | CompleteLowerReceiver | Included in `includedParts`, `bufferTubeFit` matches included buffer tube’s `type`                  |
| CastleNut             | StrippedLowerReceiver | `bufferTubeFit` matches buffer tube’s `type` (via buffer kit)                                       |
| CastleNut             | BufferKit             | `bufferTubeFit` === included buffer tube’s `type`                                                   |
| CastleNut             | Stock                 | `bufferTubeFit` === `bufferTubeType` (via buffer kit)                                               |
| CastleNut             | BufferTube            | `bufferTubeFit` === `type`                                                                          |
| CastleNut             | ReceiverEndPlate      | `bufferTubeFit` === `bufferTubeFit`                                                                 |
| CompleteLowerReceiver | CastleNut             | Included `AR15CastleNutGroup` in `includedParts`, included buffer tube’s `type` === `bufferTubeFit` |
| StrippedLowerReceiver | CastleNut             | `bufferTubeFit` matches buffer tube’s `type` (via buffer kit)                                       |
| BufferKit             | CastleNut             | Included buffer tube’s `type` === `bufferTubeFit`                                                   |
| Stock                 | CastleNut             | `bufferTubeType` === `bufferTubeFit` (via buffer kit)                                               |
| BufferTube            | CastleNut             | `type` === `bufferTubeFit`                                                                          |
| ReceiverEndPlate      | CastleNut             | `bufferTubeFit` === `bufferTubeFit`                                                                 |

#### Example JSON
```json
{
  "model": "AR15CastleNut",
  "upc": "123456789045",
  "groupId": "507f191e810c19729de860ea",
  "bufferTubeFit": "Mil-Spec",
  "material": "Steel",
  "weight": 0.6,
  "finish": "Phosphate",
  "color": ["Black"],
  "diameter": 1.5,
  "brandExample": "BCM",
  "durability": "High-strength, secure",
  "notes": "Locks Mil-Spec buffer tubes to receiver end plate",
  "categoryTags": ["LowerReceiver", "BufferAssembly"],
  "includedParts": ["AR15CastleNutGroup"],
  "vendor": []
}
```

---

### AR15Detent
#### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                     |
|-----------------------|-----------------------|-----------------------------------------------------------------------------------------|
| Detent                | CompleteLowerReceiver | Included in `includedParts`, `detentType` compatible with lower specs                   |
| Detent                | StrippedLowerReceiver | `detentType` compatible with lower specs                                                |
| Detent                | TakedownPin           | `detentType` === `pinDetentType`                                                        |
| Detent                | SafetySelector        | `detentType` === `selectorDetentType`                                                   |
| Detent                | LowerPartsKit         | Included in `includedParts`, `detentType` matches                                       |
| Detent                | Spring                | `detentType` === `springFitType`                                                        |
| CompleteLowerReceiver | Detent                | Included `AR15DetentGroup` in `includedParts`, `detentType` compatible with lower specs |
| StrippedLowerReceiver | Detent                | `detentType` compatible with lower specs                                                |
| TakedownPin           | Detent                | `pinDetentType` === `detentType`                                                        |
| SafetySelector        | Detent                | `selectorDetentType` === `detentType`                                                   |
| LowerPartsKit         | Detent                | Included `AR15DetentGroup`, `detentType` matches                                        |
| Spring                | Detent                | `springFitType` === `detentType`                                                        |

#### Example JSON
```json
{
  "model": "AR15Detent",
  "upc": "123456789046",
  "groupId": "507f191e810c19729de860ea",
  "detentType": "Standard",
  "material": "Steel",
  "weight": 0.1,
  "finish": "None",
  "color": ["Silver"],
  "brandExample": "DPMS",
  "durability": "Standard, reliable",
  "notes": "Used for takedown pins and safety selectors in Mil-Spec lowers",
  "categoryTags": ["LowerReceiver", "Detent"],
  "includedParts": ["AR15DetentGroup"],
  "vendor": []
}
```

---

### AR15Spring
#### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                     |
|-----------------------|-----------------------|-----------------------------------------------------------------------------------------|
| Spring                | CompleteLowerReceiver | Included in `includedParts`, `springType` compatible with lower specs                   |
| Spring                | StrippedLowerReceiver | `springType` compatible with lower specs                                                |
| Spring                | Detent                | `springType` === `detentSpringType`                                                     |
| Spring                | TakedownPin           | `springType` === `pinSpringType`                                                        |
| Spring                | SafetySelector        | `springType` === `selectorSpringType`                                                   |
| Spring                | MagazineRelease       | `springType` === `releaseSpringType`                                                    |
| Spring                | LowerPartsKit         | Included in `includedParts`, `springType` matches                                       |
| CompleteLowerReceiver | Spring                | Included `AR15SpringGroup` in `includedParts`, `springType` compatible with lower specs |
| StrippedLowerReceiver | Spring                | `springType` compatible with lower specs                                                |
| Detent                | Spring                | `detentSpringType` === `springType`                                                     |
| TakedownPin           | Spring                | `pinSpringType` === `springType`                                                        |
| SafetySelector        | Spring                | `selectorSpringType` === `springType`                                                   |
| MagazineRelease       | Spring                | `releaseSpringType` === `springType`                                                    |
| LowerPartsKit         | Spring                | Included `AR15SpringGroup`, `springType` matches                                        |

#### Example JSON
```json
{
  "model": "AR15Spring",
  "upc": "123456789047",
  "groupId": "507f191e810c19729de860ea",
  "springType": "Standard",
  "material": "Stainless Steel",
  "weight": 0.1,
  "finish": "None",
  "color": ["Silver"],
  "brandExample": "Sprinco",
  "durability": "High-tension, reliable",
  "notes": "Used for detents, takedown pins, and magazine releases in Mil-Spec lowers",
  "categoryTags": ["LowerReceiver", "Spring"],
  "includedParts": ["AR15SpringGroup"],
  "vendor": []
}
```

---
