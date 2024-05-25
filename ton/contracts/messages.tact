message NewChild {
    id: Int as uint256;
    amount: Int as coins;
}

message Add {
    amount: Int as coins;
    id: Int as uint256;
    metadata: String;
}

message Withdraw {
    to: Address;
    amount: Int as coins;
}

message Pay {
    amount: Int as coins;
}

