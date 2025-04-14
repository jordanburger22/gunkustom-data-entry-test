# AR-15 Gun Parts Compatibility Matrix

This document provides compatibility matrices and example specifications for AR-15 gun parts, supporting an app for compatibility checking and price comparison using affiliate links, without carrying inventory. Each of the 37 variant models is detailed with a matrix of all interactions (direct and as subparts) and an example JSON object containing validated compatibility fields (e.g., diameters, caliber) and customer-relevant specs (e.g., material, weight, finish) to inform users comprehensively. Fields are optional to avoid errors, and checks use direct comparisons (e.g., `handguard.innerDiameter >= barrel.outerDiameterAtGasPort`). Composite parts include subparts via `includedParts` (group names, e.g., `["AR15BarrelGroup"]`) and are tagged for primary searches (e.g., `["UpperReceiver"]`). Each variant model includes an empty `vendor` array for future affiliate links.

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

### Example JSON
```json
{
  "model": "AR15Handguard",
  "upc": "815421021035",
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
  "brandExample": "Aero Precision",
  "durability": "High-strength, corrosion-resistant",
  "notes": "Compatible with Mil-Spec upper receivers, ideal for tactical builds",
  "categoryTags": ["Handguard", "UpperReceiver"],
  "includedParts": ["AR15HandguardGroup"],
  "vendor": []
}
```

## AR15CompleteUpperReceiver
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                        |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------|
| CompleteUpperReceiver | Handguard             | `receiverType` === `requiredUpperReceiverType`                                                                             |
| CompleteUpperReceiver | StrippedUpperReceiver | `receiverType` === `receiverType` (via `includedParts` reference to `AR15StrippedUpperReceiverGroup`)                      |
| CompleteUpperReceiver | BarrelNut             | `barrelNutThread` === `thread` OR both undefined                                                                           |
| CompleteUpperReceiver | Barrel                | Included `AR15BarrelGroup` in `includedParts`, `receiverType` === `receiverFit`                                            |
| CompleteUpperReceiver | BoltCarrierGroup      | Included `AR15BoltCarrierGroupGroup` in `includedParts`, `receiverType` === `receiverFit`                                  |
| CompleteUpperReceiver | EjectionPortCover     | Included `AR15EjectionPortCoverGroup` in `includedParts`, `receiverType` === `receiverFit`                                 |
| CompleteUpperReceiver | EjectionPortHardware  | Included `AR15EjectionPortHardwareGroup` in `includedParts`, `receiverType` === `coverFit`                                 |
| CompleteUpperReceiver | ForwardAssist         | Included `AR15ForwardAssistGroup` in `includedParts`, `receiverType` === `receiverFit`                                     |
| CompleteUpperReceiver | ChargingHandle        | Included `AR15ChargingHandleGroup` in `includedParts`, `receiverType` === `receiverFit`                                    |
| CompleteUpperReceiver | GasSystem             | Included `AR15GasSystemGroup` in `includedParts`, included barrel’s `receiverFit` compatible with `receiverType`           |
| CompleteUpperReceiver | MuzzleDevice          | Included `AR15MuzzleDeviceGroup` in `includedParts`, matches included barrel’s `threading` and `caliber`                   |
| Handguard             | CompleteUpperReceiver | `requiredUpperReceiverType` === `receiverType`                                                                             |
| StrippedUpperReceiver | CompleteUpperReceiver | `receiverType` === `receiverType` (via `includedParts`)                                                                    |
| BarrelNut             | CompleteUpperReceiver | `thread` === `barrelNutThread` AND `receiverFit` === `receiverType` OR both undefined                                      |
| Barrel                | CompleteUpperReceiver | Included in `includedParts` as `AR15BarrelGroup`, `receiverFit` === `receiverType`                                         |
| BoltCarrierGroup      | CompleteUpperReceiver | Included in `includedParts` as `AR15BoltCarrierGroupGroup`, `receiverFit` === `receiverType`                               |
| EjectionPortCover     | CompleteUpperReceiver | Included in `includedParts` as `AR15EjectionPortCoverGroup`, `receiverType` === `receiverFit`                              |
| EjectionPortHardware  | CompleteUpperReceiver | Included in `includedParts` as `AR15EjectionPortHardwareGroup`, `receiverType` === `coverFit`                              |
| ForwardAssist         | CompleteUpperReceiver | Included in `includedParts` as `AR15ForwardAssistGroup`, `receiverType` === `receiverFit`                                  |
| ChargingHandle        | CompleteUpperReceiver | `receiverFit` === `receiverType`                                                                                           |
| GasSystem             | CompleteUpperReceiver | Included in `includedParts` as `AR15GasSystemGroup`                                                                        |
| MuzzleDevice          | CompleteUpperReceiver | Included `AR15MuzzleDeviceGroup` in `includedParts`, matches included barrel’s `threading` and `caliber`                   |
| CompleteLowerReceiver | CompleteUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group) |
| StrippedLowerReceiver | CompleteUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group) |
| Magazine              | CompleteUpperReceiver | `caliber` === included barrel’s `caliber` AND included bolt’s `caliber` (inter-group)                                      |

