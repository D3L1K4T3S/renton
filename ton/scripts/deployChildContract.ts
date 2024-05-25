import { toNano } from '@ton/core';
import { ChildContract } from '../wrappers/ChildContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const childContract = provider.open(await ChildContract.fromInit());

    await childContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(childContract.address);

    // run methods on `childContract`
}
