import { toNano } from '@ton/core';
import { TonContract } from '../wrappers/TonContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonContract = provider.open(await TonContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await tonContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tonContract.address);

    console.log('ID', await tonContract.getId());
}
