// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

interface iLENDVAULT {
   function lendLP(address _pool, uint amount) external;
}