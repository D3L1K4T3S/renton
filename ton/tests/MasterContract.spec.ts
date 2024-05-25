import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MasterContract } from '../wrappers/MasterContract';
import '@ton/test-utils';

describe('MasterContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let masterContract: SandboxContract<MasterContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        masterContract = blockchain.openContract(await MasterContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await masterContract.send(
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
            to: masterContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and masterContract are ready to use
    });
});
