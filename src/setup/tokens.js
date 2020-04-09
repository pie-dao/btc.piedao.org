import BigNumber from 'bignumber.js';

import { eth } from '@pie-dao/eth';
import { ethers } from 'ethers';
import { mint } from '@pie-dao/mint';
import { pieSmartPool } from '@pie-dao/abis';

export const controllerAddress = '0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd'.toLowerCase();
export const decimalPlaces = 6;
export const imBTCAddress = '0x3212b29E33587A00FB1C83346f5dBFA69A458923'.toLowerCase();
export const pBTCAddress = '0x5228a22e72ccc52d415ecfd199f99d0665e7733b'.toLowerCase();
export const poolAddress = '0x9891832633a83634765952b051bc7feF36714A46'.toLowerCase();
export const sBTCAddress = '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6'.toLowerCase();
export const wBTCAddress = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'.toLowerCase();

export const mintable = {
  address: controllerAddress,
  amountPerUnit: BigNumber(1),
  color: '#ffcd1c',
  symbol: 'BTC++',
  weight: BigNumber(100),
};

const buildTokens = (mappedAmounts) => ({
  imBTC: {
    address: imBTCAddress,
    amountPerUnit: BigNumber(mappedAmounts[imBTCAddress]).dividedBy(10 ** 8),
    color: '#1caa98',
    symbol: 'imBTC',
    weight: BigNumber(25),
  },
  pBTC: {
    address: pBTCAddress,
    amountPerUnit: BigNumber(mappedAmounts[pBTCAddress]).dividedBy(10 ** 18),
    color: '#305cee',
    symbol: 'pBTC',
    weight: BigNumber(25),
  },
  sBTC: {
    address: sBTCAddress,
    amountPerUnit: BigNumber(mappedAmounts[sBTCAddress]).dividedBy(10 ** 18),
    color: '#6f51fd',
    symbol: 'sBTC',
    weight: BigNumber(25),
  },
  wBTC: {
    address: wBTCAddress,
    amountPerUnit: BigNumber(mappedAmounts[wBTCAddress]).dividedBy(10 ** 8),
    color: '#d6099b',
    symbol: 'wBTC',
    weight: BigNumber(25),
  },
});

const updateTokens = async ({ database }) => {
  try {
    const [
      imBTCBalance,
      pBTCBalance,
      sBTCBalance,
      wBTCBalance,
    ] = await Promise.all([
      database.balance({ address: poolAddress, token: imBTCAddress }),
      database.balance({ address: poolAddress, token: pBTCAddress }),
      database.balance({ address: poolAddress, token: sBTCAddress }),
      database.balance({ address: poolAddress, token: wBTCAddress }),
    ]);

    const totalSupply = imBTCBalance.plus(pBTCBalance).plus(sBTCBalance).plus(wBTCBalance);

    const imBTCPercentage = imBTCBalance.dividedBy(totalSupply);
    const pBTCPercentage = pBTCBalance.dividedBy(totalSupply);
    const sBTCPercentage = sBTCBalance.dividedBy(totalSupply);
    const wBTCPercentage = wBTCBalance.dividedBy(totalSupply);

    const imBTCRequired = BigNumber(1).multipliedBy(imBTCPercentage);
    const pBTCRequired = BigNumber(1).multipliedBy(pBTCPercentage);
    const sBTCRequired = BigNumber(1).multipliedBy(sBTCPercentage);
    const wBTCRequired = BigNumber(1).multipliedBy(wBTCPercentage);

    const updates = {
      imBTC: {
        amountPerUnit: imBTCRequired,
        weight: imBTCPercentage.multipliedBy(100).dp(2),
      },
      pBTC: {
        amountPerUnit: pBTCRequired,
        weight: pBTCPercentage.multipliedBy(100).dp(2),
      },
      sBTC: {
        amountPerUnit: sBTCRequired,
        weight: sBTCPercentage.multipliedBy(100).dp(2),
      },
      wBTC: {
        amountPerUnit: wBTCRequired,
        weight: wBTCPercentage.multipliedBy(100).dp(2),
      },
    };

    mint.updateTokens(updates);
  } catch (e) {
    console.error('TOKEN UPDATE ERROR', e);
  }
};

export const initialize = async ({ database }) => {
  const {
    approve,
    notify,
    signer,
    transactionOverrides,
  } = eth;

  // Load up pools target weights
  const controllerContract = new ethers.Contract(controllerAddress, pieSmartPool, signer);
  const poolAmount = ethers.utils.bigNumberify('1000000000000000000');
  const poolAmounts = await controllerContract.calcTokensForAmount(poolAmount);

  const mappedAmounts = {};
  poolAmounts[0].forEach((token, index) => {
    mappedAmounts[token.toLowerCase()] = poolAmounts[1][index].toString();
  });

  const tokens = buildTokens(mappedAmounts);

  console.log('TOKEN CONFIG', tokens);

  const submit = async () => {
    const amount = BigNumber(mint.slider).dividedBy(10 ** decimalPlaces).multipliedBy(10 ** 18);
    const joinAmount = ethers.utils.bigNumberify(amount.toFixed());
    const overrides = transactionOverrides({ gasLimit: 1000000 });

    await approve({ spender: controllerAddress, token: imBTCAddress });
    await approve({ spender: controllerAddress, token: pBTCAddress });
    await approve({ spender: controllerAddress, token: sBTCAddress });
    await approve({ spender: controllerAddress, token: wBTCAddress });

    notify(await controllerContract.joinPool(joinAmount, overrides));
  };

  if (!mint.initialized) {
    try {
      mint.init({
        approve,
        database,
        mintable,
        submit,
        tokens,
      });

      setInterval(() => { updateTokens({ database }); }, 10000);
      setTimeout(() => { updateTokens({ database }); }, 1000);
    } catch (e) {
      console.error('MINT INITIALIZING ERROR', e);
    }
  } else {
    // TODO: make this unnecessary
    window.location.reload();
  }
};
