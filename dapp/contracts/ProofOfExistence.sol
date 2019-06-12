//pragma directive - instructs the compiler ehat version to be used
pragma solidity >=0.4.22 <0.6.0;

//whenever a user creates an asset its added into this mapping datastructure called proofs and the key is its hash
//
//Its like a hash map Collection keys and their associated values

contract ProofOfExistence {
  mapping (string => bool) private proofs;

//set proofs mapping to the key
//
//will pop up metamask to confirm transaction
  function registerAsset(string memory assetHash) public {
    proofs[assetHash] = true;
  }

//just reeading data from the blockchain. returns true or false
  function checkIfRegistered(string memory assetHash) public view returns (bool) {
    return proofs[assetHash];
  }

}
