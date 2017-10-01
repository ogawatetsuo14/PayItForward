pragma solidity ^0.4.8;

contract PayItForward {
  mapping (address => uint) recieved;
  mapping (address => uint) sent;

  event Transfer(address to,address from,uint amount);

  function PayItForward(){
  }

  function newAccount() returns (bool){
	  recieved[msg.sender] = 0;
	  sent[msg.sender] = 0;
	  return true;
  }

  function getRecieved() returns (uint) {
    return recieved[msg.sender];
  }

  function getSent() returns (uint) {
    return sent[msg.sender];
  }

  function sendPoint(address to,uint points) returns (bool) {
    if (points <= 0) return false;
    sent[msg.sender] += points;
	  recieved[to] += points;
	  Transfer(to,msg.sender,points);
	  return true;
  }
}