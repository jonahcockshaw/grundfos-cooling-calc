// Print Outputs
function printOutputs() {
    // Declare all fixed variables 
    const bbpSavingTarget = 0.75;
    const bbpMinimumSavingCost = 100000;
    const baselineElectricPrice = 0.114;
    const baselineAverageChillerPlantLoad = 0.35;
    const estimatedChillerCapacityLoss = 0.15;
    const baselineCO2 = 0.554;
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

    // Chiller Calculations
    const nominalCapacity = allChillersValue;
    const nominalPower = nominalCapacity / 1.4;
    const numOfChillers = chillerList.filter(countChillers).length;
    console.log(numOfChillers);
    const chillerEfficiency = nominalPower / nominalCapacity;
    const correctedCapacity = nominalCapacity * (1 - estimatedChillerCapacityLoss);
    const correctedChillerEfficiency = nominalPower / correctedCapacity;
    const nominalTotalCapacity = nominalCapacity * numOfChillers;
    const correctedTotalCapacity = correctedCapacity * numOfChillers;
    const yearlyEnergyUsage = correctedTotalCapacity * correctedChillerEfficiency * 365 * 24 * baselineAverageChillerPlantLoad;

        // Console Logs of Chiller Calculations
        console.log(">>> Chiller Outputs <<<")
        console.log('Nominal Capacity is ' + nominalCapacity);
        console.log('Nominal Power is ' + nominalPower);
        console.log('Number of Chillers is ' + numOfChillers);
        console.log('Chiller Efficiency is ' + chillerEfficiency);
        console.log('Corrected Capacity is ' + correctedCapacity);
        console.log('Corrected Chiller Efficiency is ' + correctedChillerEfficiency);
        console.log('Nominal Total Capacity is ' + nominalTotalCapacity);
        console.log('Corrected Total Capacity is ' + correctedTotalCapacity);
        console.log('Yearly Energy Usage is ' + yearlyEnergyUsage);

    // Chillers Totals
    const nominalCapacityOfAllChillers = (chiller1Value + chiller2Value + chiller3Value + chiller4Value + chiller5Value);
    console.log('Nominal Capacity of All Chillers is ' + nominalCapacityOfAllChillers);

    // Condenser pump(s) Calculations
    const condenserNominalTotalPower = (14.0148778886542 + 0.11630564 * nominalPower) * numOfChillers;
    const condenserNominalTotalPowerCorrectedToLoad = condenserNominalTotalPower * (1 - pumpDesignOverCapacity);
    const condenserPumpsYearlyEnergyUsage = condenserNominalTotalPowerCorrectedToLoad * 24 * 365 * baselineAverageChillerPlantLoad;
    const condenserPumpEfficiency = condenserNominalTotalPowerCorrectedToLoad / nominalTotalCapacity;

        // Console Logs for Pump Calculations
        console.log(">>> Condenser Pump Outputs <<<")
        console.log('Condenser Nominal Total Power is ' + condenserNominalTotalPower);
        console.log('Condenser Nominal Total Power Correct to Load is ' + condenserNominalTotalPowerCorrectedToLoad);
        console.log('Condenser Pump Yearly Energy Usage is ' + condenserPumpsYearlyEnergyUsage);
        console.log('Condenser Pump Efficiency ' + condenserPumpEfficiency);

    // Primary Pump(s) Calculations
    const primaryNominalTotalPower = (14.7360878094534 + 0.02728417 * nominalPower) * numOfChillers;
    const primaryNominalTotalPowerCorrectedToLoad = primaryNominalTotalPower * (1 - pumpDesignOverCapacity);
    const primaryPumpsYearlyEnergyUsage = primaryNominalTotalPowerCorrectedToLoad * 24 * 265 * baselineAverageChillerPlantLoad;
    const primaryPumpEfficiency = primaryNominalTotalPowerCorrectedToLoad / nominalTotalCapacity;

        // Console Logs for Primary Pump
        console.log(">>> Primary Pump Outputs <<<")
        console.log('Primary Nominal Total Power is ' + primaryNominalTotalPower);
        console.log('Primary Nominal Total Power Corrected to Load is ' + primaryNominalTotalPowerCorrectedToLoad);
        console.log('Primary Pumps Yearly Energy Usage is ' + primaryPumpsYearlyEnergyUsage);
        console.log('Primary Pumps Efficiency is ' + primaryPumpEfficiency);

    // Secondary Pump(s) Calculations
    const secondaryNominalTotalPower = (-28.8607474364754 + 0.26194674 * nominalPower) * numOfChillers;
    const secondaryNominalTotalPowerCorrectedToLoad = secondaryNominalTotalPower * (1 - pumpDesignOverCapacity);
    const secondaryPumpsYearlyEnergyUsage = secondaryNominalTotalPowerCorrectedToLoad * 24 * 365 * baselineAverageChillerPlantLoad;
    const secondaryPumpEfficiency = secondaryNominalTotalPowerCorrectedToLoad / nominalTotalCapacity;

        // Console Logs for Secondary Pump
        console.log(">>> Secondary Pump Outputs <<<")
        console.log('Secondary Nominal Total Power is ' + secondaryNominalTotalPower);
        console.log('Secondary Nominal Total Power Corrected to Load is ' + secondaryNominalTotalPowerCorrectedToLoad);
        console.log('Secondary Pumps Yearly Energy Usage is ' + secondaryPumpsYearlyEnergyUsage);
        console.log('Secondary Pumps Efficiency is ' + secondaryPumpEfficiency);

    // Cooling Tower(s) Calculations
    const coolingTowerNominalTotalPower = (-4.64339871663608 + 0.06993997 * nominalPower) * numOfChillers;
    const coolingTowerPumpsYearlyEnergyUsage = coolingTowerNominalTotalPower * 24 * 365 * baselineAverageChillerPlantLoad;
    const coolingTowerEfficiency = coolingTowerNominalTotalPower / nominalTotalCapacity;
    
        // Console Logs for Cooling Towers
        console.log(">>> Cooling Tower Outputs <<<")
        console.log('Cooling Tower Nominal Total Power is ' + coolingTowerNominalTotalPower);
        console.log('Cooling Tower Pumps Yearly Energy Usage is ' + coolingTowerPumpsYearlyEnergyUsage);
        console.log('Cooling Tower Efficiency is ' + coolingTowerEfficiency);

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

        // Console Logs for Summary Calculations
        console.log(">>> Summary Calculation Outputs <<<")
        console.log('Yearly Electric Consumption is ' + yearlyElectricityConsumption);
        console.log('Total Electricity Consumption is ' + totalElectricityConsumption);
        console.log('Calculated Plant Baseline Efficiency is ' + calculatedPlantBaselineEfficiency);
        console.log('Electric Saving Potential kWh is ' + electricSavingPotentialKwh);
        console.log('Co2 Saving Potential is ' + co2SavingPotential);
        console.log('Electric Saving Potential USD ' + electricSavingPotentialUsd);

    // Print Outputs
    document.getElementById("cost-save").innerHTML = electricSavingPotentialUsd.toFixed(2);
    document.getElementById("electric-save").innerHTML = electricSavingPotentialKwh.toFixed(2);
    document.getElementById("co2-save").innerHTML = co2SavingPotential.toFixed(2);
};
