import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";

contract ChildContract with Deployable, Ownable {

    const MinTonBalance: Int = ton("0.01");

    owner: Address;
    id: Int as uint256;
    balance: Int as coins;

    init(id: Int, owner:Address) {
        self.owner = owner;
        self.id = id;
        self.balance = 0;
    }

    receive(msg: Pay){
        self.requireOwner();
        require(self.balance - msg.amount > self.MinTonBalance, "insufficient funds");
        self.balance -= msg.amount;
        send(SendParameters{
            to: self.owner,
            value: msg.amount,
            mode: SendIgnoreErrors,
            body: msg.metadata.asComment()
        });
    }

    receive(msg: Receiver){
        self.requireOwner();
        send(SendParameters{
            to: msg.to,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors,
            body: "Withdraw".asComment()
        });
    }

    receive(){
        // accept incoming TON transfers
    }

    get fun balance(): Int {
        return myBalance();
    }
}
