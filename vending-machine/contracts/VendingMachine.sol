
pragma solidity ^0.8.11;


contract VendingMachine {

    address public owner;
    mapping(address => uint256) public donutBalances;

    constructor(){
        owner = msg.sender;
        // number of donuts in vending machine
        donutBalances[address(this)] = 100;
    }

    function getVendingMachineBalance() public view returns(uint256){
        return donutBalances[address(this)];
    }

    // owner adds more donuts in vending machine
    function restock(uint256 amount) public {
        require(msg.sender == owner, "Only Vending Machine Owner can restock.");
        donutBalances[address(this)] += amount;
    }

    // purchase donut
    function purchase(uint256 amount) public payable {
        // set the donut price!
        require(msg.value >= amount * 1 ether, "Not enough ether to buy a donut, price is 1 ether per donut");
        // check if the vending machine has enough donuts
        require(donutBalances[address(this)] >= amount, "Not enough donuts in vending machine.");
        // reduce the number of donuts in vending machine
        donutBalances[address(this)] -= amount;
        // get the buyer the donuts
        donutBalances[msg.sender] += amount;
    }

}