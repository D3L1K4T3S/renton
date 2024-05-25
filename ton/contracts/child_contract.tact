import "@stdlib/deploy";
import "./messages";

contract ChildContract with Deployable {

    parent: Address;
    id: Int as uint256;
    balance: Int as coins;

    init(id: Int, parent:Address) {
        self.parent = parent;
        self.id = id;
        self.balance = 0;
    }


}