### Example JSON
```json
{
  "model": "AR15CompleteUpperReceiver",
  "upc": "123456789012",
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
  "includedParts": ["AR15BarrelGroup", "AR15MuzzleDeviceGroup", "AR15HandguardGroup", "AR15BoltCarrierGroupGroup", "AR15EjectionPortCoverGroup", "AR15EjectionPortHardwareGroup", "AR15ForwardAssistGroup", "AR15ChargingHandleGroup", "AR15GasSystemGroup", "AR15BarrelNutGroup"],
  "vendor": []
}
```

## AR15StrippedUpperReceiver
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                        |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------|
| StrippedUpperReceiver | Handguard             | `receiverType` === `requiredUpperReceiverType`                                                                             |
| StrippedUpperReceiver | BarrelNut             | `barrelNutThread` === `thread` OR both undefined                                                                           |
| StrippedUpperReceiver | EjectionPortCover     | `ejectionPortFit` === `receiverFit`                                                                                        |
| StrippedUpperReceiver | ForwardAssist         | `forwardAssistFit` === `receiverFit`                                                                                       |
| Handguard             | StrippedUpperReceiver | `requiredUpperReceiverType` === `receiverType`                                                                             |
| CompleteUpperReceiver | StrippedUpperReceiver | `receiverType` === `receiverType` (via `includedParts` reference to `AR15StrippedUpperReceiverGroup`)                      |
| BarrelNut             | StrippedUpperReceiver | `thread` === `barrelNutThread` AND `receiverFit` === `receiverType` OR both undefined                                      |
| CompleteLowerReceiver | StrippedUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group) |
| StrippedLowerReceiver | StrippedUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group) |
| Magazine              | StrippedUpperReceiver | `caliber` === included barrel’s `caliber` AND included bolt’s `caliber` (inter-group)                                      |

### Example JSON
```json
{
  "model": "AR15StrippedUpperReceiver",
  "upc": "123456789013",
  "receiverType": "Mil-Spec",
  "barrelNutThread": "1-7/16-16",
  "ejectionPortFit": "Mil-Spec",
  "forwardAssistFit": "Mil-Spec",
  "material": "7075-T6 Aluminum",
  "weight": 7.0,
  "finish": "Hardcoat Anodized",
  "color": ["Black"],
  "length": 8.0,
  "brandExample": "Aero Precision",
  "durability": "High-strength, corrosion-resistant",
  "notes": "Requires assembly with barrel, handguard, and other components",
  "categoryTags": ["UpperReceiver", "Receiver"],
  "includedParts": ["AR15StrippedUpperReceiverGroup"],
  "vendor": []
}
```

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

## AR15EjectionPortHardware
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

## AR15BoltCarrierGroup
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                          |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------|
| BoltCarrierGroup      | CompleteUpperReceiver | Included in `includedParts` as `AR15BoltCarrierGroupGroup`, `receiverFit` === `receiverType` |
| BoltCarrierGroup      | Barrel                | Included bolt’s `caliber` === `caliber`                                                      |
| BoltCarrierGroup      | Bolt                  | Included `AR15BoltGroup` in `includedParts`, `carrierFit` matches                            |
| BoltCarrierGroup      | BoltHardware          | Included `AR15BoltHardwareGroup` in `includedParts`, `carrierFit` matches                    |
| BoltCarrierGroup      | CamPin                | Included `AR15CamPinGroup` in `includedParts`, `carrierFit` matches                          |
| BoltCarrierGroup      | ChargingHandle        | `receiverFit` matches (both compatible with same upper receiver)                             |
| CompleteUpperReceiver | BoltCarrierGroup      | Included `AR15BoltCarrierGroupGroup` in `includedParts`, `receiverType` === `receiverFit`    |
| Barrel                | BoltCarrierGroup      | `caliber` === included bolt’s `caliber`                                                      |
| Bolt                  | BoltCarrierGroup      | Included in `includedParts` as `AR15BoltGroup`, `carrierFit` matches                         |
| BoltHardware          | BoltCarrierGroup      | Included in `includedParts` as `AR15BoltHardwareGroup`, `carrierFit` matches                 |
| CamPin                | BoltCarrierGroup      | Included in `includedParts` as `AR15CamPinGroup`, `carrierFit` matches                       |
| ChargingHandle        | BoltCarrierGroup      | `receiverFit` matches (both compatible with same upper receiver)                             |

