import "@stdlib/deploy";

contract MasterContract with Deployable {

    const MinTonBalance: Int = ton("1");

    owner: Address;
    balance: Int as coins;

    init() {
        self.owner = sender();
        self.balance = 0;
    }

    receive(){

    }

    receive(){

    }

    bounced(){

    }

}
