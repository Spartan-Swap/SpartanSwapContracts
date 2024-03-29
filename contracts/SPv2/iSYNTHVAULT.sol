// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;
interface iSYNTHVAULT{
   function depositForMember(address synth, address member) external;
   function setReserveClaim(uint256 _setSynthClaim) external;
}