### Example JSON
```json
{
  "model": "AR15BoltCarrierGroup",
  "upc": "123456789019",
  "carrierType": "Full-Auto",
  "receiverFit": "Mil-Spec",
  "caliberCompatibility": "5.56mm",
  "material": "Carpenter 158 Steel",
  "weight": 11.5,
  "finish": "Phosphate",
  "color": ["Black"],
  "brandExample": "Toolcraft",
  "durability": "MIL-STD-171, high wear resistance",
  "notes": "Includes bolt, cam pin, and firing pin; Mil-Spec compatible",
  "categoryTags": ["UpperReceiver", "BoltCarrier"],
  "includedParts": ["AR15BoltGroup", "AR15BoltHardwareGroup", "AR15CamPinGroup"],
  "vendor": []
}
```

## AR15Bolt
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

## AR15BoltHardware
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

## AR15CamPin
### Compatibility Matrix
| Model A               | Model B          | Compatibility Check                                                                                   |
|-----------------------|------------------|-------------------------------------------------------------------------------------------------------|
| CamPin                | BoltCarrierGroup | Included in `includedParts` as `AR15CamPinGroup`, `carrierFit` matches                                |
| BoltCarrierGroup      | CamPin           | Included `AR15CamPinGroup` in `includedParts`, `carrierFit` matches                                   |
| CompleteUpperReceiver | CamPin           | Included `AR15CamPinGroup` in `includedParts` (via `AR15BoltCarrierGroupGroup`), `carrierFit` matches |

