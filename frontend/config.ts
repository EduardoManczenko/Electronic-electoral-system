export const URNA_ADDRESS: any = "0x82Ea504469f2A0283DaC1F97Cc5181Db8c614928"

export const ABI: any = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_TSE",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "elector",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "position",
          "type": "uint256"
        }
      ],
      "name": "alreadyVoted_",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "candidadeNotFound",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ppn",
          "type": "uint256"
        }
      ],
      "name": "candidateNotExists",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "elector",
          "type": "address"
        }
      ],
      "name": "electorNotFound",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "elector",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "candidate_total_votes",
          "type": "uint256"
        }
      ],
      "name": "voted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "describe",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "candidatePhoto",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "politicalPartyName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "politicalPartyNumber",
              "type": "uint256"
            }
          ],
          "internalType": "struct CandidateStructs.candidateData",
          "name": "data_",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "position_",
          "type": "uint256"
        }
      ],
      "name": "createCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cpf",
              "type": "string"
            }
          ],
          "internalType": "struct ElectorStructs.electorData",
          "name": "data_",
          "type": "tuple"
        },
        {
          "internalType": "address",
          "name": "owner_",
          "type": "address"
        }
      ],
      "name": "createElector",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "position_",
          "type": "uint256"
        }
      ],
      "name": "verifyCandidates",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "candidateAddress",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "politicalPartyNumber",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "position_",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ppn",
          "type": "uint256"
        }
      ],
      "name": "verifyCandidatesByPPN",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "position_",
          "type": "uint256"
        }
      ],
      "name": "verifyCandidatesData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "describe",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "candidatePhoto",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "politicalPartyName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "politicalPartyNumber",
              "type": "uint256"
            }
          ],
          "internalType": "struct CandidateStructs.candidateData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "verifyElectors",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "verifyVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "position",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]