message NewChild {
    id: Int as uint256;
    amount: Int as coins;
}

message Add {
    amount: Int as coins;
    id: Int as uint256;
    metadata: String;
}

message Internal {
    amount: Int as coins;
}

message Withdraw {
    to: Address;
    id: Int as uint256;
}

message Receiver {
    to: Address;
}

message Pay {
    amount: Int as coins;
    metadata: String;
}

