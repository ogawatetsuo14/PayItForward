pragma solidity ^0.4.8;

contract PayItForward {

  struct coin {
    uint amount;
    string comment;
  }

  mapping (address => coin) recieved;
  mapping (address => coin) sent;

  event Transfer(address to,address from,uint amount,string commnet);

  function PayItForward(){
  
  }

  function newAccount() returns (bool){
	  recieved[msg.sender].amount = 0;
	  sent[msg.sender].amount = 0;
	  return true;
  }

  function getRecieved() returns (uint,string) {
    return (recieved[msg.sender].amount,recieved[msg.sender].comment);
  }

  function getSent() returns (uint,string) {
    return (sent[msg.sender].amount,sent[msg.sender].comment);
  }

  function sendPoint(address to,uint points,string comment) returns (bool) {
    if (points < 0) return false;
    sent[msg.sender].amount += points;
    sent[msg.sender].comment = comment;
	  recieved[to].amount += points;
    recieved[to].comment = comment;
	  Transfer(to,msg.sender,points,comment);
	  return true;
  }
}