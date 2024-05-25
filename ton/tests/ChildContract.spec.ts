import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ChildContract } from '../wrappers/ChildContract';
import '@ton/test-utils';

describe('ChildContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let childContract: SandboxContract<ChildContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        childContract = blockchain.openContract(await ChildContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await childContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: childContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and childContract are ready to use
    });
});
