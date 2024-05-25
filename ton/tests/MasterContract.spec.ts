import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import {fromNano, toNano} from '@ton/core';
import { MasterContract, NewChild, Add } from '../wrappers/MasterContract';
import { ChildContract } from '../wrappers/ChildContract';
import '@ton/test-utils';

describe('MasterContract',  () => {
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

    it('check balance', async () => {
        let balanceBefore = await masterContract.getBalance();

        await masterContract.send(
            deployer.getSender(),
            {
                value: toNano('500'),
            },
            null,
        );

        console.log("Balance before: ", fromNano(balanceBefore));
        let balanceAfter = await masterContract.getBalance();
        console.log("Balance after: ", fromNano(balanceAfter));

        expect(balanceAfter).toBeGreaterThan(balanceBefore);
    })

    it('check withdraw', async () => {

        await masterContract.send(
            deployer.getSender(),
            {
                value: toNano('500'),
            },
            null,
        );
        let balanceBefore = await masterContract.getBalance();
        console.log("Balance before master: ", fromNano(balanceBefore));
        console.log("Balance before deployer: ", fromNano(await deployer.getBalance()));

        const message = "Withdraw";

        await masterContract.send(
            deployer.getSender(),
            {
                value: toNano('0.02'),
            }, message,
        )

        let balanceAfter = await masterContract.getBalance();
        console.log("Balance after master: ", fromNano(balanceAfter));
        console.log("Balance after deployer: ", fromNano(await deployer.getBalance()))

        expect(balanceBefore).toBeGreaterThan(balanceAfter);
    })

    it('create child', async() => {

        const id = 1n;

        const message: NewChild = {
            $$type: 'NewChild',
            id: id,
            amount: toNano('300')
        }

        await masterContract.send(
            deployer.getSender(),
            {
                value: toNano('500')
            }, null
        )

        await masterContract.send(
            deployer.getSender(),
            {
                value: toNano('0.2')
            }, message,
        )

        const childAddress = await masterContract.getChildAddress(id);

        console.log("Child address get: ",  childAddress);
        const childContract = blockchain.openContract(ChildContract.fromAddress(childAddress));

        console.log("Child address: ",  childContract.address);
        const childBalance  = await childContract.getBalance();
        console.log("Child balance: ", fromNano(childBalance));

        expect(childBalance > 0);

    })

    it('add fund to child', async() => {
        const id = 1n;

        const balanceBefore = 300;


        const message: NewChild = {
            $$type: 'NewChild',
            id: id,
            amount: toNano(balanceBefore)
        }

        await masterContract.send(
            deployer.getSender(),
            {
                value: toNano('1000')
            }, null
        )

        console.log("Master balance: ", fromNano(await masterContract.getBalance()))

        await masterContract.send(
            deployer.getSender(),
            {
                value: toNano('0.2')
            }, message,
        )

        console.log("Master balance: ", fromNano(await masterContract.getBalance()))

        const childAddress = await masterContract.getChildAddress(id);
        const childContract = blockchain.openContract(ChildContract.fromAddress(childAddress));

        const childBalanceBefore  = await childContract.getBalance();
        console.log("Child balance before: ", fromNano(childBalanceBefore));
        console.log("Child address: ",  childContract.address);

        const mesAdd: Add = {
            $$type: 'Add',
            amount: toNano(500),
            id: id,
            metadata: "Hello world"
        }

        await masterContract.send(
            deployer.getSender(),
            {
                value: toNano("0.02")
            }, mesAdd,
        );
        const childBalanceAfter  = await childContract.getBalance();

        console.log("Child balance after: ", fromNano(childBalanceAfter));

        expect(childBalanceAfter).toBeGreaterThan(childBalanceBefore);
    })
});
