import "@stdlib/deploy";
import "./messages.tact";

contract ChildContract with Deployable, Ownable {

    owner: Address;
    id: Int as uint256;
    balance: Int as coins;

    init(id: Int, owner: Address) {
        self.owner = owner;
        self.id = id;
        self.balance = 0;
    }

    receive(msg: Add){
        self.balance += msg.amount;
    }

    receive(msg: Withdraw){

    }

    receive(msg: Pay){

    }

    receive(){

    }

    bounced(){

    }

}
