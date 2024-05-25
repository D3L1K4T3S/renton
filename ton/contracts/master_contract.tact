import "@stdlib/deploy";
import "@stdlib/ownable";
import "./child_contract";
import "./messages";

contract MasterContract with Deployable, Ownable {

    const MinTonBalance: Int = ton("1");

    owner: Address;
    balance: Int as coins;

    init() {
        self.owner = sender();
        self.balance = 0;
    }

    receive(msg: NewChild){
        self.requireOwner();
        let init: StateInit = initOf ChildContract(msg.id, myAddress());
        send(SendParameters{
            to: contractAddress(init),
            value: msg.amount,
            body: "Create new user".asComment(),
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data,
        });
        self.reply("new user created".asComment());
    }

    receive(msg: Add){
        self.requireOwner();
        let init: StateInit = initOf ChildContract(msg.id, myAddress());
        send(SendParameters{
            to: contractAddress(init),
            value: msg.amount,
            mode: SendIgnoreErrors,
            body: msg.metadata.asComment(),
        });
    }

    receive(){
    }

    receive("Withdraw"){
        self.requireOwner();
        send(SendParameters{
            to: self.owner,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors,
            body: "Withdraw".asComment(),
        });
    }

    receive(msg: Withdraw){
        self.requireOwner();
        let init: StateInit = initOf ChildContract(msg.id, myAddress());
        send(SendParameters{
            to: contractAddress(init),
            value: 0,
            body: Receiver{to: msg.to}.toCell(),
        });
    }
}
