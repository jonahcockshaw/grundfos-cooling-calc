// Declare all fixed variables 
const bbpSavingTarget = 0.75;
const bbpMinimumSavingCost = 100000;
const baselineElectricPrice = NaN;
const baselineAverageChillerPlantLoad = 0.35;
const estimatedChillerCapacityLoss = 0.15;
const baselineCO2 = NaN;
const pumpDesignOverCapacity = 0.20;

// Get values from inputs
    // Get Chiller Values
var chiller1Value = document.getElementById("chiller-1").value;
var chiller2Value = document.getElementById("chiller-2").value;
var chiller3Value = document.getElementById("chiller-3").value;
var chiller4Value = document.getElementById("chiller-4").value;
var chiller5Value = document.getElementById("chiller-5").value;
var allChillersValue = chiller1Value + chiller2Value + chiller3Value + chiller4Value + chiller5Value

// Filter out any value less than 1
function removeZeros() {
    return value >= 1
}
        
// Count Number of Chillers
var totalChillers = [chiller1Value, chiller2Value, chiller3Value, chiller4Value, chiller5Value].filter(removeZeros);

// Chiller 1 Calculations
const nominalCapacity = allChillersValue;
const nominalPower = nominalCapacity / 1.4;
const numOfChillers = totalChillers;
const chillerEfficiency = nominalPower / nominalCapacity;
const correctedCapacity = nominalCapacity * (1 - estimatedChillerCapacityLoss);
const correctedChillerEfficiency = nominalPower / chillerEfficiency;
const nominalTotalCapacity = nominalCapacity * numOfChillers;
const correctedTotalCapacity = correctedCapacity * numOfChillers;
const yearlyEnergyUsage = correctedTotalCapacity * correctedChillerEfficiency * 365 * 24 * baselineAverageChillerPlantLoad;

// Chillers Totals
const nominalCapacityOfAllChillers = (chiller1Value + chiller2Value + chiller3Value + chiller4Value + chiller5Value)


// Condenser pump(s) Calculations
const condenserPumpEfficiency = condenserNominalTotalPowerCorrectedToLoad / nominalTotalCapacity;
const condenserNominalTotalPower = (14.0148778886542 + 0.11630564 * nominalPower) * numOfChillers;
const condenserNominalTotalPowerCorrectedToLoad = condenserNominalTotalPower * (1 - pumpDesignOverCapacity);
const condenserPumpsYearlyEnergyUsage = condenserNominalTotalPowerCorrectedToLoad * 24 * 365 * baselineAverageChillerPlantLoad;

// Primary Pump(s) Calculations
const primaryPumpEfficiency = primaryNominalTotalPowerCorrectedToLoad / nominalTotalCapacity;
const primaryNominalTotalPower = (14.7360878094534 + 0.02728417 * nominalPower) * numOfChillers;
const primaryNominalTotalPowerCorrectedToLoad = primaryNominalTotalPower * (1 - pumpDesignOverCapacity);
const primaryPumpsYearlyEnergyUsage = primaryNominalTotalPowerCorrectedToLoad * 24 * 265 * baselineAverageChillerPlantLoad;

// Secondary Pump(s) Calculations
const secondaryPumpEfficiency = secondaryNominalTotalPowerCorrectedToLoad / nominalTotalCapacity;
const secondaryNominalTotalPower = (-28.8607474364754 + 0.26194674 * nominalPower) * numOfChillers;
const secondaryNominalTotalPowerCorrectedToLoad = secondaryNominalTotalPower * (1 - pumpDesignOverCapacity);
const secondaryPumpsYearlyEnergyUsage = secondaryNominalTotalPowerCorrectedToLoad * 24 * 365 * baselineAverageChillerPlantLoad;

// Cooling Tower(s) Calculations
const coolingTowerEfficiency = coolingTowerNominalTotalPower / nominalTotalCapacity;
const coolingTowerNominalTotalPower = (-4.64339871663608 + 0.06993997 * nominalPower) * numOfChillers;
const coolingTowerPumpsYearlyEnergyUsage = coolingTowerNominalTotalPower * 24 * 365 * baselineAverageChillerPlantLoad;

// Summary Calculations
    // in kW
const totalElectricityConsumption = yearlyElectricityConsumption / (24 * 365);
    // in kWh
const yearlyElectricityConsumption = yearlyEnergyUsage + condenserPumpsYearlyEnergyUsage + primaryPumpsYearlyEnergyUsage + secondaryPumpsYearlyEnergyUsage + coolingTowerPumpsYearlyEnergyUsage;
    // No comment yet
const calculatedPlantBaselineEfficiency = ((correctedChillerEfficiency + condenserPumpEfficiency + primaryPumpEfficiency + secondaryPumpEfficiency + coolingTowerEfficiency) + (correctedChillerEfficiency + 0.16)) / 2;
    // in kWh/year
const electricSavingPotentialKwh = (calculatedPlantBaselineEfficiency - bbpSavingTarget) * correctedTotalCapacity * 24 * 365 * baselineAverageChillerPlantLoad;
    // in ton/year
const co2SavingPotential = electricSavingPotentialKwh * baselineCO2 / 1000;
    // in usd/year
const electricSavingPotentialUsd = electricSavingPotentialKwh * baselineElectricPrice; 

// Print Outputs
    function printOutputs() {
        document.getElementById("cost-save").innerHTML = electricSavingPotentialUsd;
        document.getElementById("electric-save").innerHTML = electricSavingPotentialKwh;
        document.getElementById("co2-save").innerHTML = co2SavingPotential;
    }