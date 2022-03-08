// Print Outputs
function printOutputs() {
    // Declare all fixed variables 
    const bbpSavingTarget = 0.75;
    const bbpMinimumSavingCost = 100000;
    const baselineElectricPrice = 0.28;
    const baselineAverageChillerPlantLoad = 0.35;
    const estimatedChillerCapacityLoss = 0.15;
    const baselineCO2 = 0.50;
    const pumpDesignOverCapacity = 0.20;

    // Get values from inputs
        // Get Chiller Values
    const params = new URLSearchParams(document.location.search);
    const chiller1Value = Math.floor(params.get("chiller1param"));
    const chiller2Value = Math.floor(params.get("chiller2param"));
    const chiller3Value = Math.floor(params.get("chiller3param"));
    const chiller4Value = Math.floor(params.get("chiller4param"));
    const chiller5Value = Math.floor(params.get("chiller5param"));
    const allChillersValue = chiller1Value + chiller2Value + chiller3Value + chiller4Value + chiller5Value;
    console.log(allChillersValue)
            
    // Count Number of Chillers
    const chillerList = [chiller1Value, chiller2Value, chiller3Value, chiller4Value, chiller5Value];
    console.log(chillerList);

    function countChillers(total) {
        return total > 0 & total != NaN;
    }

    // Chiller 1 Calculations
    const nominalCapacity = allChillersValue;
    const nominalPower = nominalCapacity / 1.4;
    const numOfChillers = chillerList.filter(countChillers).length;
    console.log(numOfChillers);
    const chillerEfficiency = nominalPower / nominalCapacity;
    const correctedCapacity = nominalCapacity * (1 - estimatedChillerCapacityLoss);
    const correctedChillerEfficiency = nominalPower / chillerEfficiency;
    const nominalTotalCapacity = nominalCapacity * numOfChillers;
    const correctedTotalCapacity = correctedCapacity * numOfChillers;
    const yearlyEnergyUsage = correctedTotalCapacity * correctedChillerEfficiency * 365 * 24 * baselineAverageChillerPlantLoad;

    // Chillers Totals
    const nominalCapacityOfAllChillers = (chiller1Value + chiller2Value + chiller3Value + chiller4Value + chiller5Value);

    // Condenser pump(s) Calculations
    const condenserNominalTotalPower = (14.0148778886542 + 0.11630564 * nominalPower) * numOfChillers;
    const condenserNominalTotalPowerCorrectedToLoad = condenserNominalTotalPower * (1 - pumpDesignOverCapacity);
    const condenserPumpsYearlyEnergyUsage = condenserNominalTotalPowerCorrectedToLoad * 24 * 365 * baselineAverageChillerPlantLoad;
    const condenserPumpEfficiency = condenserNominalTotalPowerCorrectedToLoad / nominalTotalCapacity;

    // Primary Pump(s) Calculations
    const primaryNominalTotalPower = (14.7360878094534 + 0.02728417 * nominalPower) * numOfChillers;
    const primaryNominalTotalPowerCorrectedToLoad = primaryNominalTotalPower * (1 - pumpDesignOverCapacity);
    const primaryPumpsYearlyEnergyUsage = primaryNominalTotalPowerCorrectedToLoad * 24 * 265 * baselineAverageChillerPlantLoad;
    const primaryPumpEfficiency = primaryNominalTotalPowerCorrectedToLoad / nominalTotalCapacity;

    // Secondary Pump(s) Calculations
    const secondaryNominalTotalPower = (-28.8607474364754 + 0.26194674 * nominalPower) * numOfChillers;
    const secondaryNominalTotalPowerCorrectedToLoad = secondaryNominalTotalPower * (1 - pumpDesignOverCapacity);
    const secondaryPumpsYearlyEnergyUsage = secondaryNominalTotalPowerCorrectedToLoad * 24 * 365 * baselineAverageChillerPlantLoad;
    const secondaryPumpEfficiency = secondaryNominalTotalPowerCorrectedToLoad / nominalTotalCapacity;

    // Cooling Tower(s) Calculations
    const coolingTowerNominalTotalPower = (-4.64339871663608 + 0.06993997 * nominalPower) * numOfChillers;
    const coolingTowerPumpsYearlyEnergyUsage = coolingTowerNominalTotalPower * 24 * 365 * baselineAverageChillerPlantLoad;
    const coolingTowerEfficiency = coolingTowerNominalTotalPower / nominalTotalCapacity;

    // Summary Calculations
        // in kWh
    const yearlyElectricityConsumption = yearlyEnergyUsage + condenserPumpsYearlyEnergyUsage + primaryPumpsYearlyEnergyUsage + secondaryPumpsYearlyEnergyUsage + coolingTowerPumpsYearlyEnergyUsage;
        // in kW
    const totalElectricityConsumption = yearlyElectricityConsumption / (24 * 365);
        // No comment yet
    const calculatedPlantBaselineEfficiency = ((correctedChillerEfficiency + condenserPumpEfficiency + primaryPumpEfficiency + secondaryPumpEfficiency + coolingTowerEfficiency) + (correctedChillerEfficiency + 0.16)) / 2;
        // in kWh/year
    const electricSavingPotentialKwh = (calculatedPlantBaselineEfficiency - bbpSavingTarget) * correctedTotalCapacity * 24 * 365 * baselineAverageChillerPlantLoad;
        // in ton/year
    const co2SavingPotential = electricSavingPotentialKwh * baselineCO2 / 1000;
        // in usd/year
    const electricSavingPotentialUsd = electricSavingPotentialKwh * baselineElectricPrice; 

    // Print Outputs
    document.getElementById("cost-save").innerHTML = electricSavingPotentialUsd.toFixed(2);
    document.getElementById("electric-save").innerHTML = electricSavingPotentialKwh.toFixed(2);
    document.getElementById("co2-save").innerHTML = co2SavingPotential.toFixed(2);
    console.log('hello world');
};
