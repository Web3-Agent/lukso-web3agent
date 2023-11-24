import { ChatCompletionFunctions } from "openai-edge";

export const functionSchemas: ChatCompletionFunctions[] = [
    {
        name: 'deploy_contract',
        description: 'Deploy a smart contract',
        parameters: {
            type: 'object',
            description: `This function deploys a smart contract to an EVM compatible chain.  It returns the tx hash of the deployment and an IPFS url to a directory of files used for the contract.  Only call this function in a separate chat message do not call it from a message with other text.  Share the explorer url and ipfs url with the user and make the links open in new tab.`,
            properties: {
                contractName: {
                    type: 'string',
                },
                chainName: {
                    type: 'string',
                    description: 'Name of the EVM compatible chain we are deploying to.  Default to Mumbai if not specified.'
                },
                sourceCode: {
                    "type": "string",
                    "description": "Source code of the smart contract. Use Solidity v0.8.20+ and ensure that it is the full source code and will compile. The source code should be formatted as a single-line string, with all line breaks and quotes escaped to be valid in a JSON context. Specifically, newline characters should be represented as '\\n', and double quotes should be escaped as '\\\"'."
                },
                constructorArgs: {
                    type: 'array',
                    items: {
                        oneOf: [
                            {
                                type: 'string'
                            },
                            {
                                type: 'array',
                                items: {
                                    type: 'string'
                                }
                            }
                        ]
                    },
                    description: 'Arguments for the contract\'s constructor. Each argument can be a string or an array of strings. But the final constructor arguments must be an array.  Can be empty array if the constructor has no arguments.'
                }

            },
            required: ['contractName', 'chainName', 'sourceCode', 'constructorArgs']
        }
    },
    {
        name: 'get_account_balance',
        description: 'Get Account Balance',
        parameters: {
            type: 'object',
            description: `This function gets account balance of given walllet address of crypto. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                account: {
                    type: 'string',
                },
                chainId: {
                    type: 'number',
                    description: 'Chain ID of the EVM compatible. Default to 1 if not specified.'
                },
            },
            required: ['account', 'chainId']
        }
    },
    {
        name: 'get_transaction_by_hash',
        description: 'Get Transaction Info',
        parameters: {
            type: 'object',
            description: `This function gets transaction inforamtion by transaction hash and chain id. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                txnHash: {
                    type: 'string',
                },
                chainId: {
                    type: 'number',
                    description: 'Chain ID of the EVM compatible. Default to 1 if not specified.'
                },
            },
            required: ['txnHash', 'chainId']
        }
    },
    {
        name: 'get_gas_price',
        description: 'Get Gas Price Info',
        parameters: {
            type: 'object',
            description: `This function gets gas inforamtion by chain id. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                chainId: {
                    type: 'number',
                    description: 'Chain ID of the EVM compatible. Default to 1 if not specified.'
                },
            },
            required: ['chainId']
        }
    },
    {
        name: 'get_latest_block_number',
        description: 'Get Latest Block Number',
        parameters: {
            type: 'object',
            description: `This function gets block generated in blockchain by chain id. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                chainId: {
                    type: 'number',
                    description: 'Chain ID of the EVM compatible. Default to 1 if not specified.'
                },
            },
            required: ['chainId']
        }
    },
    {
        name: 'get_coins_list',
        description: 'Get Complete List of Coins',
        parameters: {
            type: 'object',
            description: `This function gets list of coins. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                chainId: {
                    type: 'number',
                    description: 'Chain ID of the EVM compatible. Default to 1 if not specified.'
                },
            },
            required: ['chainId']
        }
    },
]
