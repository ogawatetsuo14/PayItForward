pragma solidity ^0.4.8;

contract PayItForward {
  mapping(address => uint) recieved;
  mapping(address => uint) sent;

  event send(address to,address from,uint x);

  function PayItForward() {
  }

  function sendCoin(address to,address from,uint x) {
    recieved[to] += x;
    sent[from] += x;
    send(to,from,x);
  }

  function getRecieved(address from) constant returns (uint retVal) {
    return recieved[from];
  }

    function getSent(address from) constant returns (uint retVal) {
    return sent[from];
  }
}