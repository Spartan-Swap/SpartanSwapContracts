// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;
interface iBASEv1 {
    function transferTo(address,uint256) external returns(bool);
}