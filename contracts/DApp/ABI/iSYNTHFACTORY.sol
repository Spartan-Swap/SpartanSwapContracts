// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

interface iSYNTHFACTORY {
    function isSynth(address) external view returns (bool);

    function getSynth(address) external view returns (address);

    function removeSynth(address _token) external;

    function synthCount() external returns (uint);
}
