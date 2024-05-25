message Add {
    amount: Int as coins;
    metadata: String;
}

message Withdraw {
    to: Address;
    amount: Int as coins;
}

message Pay {
    amount: Int as coins;
}

