pragma solidity 0.4.26;


contract ERC1630 {
  bytes32 secretHash;
  uint256 expiration;
  address buyer;
  address seller;

  constructor (bytes32 _secretHash, uint256 _expiration, address _buyer) public payable {
    secretHash = _secretHash;
    expiration = _expiration;
    buyer = _buyer;
    seller = msg.sender;
  }

  function claim (bytes32 _secret) public {
    require(sha256(_secret) == secretHash);
    require(now <= expiration);
    buyer.transfer(address(this).balance);
  }

  function refund () public {
    require(now > expiration);
    seller.transfer(address(this).balance);
  }
}