'use client'
// @lukso/lsp-smart-contracts/contracts / LSP7DigitalAsset / presets / LSP7Mintable.sol
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import { LSPFactory } from '@lukso/lsp-factory.js';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
// import upMetadataSchema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json' assert { type: 'json' };
import { useConnectWallet } from '@web3-onboard/react'

interface Account {
    address: string,
    balance: Record<TokenSymbol, string> | null,
    ens: { name: string | undefined, avatar: string | undefined }
    uns:string
}

export default function UniversalProfile() {
    const [_web3, _setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [upAddress, setUPAddress] = useState('NO Address')
    const PRIVATE_KEY = '0x3fff66d819f30d0b9167ea6a76279d0dd51b5aff267b7cf3c78cb4033404ce58'; // your EOA private key
    // Our static variables
    //const SAMPLE_PROFILE_ADDRESS2 = '0x6979474Ecb890a8EFE37daB2b9b66b32127237f7';
    const SAMPLE_PROFILE_ADDRESS = "0x0e098b3a37bc7b958D8fF7F90C74396D4117d6C4"//"0xB031363560403179Aac100d51864e27fFF4D7807";
    const RPC_ENDPOINT = 'https://rpc.testnet.lukso.network'
    // const RPC_ENDPOINT = 'https://rpc.testnet.lukso.gateway.fm'
    // const RPC_ENDPOINT = 'https://rpc.l16.lukso.network'
    const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs';


    const [account, setAccount] = useState<Account | null>(null)
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

    useEffect( () =>
  {
    
    try {
      
  
        if (wallet?.provider) {
        const { name, avatar } = wallet?.accounts[0]?.ens ?? {};
        setAccount({
            address: wallet?.accounts[0]?.address,
            balance: wallet?.accounts[ 0 ]?.balance,
            uns:wallet?.accounts[0]?.uns,
            ens: { name, avatar: avatar?.url }
        } )
        }
      
        } catch (error) {
    console.log("userprofile error is ==========>>>>>>>>",error)
  }
  }, [wallet])

    useEffect(() => {
        const initializeWeb3 = async () => {
            console.log({ window })
            // Modern DApp browsers like MetaMask inject a web3 instance
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    _setWeb3(web3Instance);
                } catch (error) {
                    console.error('User denied account access');
                }
            }
            // Legacy dApp browsers
            else if (window.web3) {
                const web3Instance = new Web3(window.web3.currentProvider);
                let myWeb3 = new Web3(web3Instance);

                _setWeb3(myWeb3);
                // const oldProvider = web3.currentProvider; // keep a reference to metamask provider

            }
            // Non-dApp browsers
            else {
                console.log('No web3 instance detected');
            }
        };

        initializeWeb3();
    }, []);
    const getUP = async () => {
        try {
            const provider = new Web3.providers.HttpProvider('https://rpc.l16.lukso.network');
            const erc725js = new ERC725(lsp3ProfileSchema as ERC725JSONSchema[], '0xc801c3BC0f4B3d5B85aF81D078fae73ABb29FEf4', provider,
                {
                    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
                },
            );

            // Get all profile data keys of the smart contract
            const profileData = await erc725js.getData();
            console.log(profileData);
            // Parameters for ERC725 Instance
            // const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
            // const config = { ipfsGateway: IPFS_GATEWAY };

            // const erc725js = new ERC725(
            //     lsp3ProfileSchema as ERC725JSONSchema[],
            //     '0x98351950EF32387F258A1109dE7B1784D8459dcb',
            //     provider,
            //     config,
            // );
            // // console.log("erc725js-> ", erc725js)
            // // // Get all profile data keys of the smart contract
            // const profileData = await erc725js.fetchData();
            // console.log("profileData===>>> ", profileData);

            // // Fetch all of the profile's issued assets
            // let issuedAssetsDataKey = await erc725js.fetchData('LSP12IssuedAssets[]');
            // console.log(issuedAssetsDataKey);

            // // Fetch all owned assets of the profile
            // let receivedAssetsDataKey = await erc725js.fetchData('LSP5ReceivedAssets[]');
            // console.log(receivedAssetsDataKey);

            // // Fetch the profile's universal receiver
            // let universalReceiverDataKey = await erc725js.fetchData(
            //     'LSP1UniversalReceiverDelegate',
            // );
            // console.log(universalReceiverDataKey);
        } catch (error) {
            console.log("Erroro-->>", error)
        }
    }
    const createUP = async () => {
        try {
            // initialize the LSPFactory with the Testnet chain RPC endpoint, chainId and your EOA's private key which will deploy the UP smart contracts
            const lspFactory = new LSPFactory('https://rpc.testnet.lukso.network', {
                deployKey: PRIVATE_KEY,
                chainId: 4201,
            });
            console.log("lspFactory -> ", { lspFactory })
            const deployedContracts = await lspFactory.UniversalProfile.deploy({
                controllerAddresses: ['0x32617e28b106471c61a46Af34F8bA09D0F73b70f'], // our EOA that will be controlling the UP
                lsp3Profile: {
                    name: 'My Universal Profile',
                    description: 'My Cool Universal Profile',
                    tags: ['Public Profile'],
                    links: [
                        {
                            title: 'My Website',
                            url: 'https://my-website.com',
                        },
                    ],
                },
            });
            console.log("deployedContracts -> ", { deployedContracts })
            // setUPAddress(deployedContracts)
            return deployedContracts;
        } catch (error) {
            console.log('eroror- >', error)
        }
    }
    const deployContract = async () => {
        try {
            console.log({ _web3 })
            // return
            const accounts = await _web3.eth.getAccounts();
            const networkId = await _web3.eth.net.getId();
            // const deployedNetwork = YourContract.networks[networkId];
            console.log({ accounts, networkId, contract: _web3.eth })
            const contract = new _web3.eth.Contract(
                [
                    {
                        "inputs": [],
                        "name": "getValue",
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
                                "internalType": "uint256",
                                "name": "_newValue",
                                "type": "uint256"
                            }
                        ],
                        "name": "setValue",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ],
                // deployedNetwork && deployedNetwork.address
            );
            console.log({ contract })

            // Deploy the contract
            const deployedContract = await contract.deploy({
                data: '0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063209652551461003b5780635524107714610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea2646970667358221220b3b2069a048a1d96ad53edb78bc7a2ba0772623cf46ba9c9b64b03dfb2006e0b64736f6c63430008150033',
            }).send({
                from: accounts[0],
                gas: '3000000', // Adjust gas value according to your contract
            });
            console.log({ deployedContract })

            console.log('Contract deployed at:', deployedContract.options.address);
            setContract(deployedContract);
        } catch (error) {
            console.error('Error deploying contract:', error);
        }
    };
    return (
        <div className='h-screen bg-green-200 w-full flex justify-center items-center'>
            <div className='w-1/2  flex flex-col gap-4' >
                <div >
                    <input className='w-full p-2 bg-white text-gray-800 rounded-sm' value={ upAddress } />
                    {JSON.stringify(account)}
                </div>
                <div >
                    <button
                        className='w-full p-2 bg-pink-400 text-gray-100 rounded-sm'
                        onClick={() => createUP()}
                    >
                        Make Profile</button>
                </div>

                <div >
                    <button
                        className='w-full p-2 bg-pink-400 text-gray-100 rounded-sm'
                        onClick={() => getUP()}
                    >
                        Get Profile</button>
                </div>
                <div className='mt-4' >
                    <input className='w-full p-2 bg-white text-gray-800 rounded-sm' value={upAddress} />
                </div>
                <div >
                    <button
                        className='w-full p-2 bg-pink-400 text-gray-100 rounded-sm'
                        onClick={() => deployContract()}
                    >
                        Deploy</button>
                </div>
            </div>
        </div>
    )
}
