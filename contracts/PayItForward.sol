pragma solidity ^0.4.8;

contract PayItForward {
  mapping(address => uint) recieved;
  mapping(address => uint) sent;

  function PayItForward() {
  }

  function sendCoin(address to,address from,uint x) {
    recieved[to] += x;
    sent[from] += x;
  }

  function getRecieved(address from) constant returns (uint retVal) {
    return recieved[from];
  }

    function getSent(address from) constant returns (uint retVal) {
    return sent[from];
  }
}