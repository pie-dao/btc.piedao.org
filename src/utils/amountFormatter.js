/* eslint no-restricted-globals: 0 */
import { ethers } from 'ethers';

// amount must be bignumberish, {base,display} Decimals must be Numbers
const amountFormatter = (raw, baseDecimals = 18, displayDecimals = 3, useLessThan = true) => {
  if (!raw) {
    return '';
  }

  if (isNaN(raw)) {
    return 'NaN';
  }

  const amount = ethers.utils.bigNumberify(raw.toString());

  if (baseDecimals > 18 || displayDecimals > 18 || displayDecimals > baseDecimals) {
    throw Error(
      `Invalid combination of baseDecimals '${baseDecimals}' `
      + `and displayDecimals '${displayDecimals}.`,
    );
  }

  // if balance is falsy, return undefined
  if (!amount) {
    return '';
  }

  // if amount is 0, return
  if (amount.isZero()) {
    return '0';
  }

  // amount > 0
  // amount of 'wei' in 1 'ether'
  const baseAmount = ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(baseDecimals));

  const minimumDisplayAmount = baseAmount.div(
    ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(displayDecimals)),
  );

  // if balance is less than the minimum display amount
  if (amount.lt(minimumDisplayAmount)) {
    return useLessThan
      ? `<${ethers.utils.formatUnits(minimumDisplayAmount, baseDecimals)}`
      : `${ethers.utils.formatUnits(amount, baseDecimals)}`;
  }

  // if the balance is greater than the minimum display amount
  const stringAmount = ethers.utils.formatUnits(amount, baseDecimals);

  // if there isn't a decimal portion
  if (!stringAmount.match(/\./)) {
    return stringAmount;
  }

  // if there is a decimal portion
  const [wholeComponent, decimalComponent] = stringAmount.split('.');

  const roundedDecimalComponent = ethers.utils
    .bigNumberify(decimalComponent.padEnd(baseDecimals, '0'))
    .toString()
    .padStart(baseDecimals, '0')
    .substring(0, displayDecimals);

  // decimals are too small to show
  if (roundedDecimalComponent === '0'.repeat(displayDecimals)) {
    return wholeComponent;
  }

  // decimals are not too small to show
  return `${wholeComponent}.${roundedDecimalComponent.toString().replace(/0*$/, '')}`;
};

export default amountFormatter;
