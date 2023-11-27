import { ChatCompletionFunctions } from "openai-edge";
export const functionSchemas: ChatCompletionFunctions[] = [
    {
        name: 'deploy_contract',
        description: 'Deploy a smart contract',
        parameters: {
            type: 'object',
            description: `This function complie a smart contract to an EVM compatible chain. It returns the contract address, bytecode, and abi. Print contract address, abi and bytecode.  Only call this function in a separate chat message do not call it from a message with other text.`,
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
        name: 'show_my_detailed_account_balance',
        description: 'Get Account Balance',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of balance in different network. You need to print this data array in table format. If there is no record in empty data array. Then print that "No Account Balance Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                // account: {
                //     type: 'string',
                // },
                // chainId: {
                //     type: 'number',
                //     description: 'Chain ID of the EVM compatible. Default to 1 if not specified.'
                // },
            },
            required: []
        }
    },
    {
        name: 'show_my_nft_balance',
        description: 'Get NFTs Balance',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of NFTs balance in different network. You need to print this data array in table format. If there is no record in empty data array. Then print that "No NFTs Balance Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'show_list_of_protocols_for_wallet_address',
        description: 'Returns a list of protocols for wallet address on all networks',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of list of protocols for wallet address. You need to print this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No Protocols Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'show_portfolio_for_wallet_address',
        description: 'Returns a list of portfolio for wallet address on all networks',
        parameters: {
            type: 'object',
            description: `This function gets object that have message, total and data. Data which array of object. Each object contains details of portfolio for a network. You need to print total first and then this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No Portfolio Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'show_tokens_for_wallet_address',
        description: 'Returns a list of tokens for wallet address on all networks',
        parameters: {
            type: 'object',
            description: `This function gets object that have message, total and data. Data which array of object. Each object contains details of tokens for a network. You need to print total first and then this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No tokens Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'show_coins_for_wallet_address',
        description: 'Returns a list of coins for wallet address on all networks',
        parameters: {
            type: 'object',
            description: `This function gets object that have message, total and data. Data which array of object. Each object contains details of coins for a network. You need to print total first and then this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No coins Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'show_top_nft_holder',
        description: 'Get Top NFTs Holders',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of top NFTs holder in given chain name. You need to print this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No Top NFTs H older Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                chain_name: {
                    type: 'string',
                    description: 'Chain name is crypto network name like mainnet. Take mainnet as default parameter. '
                },
                contract_address: {
                    type: 'string',
                    description: 'Contract address is crypto address which holds the top NFT\'s agaist a chain.'
                },
            },
            required: ['chain_name', 'contract_address']
        }
    },
    {
        name: 'show_transaction_details_by_txn_hash_and_chain_name',
        description: 'Get transaction details using transaction hash and chain name',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data is object. You need to print each infomation of data object. Make sure you print all. If there is no record in empty data array. Then print that "No Top NFTs H older Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                chain_name: {
                    type: 'string',
                    description: 'Chain name is crypto network name like mainnet. Take mainnet as default parameter. '
                },
                txn_hash: {
                    type: 'string',
                    description: 'Transaction hash is crypto address.'
                },
            },
            required: ['chain_name', 'txn_hash']
        }
    },
    {
        name: 'show_nft_metadata_using_contract_address_token_id_and_chain_name',
        description: 'Get NFT Metadata details using chain name, contract address and token_id.',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data is object. You need to print each infomation of data object. Make sure you print all. If there is no record in empty data array. Then print that "No NFT metadata Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                chain_name: {
                    type: 'string',
                    description: 'Chain name is crypto network name like mainnet. Take mainnet as default parameter. '
                },
                contract_address: {
                    type: 'string',
                    description: 'Contract Address is crypto address.'
                },
                token_id: {
                    type: 'string',
                    description: 'Token id is id of NFT.'
                },
            },
            required: ['chain_name', 'contract_address', 'token_id']
        }
    },
    {
        name: 'show_tokens_by_symbol',
        description: 'Get a list of tokens in all networks with the search symbol.',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of tokens. You need to print this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No Tokens Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                token_symbol: {
                    type: 'string',
                    description: 'token_symbol is string for search, eg: usdc. Take usdc as default parameter. '
                },
            },
            required: ['token_symbol']
        }
    },
    {
        name: 'get_receipt_by_hash',
        description: 'Get Transaction Receipt',
        parameters: {
            type: 'object',
            description: `This function gets transaction receipt. It returns message and data. data will have status, from, to and gasUsed, print them all. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                hash: {
                    type: 'string',
                },
            },
            required: ['hash']
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
