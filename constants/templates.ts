export const templates = [
    'Swap 100 USDC to USDT.',
    'Swap 100 USDT to ETH and create portfolio with 0.001 WETH and trigger stop loss on -5% and take profit on 10%.',
    'Create portfolio with 0.1 WETH and trigger stop loss on -5% and take profit on 10%.',
    'Deposit 5 USDT to Aave. Borrow 1 USDC from Aave. Repay 1 USDC to Aave. Withdraw 5 USDT from Aave. Swap 5 USDT to ETH.',
    'Swap 250 USDT to LINK. Create portfolio with 0.01 WBTC and set stop loss on -5% and take profit on 10%.',
    'Swap 0.0001 ETH to WBTC. Deposit 0.001 WBTC to Aave. Borrow 10 USDT.',
    'Deposit 0.1 ETH to Lido. Send 0.1 WETH to 0x000000'
];

export const PROMPT_COMMANDS = [
    {
        action: 'MY_PORTFOLIO',
        message: 'Show my portfolio details with the total for address __WALLET_ADDRESS__ in table format.',
        note: 'Eg: Show my portfolio details with the total for address 0x6aeeb12fe14b7dae54277e6bb0042466e2161bf8 in table format.',
    },
    {
        action: 'MY_TOKENS',
        message: 'Show my tokens details with the total for address __WALLET_ADDRESS__ in table format.',
        note: 'Eg: Show my tokens details with the total for address 0x6aeeb12fe14b7dae54277e6bb0042466e2161bf8 in table format.',
    },
    {
        action: 'MY_COINS',
        message: 'Show my coins details with the total for address __WALLET_ADDRESS__ in table format.',
        note: 'Eg: Show my coins details with the total for address 0x6aeeb12fe14b7dae54277e6bb0042466e2161bf8 in table format.',
    },
    // {
    //     action: 'MY_BALANCE',
    //     message: 'Show my detailed account balance.'
    // },
    {
        action: 'MY_NFT',
        message: 'Show my NFTs details for address __WALLET_ADDRESS__ in table format.',
        note: 'Eg: Show my NFTs details for address 0x6aeeb12fe14b7dae54277e6bb0042466e2161bf8 in table format.',
    },
    // {
    //     action: 'MY_NFT',
    //     message: 'Show my NFTs balance.'
    // },
    {
        action: 'TOKENS_BY_SYMBOL',
        message: 'Show me the list of tokens in all networks with the search symbol __SYMBOL__ in table format.',
        note: 'Show me the list of tokens in all networks with the search symbol usdc in table format.',
    },
    {
        action: 'TOP_NFT_HOLDER',
        message: 'Show me top NFT holders where the chain name is __CHAIN_NAME__ and the contract address is __CONTRACT_ADDRESS__ in table format.',
        note: `Supported chain name are mainnet,optimism and arbitrum. Eg: Show me top NFT holders where the chain name is mainnet and the contract address is 0xb7f7f6c52f2e2fdb1963eab30438024864c313f6 in table format.`
    },
    {
        action: 'TXN_INFO',
        message: 'Show me transaction details where the chain name is __CHAIN_NAME__ and the transaction hash is __TXN_HASH__',
        note: `Supported chain name are mainnet,optimism and arbitrum. Eg: Show me transaction details where the chain name is mainnet and the transaction hash is 0x48cd7f0228f198efa9792274269173d1bba7165b0e7354a06839e6bbee8ed7cb`
    },
    {
        action: 'NFT_METADATA',
        message: 'Show me NFT metadata details where the chain name is __CHAIN_NAME__, the token id is __TOKEN_ID__ and the contract address is __CONTRACT_ADDRESS__ in table format.',
        note: `Supported chain name are mainnet,optimism and arbitrum. Eg: Show me NFT metadata details where the chain name is mainnet, the token id is 3366 and the contract address is 0x8bc9224253e37cd221c7f510acc42cb6e734db57 in table format.`
    },
    {
        action: 'PROTOCOLS',
        message: 'Show me the list of protocols for wallet address on all networks and the wallet address is __ADDRESS__ in table format.',
        note: `Eg: Show me the list of protocols for wallet address on all networks and the wallet address is 0xb72ed8401892466ea8af528c1af1d0524bc5e105 in table format.`
    }
];

export const LUKSO_DEPLOYMENT_COMMANDS = [
    {
        action: 'CREATE_CONTRACT',
        message: 'Write a simple contract that stores a value.',
        note: 'Once contract created, please select below chain/network to deploy contract'
    },
    {
        action: 'DEPLOY_LUKSO_TESTNET',
        message: 'Deploy this contract on Lukso Testnet.',
    },
];

export const LINEA_DEPLOYMENT_COMMANDS = [
    {
        action: 'CREATE_CONTRACT',
        message: 'Write a simple contract that stores a value.',
        note: 'Once contract created, please select below chain/network to deploy contract'
    },
    {
        action: 'DEPLOY_LINEA_TESTNET',
        message: 'Deploy this contract on Linea Testnet.',
    },
];

export const ARBITRUM_DEPLOYMENT_COMMANDS = [
    {
        action: 'CREATE_CONTRACT',
        message: 'Write a simple contract that stores a value.',
        note: 'Once contract created, please select below chain/network to deploy contract'
    },

    {
        action: 'DEPLOY_ARBITRUM_GOERLI_TESTNET',
        message: 'Deploy this contract on Arbitrum Goerli.',
    },
];


export const OTHER_DEPLOYMENT_COMMANDS = [
    {
        action: 'CREATE_CONTRACT',
        message: 'Write a simple contract that stores a value.',
        note: 'Once contract created, please select below chain/network to deploy contract'
    },
    {
        action: 'DEPLOY_SCROLL_SEPOLIA_TESTNET',
        message: 'Deploy this contract on Scroll Sepolia Testnet.',
    },
    {
        action: 'DEPLOY_GOERLI_TESTNET',
        message: 'Deploy this contract on Goerli.',
    },
    {
        action: 'DEPLOY_FILECOIN_TESTNET',
        message: 'Deploy this contract on Filecoin - Calibration testnet.',
    },
];

export const WEB3_COMMANDS = [
    {
        action: 'BLOCK_NUMBER',
        message: 'Give me the current block number on chain 1'
    },
    {
        action: 'GAS_PRICE_ETH_CHAIN',
        message: "Give me the gas price for chain id 1."
    },
    {
        action: 'GAS_PRICE_ETH',
        message: 'Give me the gas price of Ethereum.',
    },
    {
        action: 'GET_RECEIPT',
        message: 'Get receipt for hash __HASH__',
        note: `Eg: Get receipt for hash 0x87324cefffc1ce22d6b64196d31eac660a4cc7877db0e6cec77ff28d9aad3e32`

    },
]