### Example JSON
```json
{
  "model": "AR15CamPin",
  "upc": "123456789022",
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

## AR15Barrel
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                             |
|-----------------------|-----------------------|-------------------------------------------------------------------------------------------------|
| Barrel                | Handguard             | `outerDiameterAtGasPort` <= `innerDiameter` AND `outerDiameterAtGasPort` <= `barrelDiameterMax` |
| Barrel                | CompleteUpperReceiver | Included in `includedParts` as `AR15BarrelGroup`, `receiverFit` === `receiverType`              |
| Barrel                | GasSystem             | `gasPortLocation` === `gasLength` AND `caliber` === `caliberCompatibility`                      |
| Barrel                | BoltCarrierGroup      | `caliber` === included bolt’s `caliber`                                                         |
| Barrel                | MuzzleDevice          | `threading` === `threading` AND `caliber` === `caliberCompatibility`                            |
| Handguard             | Barrel                | `innerDiameter` >= `outerDiameterAtGasPort` AND `barrelDiameterMax` >= `outerDiameterAtGasPort` |
| CompleteUpperReceiver | Barrel                | Included `AR15BarrelGroup` in `includedParts`, `receiverType` === `receiverFit`                 |
| GasSystem             | Barrel                | `gasLength` === `gasPortLocation` AND `caliberCompatibility` === `caliber`                      |
| BoltCarrierGroup      | Barrel                | Included bolt’s `caliber` === `caliber`                                                         |
| MuzzleDevice          | Barrel                | `threading` === `threading` AND `caliber` === `caliberCompatibility`                            |
| Magazine              | Barrel                | `caliber` === `caliber` (inter-group via upper receiver)                                        |

### Example JSON
```json
{
  "model": "AR15Barrel",
  "upc": "123456789023",
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
  "brandExample": "Ballistic Advantage",
  "durability": "MIL-STD, corrosion-resistant",
  "notes": "Mid-length gas system, Mil-Spec compatible",
  "categoryTags": ["Barrel", "BarrelAssembly"],
  "includedParts": ["AR15BarrelGroup"],
  "vendor": []
}
```

## AR15MuzzleDevice
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                      |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------------------|
| MuzzleDevice          | CompleteUpperReceiver | Included `AR15MuzzleDeviceGroup` in `includedParts`, matches included barrel’s `threading` and `caliber` |
| MuzzleDevice          | Barrel                | `threading` === `threading` AND `caliber` === `caliberCompatibility`                                     |
| CompleteUpperReceiver | MuzzleDevice          | Included `AR15MuzzleDeviceGroup` in `includedParts`, matches included barrel’s `threading` and `caliber` |
| Barrel                | MuzzleDevice          | `threading` === `threading` AND `caliber` === `caliberCompatibility`                                     |

### Example JSON
```json
{
  "model": "AR15MuzzleDevice",
  "upc": "123456789024",
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

## AR15GasSystem
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                           |
|-----------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------------|
| GasSystem             | Handguard             | `gasLength` in `gasSystemCompatibility`                                                                                       |
| GasSystem             | Barrel                | `gasLength` === `gasPortLocation` AND `caliberCompatibility` === `caliber`                                                    |
| GasSystem             | CompleteUpperReceiver | Included in `includedParts` as `AR15GasSystemGroup`                                                                           |
| GasSystem             | GasBlock              | Included `AR15GasBlockGroup` in `includedParts`, `gasSystemFit` matches, `innerDiameter` >= barrel’s `outerDiameterAtGasPort` |
| GasSystem             | GasTube               | Included `AR15GasTubeGroup` in `includedParts`, `gasSystemFit` === `gasSystemFit`, `length` matches                           |
| Handguard             | GasSystem             | `gasSystemCompatibility` includes `gasLength`                                                                                 |
| Barrel                | GasSystem             | `gasPortLocation` === `gasLength` AND `caliber` === `caliberCompatibility`                                                    |
| CompleteUpperReceiver | GasSystem             | Included `AR15GasSystemGroup` in `includedParts`, included barrel’s `receiverFit` compatible with `receiverType`              |
| GasBlock              | GasSystem             | Included in `includedParts` as `AR15GasBlockGroup`, `gasSystemFit` matches                                                    |
| GasTube               | GasSystem             | Included in `includedParts` as `AR15GasTubeGroup`, `gasSystemFit` === `gasSystemFit`                                          |

### Example JSON
```json
{
  "model": "AR15GasSystem",
  "upc": "123456789025",
  "gasLength": "Mid-length",
  "caliberCompatibility": "5.56mm",
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

## AR15GasTube
### Compatibility Matrix
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

## AR15ChargingHandle
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                     |
|-----------------------|-----------------------|-----------------------------------------------------------------------------------------|
| ChargingHandle        | CompleteUpperReceiver | `receiverFit` === `receiverType`                                                        |
| ChargingHandle        | BoltCarrierGroup      | `receiverFit` matches (both compatible with same upper receiver)                        |
| CompleteUpperReceiver | ChargingHandle        | Included `AR15ChargingHandleGroup` in `includedParts`, `receiverType` === `receiverFit` |
| BoltCarrierGroup      | ChargingHandle        | `receiverFit` matches (both compatible with same upper receiver)                        |

### Example JSON
```json
{
  "model": "AR15ChargingHandle",
  "upc": "123456789028",
  "receiverFit": "Mil-Spec",
  "designType": "Standard",
  "material": "6061-T6 Aluminum",
  "weight": 1.2,
  "finish": "Hardcoat Anodized",
  "color": ["Black"],
  "brandExample": "Radian Raptor",
  "durability": "High-strength, reliable operation",
  "notes": "Standard design for Mil-Spec uppers",
  "categoryTags": ["UpperReceiver", "ReceiverParts"],
  "includedParts": ["AR15ChargingHandleGroup"],
  "vendor": []
}
```

## AR15BarrelNut
### Compatibility Matrix
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

## AR15CompleteLowerReceiver
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                                                  |
|-----------------------|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| CompleteLowerReceiver | StrippedLowerReceiver | `receiverType` === `receiverType` (via `includedParts` reference to `AR15StrippedLowerReceiverGroup`)                                                |
| CompleteLowerReceiver | Trigger               | Included `AR15TriggerGroup` in `includedParts`, `triggerPinDiameter` === `pinDiameter`                                                               |
| CompleteLowerReceiver | TriggerGuard          | Included `AR15TriggerGuardGroup` in `includedParts`, `receiverType` === `receiverFit` AND `triggerPinDiameter` === `pinDiameter`                     |
| CompleteLowerReceiver | Grip                  | Included `AR15GripGroup` in `includedParts`, `receiverType` === `receiverFit`                                                                        |
| CompleteLowerReceiver | Stock                 | Included `AR15StockGroup` in `includedParts`, `receiverType` compatible with included buffer tube’s `type`                                           |
| CompleteLowerReceiver | BufferKit             | Included `AR15BufferKitGroup` in `includedParts`, included buffer tube’s `type` matches stock’s `bufferTubeType`                                     |
| CompleteLowerReceiver | Magazine              | Included `AR15MagazineGroup` in `includedParts`, `caliberCompatibility` includes `caliber`                                                           |
| CompleteLowerReceiver | TakedownPin           | Included `AR15TakedownPinGroup` in `includedParts`, `takedownPinDiameter` === `diameter`                                                             |
| CompleteLowerReceiver | SafetySelector        | Included `AR15SafetySelectorGroup` in `includedParts`, `receiverType` === `receiverFit`                                                              |
| CompleteLowerReceiver | BoltCatch             | Included `AR15BoltCatchGroup` in `includedParts`, `receiverType` === `receiverFit`                                                                   |
| CompleteLowerReceiver | MagazineRelease       | Included `AR15MagazineReleaseGroup` in `includedParts`, `receiverType` === `receiverFit` AND `magazineFit` matches included magazine’s `receiverFit` |
| CompleteLowerReceiver | FireControlGroup      | Included `AR15FireControlGroupGroup` in `includedParts`, `triggerPinDiameter` === `pinDiameter`                                                      |
| CompleteLowerReceiver | ReceiverEndPlate      | Included `AR15ReceiverEndPlateGroup` in `includedParts`, included buffer tube’s `type` === `bufferTubeFit`                                           |
| CompleteLowerReceiver | CastleNut             | Included `AR15CastleNutGroup` in `includedParts`, included buffer tube’s `type` === `bufferTubeFit`                                                  |
| CompleteLowerReceiver | Detent                | Included `AR15DetentGroup` in `includedParts`, `receiverType` === `receiverFit`                                                                      |
| CompleteLowerReceiver | Spring                | Included `AR15SpringGroup` in `includedParts`, `receiverType` === `receiverFit`                                                                      |
| CompleteLowerReceiver | LowerPartsKit         | Included `AR15LowerPartsKitGroup` in `includedParts`, `receiverType` === `receiverFit`                                                               |
| CompleteLowerReceiver | CompleteUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group)                           |
| CompleteLowerReceiver | StrippedUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group)                           |
| StrippedLowerReceiver | CompleteLowerReceiver | `receiverType` === `receiverType` (via `includedParts`)                                                                                              |
| Trigger               | CompleteLowerReceiver | Included in `includedParts`, `pinDiameter` === `triggerPinDiameter`                                                                                  |
| TriggerGuard          | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType` AND `pinDiameter` === `triggerPinDiameter`                                             |
| Grip                  | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                                                                                        |
| Stock                 | CompleteLowerReceiver | Included in `includedParts`, `bufferTubeType` matches included buffer tube’s `type`                                                                  |
| BufferKit             | CompleteLowerReceiver | Included in `includedParts`, included buffer tube’s `type` matches stock’s `bufferTubeType`                                                          |
| Magazine              | CompleteLowerReceiver | Included in `includedParts`, `caliber` in `caliberCompatibility`                                                                                     |
| TakedownPin           | CompleteLowerReceiver | Included in `includedParts`, `diameter` === `takedownPinDiameter`                                                                                    |
| SafetySelector        | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                                                                                        |
| BoltCatch             | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                                                                                        |
| MagazineRelease       | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType` AND `magazineFit` matches magazine’s `receiverFit`                                     |
| FireControlGroup      | CompleteLowerReceiver | Included in `includedParts`, `pinDiameter` === `triggerPinDiameter`                                                                                  |
| ReceiverEndPlate      | CompleteLowerReceiver | Included in `includedParts`, `bufferTubeFit` matches included buffer tube’s `type`                                                                   |
| CastleNut             | CompleteLowerReceiver | Included in `includedParts`, `bufferTubeFit` matches included buffer tube’s `type`                                                                   |
| Detent                | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                                                                                        |
| Spring                | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                                                                                        |
| LowerPartsKit         | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                                                                                        |

### Example JSON
```json
{
  "model": "AR15CompleteLowerReceiver",
  "upc": "123456789014",
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
  "includedParts": ["AR15TriggerGroup", "AR15TriggerGuardGroup", "AR15GripGroup", "AR15StockGroup", "AR15BufferKitGroup", "AR15TakedownPinGroup", "AR15SafetySelectorGroup", "AR15BoltCatchGroup", "AR15MagazineReleaseGroup", "AR15FireControlGroupGroup", "AR15ReceiverEndPlateGroup", "AR15CastleNutGroup", "AR15DetentGroup", "AR15SpringGroup", "AR15LowerPartsKitGroup"],
  "vendor": []
}
```
## AR15StrippedLowerReceiver
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                        |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------|
| StrippedLowerReceiver | CompleteLowerReceiver | `receiverType` === `receiverType` (via `includedParts`)                                                                    |
| StrippedLowerReceiver | Trigger               | `triggerPinDiameter` === `pinDiameter`                                                                                     |
| StrippedLowerReceiver | TriggerGuard          | `receiverType` === `receiverFit` AND `triggerPinDiameter` === `pinDiameter`                                                |
| StrippedLowerReceiver | Grip                  | `receiverType` === `receiverFit`                                                                                           |
| StrippedLowerReceiver | Stock                 | `receiverType` compatible with buffer tube’s `type` (via buffer kit)                                                       |
| StrippedLowerReceiver | BufferKit             | Buffer tube’s `type` matches stock’s `bufferTubeType` (via stock compatibility)                                            |
| StrippedLowerReceiver | Magazine              | `caliberCompatibility` includes `caliber`                                                                                  |
| StrippedLowerReceiver | TakedownPin           | `takedownPinDiameter` === `diameter`                                                                                       |
| StrippedLowerReceiver | SafetySelector        | `receiverType` === `receiverFit`                                                                                           |
| StrippedLowerReceiver | BoltCatch             | `receiverType` === `receiverFit`                                                                                           |
| StrippedLowerReceiver | MagazineRelease       | `receiverType` === `receiverFit` AND `magazineFit` matches magazine’s `receiverFit`                                        |
| StrippedLowerReceiver | FireControlGroup      | `triggerPinDiameter` === `pinDiameter`                                                                                     |
| StrippedLowerReceiver | ReceiverEndPlate      | Buffer tube’s `type` === `bufferTubeFit` (via buffer kit)                                                                  |
| StrippedLowerReceiver | CastleNut             | Buffer tube’s `type` === `bufferTubeFit` (via buffer kit)                                                                  |
| StrippedLowerReceiver | Detent                | `receiverType` === `receiverFit`                                                                                           |
| StrippedLowerReceiver | Spring                | `receiverType` === `receiverFit`                                                                                           |
| StrippedLowerReceiver | LowerPartsKit         | `receiverType` === `receiverFit`                                                                                           |
| StrippedLowerReceiver | CompleteUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group) |
| StrippedLowerReceiver | StrippedUpperReceiver | `takedownPinDiameter` === `takedownPinDiameter` AND `caliberCompatibility` includes upper’s barrel `caliber` (inter-group) |
| CompleteLowerReceiver | StrippedLowerReceiver | `receiverType` === `receiverType` (via `includedParts` reference to `AR15StrippedLowerReceiverGroup`)                      |
| Trigger               | StrippedLowerReceiver | `pinDiameter` === `triggerPinDiameter`                                                                                     |
| TriggerGuard          | StrippedLowerReceiver | `receiverFit` === `receiverType` AND `pinDiameter` === `triggerPinDiameter`                                                |
| Grip                  | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                                                           |
| Stock                 | StrippedLowerReceiver | `bufferTubeType` matches buffer tube’s `type` (via buffer kit)                                                             |
| BufferKit             | StrippedLowerReceiver | Included buffer tube’s `type` matches stock’s `bufferTubeType`                                                             |
| Magazine              | StrippedLowerReceiver | `caliber` in `caliberCompatibility`                                                                                        |
| TakedownPin           | StrippedLowerReceiver | `diameter` === `takedownPinDiameter`                                                                                       |
| SafetySelector        | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                                                           |
| BoltCatch             | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                                                           |
| MagazineRelease       | StrippedLowerReceiver | `receiverFit` === `receiverType` AND `magazineFit` matches magazine’s `receiverFit`                                        |
| FireControlGroup      | StrippedLowerReceiver | `pinDiameter` === `triggerPinDiameter`                                                                                     |
| ReceiverEndPlate      | StrippedLowerReceiver | `bufferTubeFit` matches buffer tube’s `type` (via buffer kit)                                                              |
| CastleNut             | StrippedLowerReceiver | `bufferTubeFit` matches buffer tube’s `type` (via buffer kit)                                                              |
| Detent                | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                                                           |
| Spring                | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                                                           |
| LowerPartsKit         | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                                                           |

### Example JSON
```json
{
  "model": "AR15StrippedLowerReceiver",
  "upc": "123456789030",
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
  "includedParts": ["AR15StrippedLowerReceiverGroup"],
  "vendor": []
}
```

## AR15LowerPartsKit
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                    |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------|
| LowerPartsKit         | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                          |
| LowerPartsKit         | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                       |
| LowerPartsKit         | TakedownPin           | Included `AR15TakedownPinGroup`, `receiverFit` matches                                 |
| LowerPartsKit         | SafetySelector        | Included `AR15SafetySelectorGroup`, `receiverFit` matches                              |
| LowerPartsKit         | BoltCatch             | Included `AR15BoltCatchGroup`, `receiverFit` matches                                   |
| LowerPartsKit         | MagazineRelease       | Included `AR15MagazineReleaseGroup`, `receiverFit` matches                             |
| LowerPartsKit         | Detent                | Included `AR15DetentGroup`, `receiverFit` matches                                      |
| LowerPartsKit         | Spring                | Included `AR15SpringGroup`, `receiverFit` matches                                      |
| CompleteLowerReceiver | LowerPartsKit         | Included `AR15LowerPartsKitGroup` in `includedParts`, `receiverType` === `receiverFit` |
| StrippedLowerReceiver | LowerPartsKit         | `receiverType` === `receiverFit`                                                       |
| TakedownPin           | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                                     |
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

## AR15Grip
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                           |
|-----------------------|-----------------------|-------------------------------------------------------------------------------|
| Grip                  | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                 |
| Grip                  | StrippedLowerReceiver | `receiverFit` === `receiverType`                                              |
| CompleteLowerReceiver | Grip                  | Included `AR15GripGroup` in `includedParts`, `receiverType` === `receiverFit` |
| StrippedLowerReceiver | Grip                  | `receiverType` === `receiverFit`                                              |

### Example JSON
```json
{
  "model": "AR15Grip",
  "upc": "123456789032",
  "receiverFit": "Mil-Spec",
  "material": "Polymer",
  "weight": 2.8,
  "finish": "Textured",
  "color": ["Black", "FDE"],
  "length": 4.0,
  "brandExample": "Magpul MOE",
  "durability": "Impact-resistant, ergonomic",
  "notes": "Fits Mil-Spec lowers, includes mounting screw",
  "categoryTags": ["LowerReceiver", "ReceiverParts"],
  "includedParts": ["AR15GripGroup"],
  "vendor": []
}
```

## AR15Trigger
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
  "pinDiameter": 0.154,
  "receiverFit": "Mil-Spec",
  "triggerType": "Single-Stage",
  "material": "Steel",
  "weight": 2.5,
  "finish": "Phosphate",
  "color": ["Black"],
  "pullWeight": 5.5,
  "brandExample": "ALG Defense",
  "durability": "Precision-machined, reliable",
  "notes": "Crisp break, fits Mil-Spec lowers",
  "categoryTags": ["LowerReceiver", "FireControl"],
  "includedParts": ["AR15TriggerGroup"],
  "vendor": []
}
```

## AR15TriggerGuard
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                                              |
|-----------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------------|
| TriggerGuard          | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType` AND `pinDiameter` === `triggerPinDiameter`                         |
| TriggerGuard          | StrippedLowerReceiver | `receiverFit` === `receiverType` AND `pinDiameter` === `triggerPinDiameter`                                                      |
| TriggerGuard          | Trigger               | `pinDiameter` === `pinDiameter`                                                                                                  |
| CompleteLowerReceiver | TriggerGuard          | Included `AR15TriggerGuardGroup` in `includedParts`, `receiverType` === `receiverFit` AND `triggerPinDiameter` === `pinDiameter` |
| StrippedLowerReceiver | TriggerGuard          | `receiverType` === `receiverFit` AND `triggerPinDiameter` === `pinDiameter`                                                      |
| Trigger               | TriggerGuard          | `pinDiameter` === `pinDiameter`                                                                                                  |

### Example JSON
```json
{
  "model": "AR15TriggerGuard",
  "upc": "123456789034",
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

## AR15Stock
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                        |
|-----------------------|-----------------------|------------------------------------------------------------------------------------------------------------|
| Stock                 | CompleteLowerReceiver | Included in `includedParts`, `bufferTubeType` matches included buffer tube’s `type`                        |
| Stock                 | StrippedLowerReceiver | `bufferTubeType` matches buffer tube’s `type` (via buffer kit)                                             |
| Stock                 | BufferKit             | `bufferTubeType` === included buffer tube’s `type`                                                         |
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

## AR15BufferKit
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

## AR15Buffer
### Compatibility Matrix
| Model A               | Model B   | Compatibility Check                                                                            |
|-----------------------|-----------|------------------------------------------------------------------------------------------------|
| Buffer                | BufferKit | Included in `includedParts`, `bufferType` matches                                              |
| BufferKit             | Buffer    | Included `AR15BufferGroup`, `bufferType` matches                                               |
| CompleteLowerReceiver | Buffer    | Included `AR15BufferGroup` in `includedParts` (via `AR15BufferKitGroup`), `bufferType` matches |

### Example JSON
```json
{
  "model": "AR15Buffer",
  "upc": "123456789037",
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

## AR15BufferTube
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

## AR15BufferSpring
### Compatibility Matrix
| Model A               | Model B      | Compatibility Check                                                                                     |
|-----------------------|--------------|---------------------------------------------------------------------------------------------------------|
| BufferSpring          | BufferKit    | Included in `includedParts`, `bufferTubeFit` matches                                                    |
| BufferKit             | BufferSpring | Included `AR15BufferSpringGroup`, `bufferTubeFit` matches                                               |
| CompleteLowerReceiver | BufferSpring | Included `AR15BufferSpringGroup` in `includedParts` (via `AR15BufferKitGroup`), `bufferTubeFit` matches |

### Example JSON
```json
{
  "model": "AR15BufferSpring",
  "upc": "123456789039",
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

## AR15Magazine
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

## AR15TakedownPin
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

## AR15SafetySelector
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

## AR15BoltCatch
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

## AR15MagazineRelease
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

## AR15FireControlGroup
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                             |
|-----------------------|-----------------------|-------------------------------------------------------------------------------------------------|
| FireControlGroup      | CompleteLowerReceiver | Included in `includedParts`, `pinDiameter` === `triggerPinDiameter`                             |
| FireControlGroup      | StrippedLowerReceiver | `pinDiameter` === `triggerPinDiameter`                                                          |
| FireControlGroup      | Trigger               | Included `AR15TriggerGroup`, `pinDiameter` matches                                              |
| CompleteLowerReceiver | FireControlGroup      | Included `AR15FireControlGroupGroup` in `includedParts`, `triggerPinDiameter` === `pinDiameter` |
| StrippedLowerReceiver | FireControlGroup      | `trigger系统由 `pinDiameter` === `triggerPinDiameter`                                            |
| Trigger               | FireControlGroup      | Included `AR15TriggerGroup`, `pinDiameter` matches                                 |

### Example JSON
```json
{
  "model": "AR15FireControlGroup",
  "upc": "123456789044",
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

## AR15ReceiverEndPlate
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

## AR15CastleNut
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                                                 |
|-----------------------|-----------------------|-----------------------------------------------------------------------------------------------------|
| CastleNut             | CompleteLowerReceiver | Included in `includedParts`, `bufferTubeFit` matches included buffer tube’s `type`                  |
| CastleNut             | StrippedLowerReceiver | `bufferTubeFit` matches buffer tube’s `type` (via buffer kit)                                       |
| CastleNut             | BufferKit             | `bufferTubeFit` === included buffer tube’s `type`                                                   |
| CastleNut             | Stock                 | `bufferTubeFit` === `bufferTubeType` (via buffer kit)                                               |
| CastleNut             | BufferTube            | `bufferTubeFit` === `type`                                                                          |
| CompleteLowerReceiver | CastleNut             | Included `AR15CastleNutGroup` in `includedParts`, included buffer tube’s `type` === `bufferTubeFit` |
| StrippedLowerReceiver | CastleNut             | `bufferTubeFit` matches buffer tube’s `type` (via buffer kit)                                       |
| BufferKit             | CastleNut             | Included buffer tube’s `type` === `bufferTubeFit`                                                   |
| Stock                 | CastleNut             | `bufferTubeType` === `bufferTubeFit` (via buffer kit)                                               |
| BufferTube            | CastleNut             | `type` === `bufferTubeFit`                                                                          |

### Example JSON
```json
{
  "model": "AR15CastleNut",
  "upc": "123456789045",
  "bufferTubeFit": "Mil-Spec",
  "material": "Steel",
  "weight": 0.8,
  "finish": "Phosphate",
  "color": ["Black"],
  "diameter": 1.5,
  "brandExample": "Bravo Company",
  "durability": "High-torque, corrosion-resistant",
  "notes": "Secures Mil-Spec buffer tubes to lower receivers",
  "categoryTags": ["LowerReceiver", "BufferAssembly"],
  "includedParts": ["AR15CastleNutGroup"],
  "vendor": []
}
```

## AR15Detent
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                             |
|-----------------------|-----------------------|---------------------------------------------------------------------------------|
| Detent                | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                   |
| Detent                | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                |
| Detent                | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                              |
| Detent                | FireControlGroup      | Included in `includedParts` as `AR15DetentGroup`, `receiverFit` matches         |
| CompleteLowerReceiver | Detent                | Included `AR15DetentGroup` in `includedParts`, `receiverType` === `receiverFit` |
| StrippedLowerReceiver | Detent                | `receiverType` === `receiverFit`                                                |
| LowerPartsKit         | Detent                | Included `AR15DetentGroup`, `receiverFit` matches                               |
| FireControlGroup      | Detent                | Included `AR15DetentGroup`, `receiverFit` matches                               |

### Example JSON
```json
{
  "model": "AR15Detent",
  "upc": "123456789046",
  "receiverFit": "Mil-Spec",
  "material": "Steel",
  "weight": 0.1,
  "finish": "Phosphate",
  "color": ["Black"],
  "length": 0.3,
  "brandExample": "KNS Precision",
  "durability": "High-tension, reliable retention",
  "notes": "Used for takedown pins and safety selectors in Mil-Spec lowers",
  "categoryTags": ["LowerReceiver", "ReceiverParts"],
  "includedParts": ["AR15DetentGroup"],
  "vendor": []
}
```

## AR15Spring
### Compatibility Matrix
| Model A               | Model B               | Compatibility Check                                                             |
|-----------------------|-----------------------|---------------------------------------------------------------------------------|
| Spring                | CompleteLowerReceiver | Included in `includedParts`, `receiverFit` === `receiverType`                   |
| Spring                | StrippedLowerReceiver | `receiverFit` === `receiverType`                                                |
| Spring                | LowerPartsKit         | Included in `includedParts`, `receiverFit` matches                              |
| Spring                | FireControlGroup      | Included in `includedParts` as `AR15SpringGroup`, `receiverFit` matches         |
| CompleteLowerReceiver | Spring                | Included `AR15SpringGroup` in `includedParts`, `receiverType` === `receiverFit` |
| StrippedLowerReceiver | Spring                | `receiverType` === `receiverFit`                                                |
| LowerPartsKit         | Spring                | Included `AR15SpringGroup`, `receiverFit` matches                               |
| FireControlGroup      | Spring                | Included `AR15SpringGroup`, `receiverFit` matches                               |

### Example JSON
```json
{
  "model": "AR15Spring",
  "upc": "123456789047",
  "receiverFit": "Mil-Spec",
  "material": "Stainless Steel",
  "weight": 0.2,
  "finish": "Polished",
  "color": ["Silver"],
  "length": 1.0,
  "brandExample": "Sprinco",
  "durability": "High-tension, corrosion-resistant",
  "notes": "Used for detents and small components in Mil-Spec lowers",
  "categoryTags": ["LowerReceiver", "ReceiverParts"],
  "includedParts": ["AR15SpringGroup"],
  "vendor": []
}
```
