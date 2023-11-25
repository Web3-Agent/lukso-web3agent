'use client'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import { LSPFactory } from '@lukso/lsp-factory.js';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json' assert { type: 'json' };

export default function UniversalProfile() {
    const [upAddress, setUPAddress] = useState('NO Address')
    const PRIVATE_KEY = '0x3fff66d819f30d0b9167ea6a76279d0dd51b5aff267b7cf3c78cb4033404ce58'; // your EOA private key
    // Our static variables
    //const SAMPLE_PROFILE_ADDRESS2 = '0x6979474Ecb890a8EFE37daB2b9b66b32127237f7';
    const SAMPLE_PROFILE_ADDRESS = "0x0e098b3a37bc7b958D8fF7F90C74396D4117d6C4"//"0xB031363560403179Aac100d51864e27fFF4D7807";
    const RPC_ENDPOINT = 'https://rpc.testnet.lukso.gateway.fm/'//'https://rpc.testnet.lukso.network';
    const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs';

    useEffect(() => {
        const web3 = new Web3();
        const myEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
        console.log({
            PRIVATE_KEY, myEOA
        });
        // const lspFactory = new LSPFactory('https://rpc.testnet.lukso.network', {
        //     deployKey: PRIVATE_KEY,
        //     chainId: 4201,
        // });
    }, []);
    const getUP = async () => {
        try {
            // Parameters for ERC725 Instance
            const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
            const config = { ipfsGateway: IPFS_GATEWAY };

            const erc725js = new ERC725(lsp3ProfileSchema as ERC725JSONSchema[],
                SAMPLE_PROFILE_ADDRESS,
                provider,
                config,
            );
            console.log("erc725js-> ", erc725js)
            // Get all profile data keys of the smart contract
            const profileData = await erc725js.fetchData('LSP3Profile');
            console.log("profileData===>>> ", profileData);
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
                controllerAddresses: ['0x3EBCB8f4d6EA1FCc7D2352B68bDdE3364F1d20F1'], // our EOA that will be controlling the UP
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
    return (
        <div className='h-screen bg-green-200 w-full flex justify-center items-center'>
            <div className='w-1/2  flex flex-col gap-4' >
                <div >
                    <input className='w-full p-2 bg-white text-gray-800 rounded-sm' value={upAddress} />
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
            </div>
        </div>
    )
}
