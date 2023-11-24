"use client"
import { useEffect, useState } from 'react'
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers"
import { useNetwork, useAccount } from 'wagmi';
import { configs } from "@/configs";
import axios from 'axios';
import axiosHelper from '../api-helpers/axios/axiosHelper';
import React from 'react';

const VALID_CHAIN_ID = [80001, 5, 314159]
const CHAIN_MAPPING = {
    '80001': `https://polygon-mumbai.g.alchemy.com/v2/${configs.NEXT_PUBLIC_ALCHEMY_KEY}`,
    '5': `https://goerli.infura.io/v3/${configs.NEXT_PUBLIC_INFURA_API_KEY}`,
    '314159': 'https://api.calibration.node.glif.io/rpc/v1'
}
const getRPCURL = (chainId: number) => {
    return CHAIN_MAPPING[chainId] ?? ''
}
export default function ManageHistory() {
    const { chain, chains } = useNetwork();
    const { address, isConnecting, isDisconnected } = useAccount();
    const [actions, setActions] = useState<any>({})
    const [userInfo, setUserInfo] = useState<any>({ isTableAvailable: true, isTableCreated: false, history: [] })
    async function createTable() {
        try {
            setActions((prev) => (
                { ...prev, createTableClicked: true }
            ))
            const privateKey = configs.NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY//"your_private_key";
            if (!privateKey) {
                console.log("NO_KEY_FOUND")
                return
            }
            const wallet = new Wallet(privateKey);
            // To avoid connecting to the browser wallet (locally, port 8545).
            // For example: "https://polygon-mumbai.g.alchemy.com/v2/>>"
            const provider = getDefaultProvider(getRPCURL(chain?.id));
            const signer = wallet.connect(provider);

            // Connect to the database
            const db = new Database({ signer });
            // This is the table's `prefix`--a custom table value prefixed as part of the table's name
            const prefix: string = `my_history_${Date.now()}`;
            const { meta: create } = await db
                .prepare(`CREATE TABLE ${prefix} (id integer primary key, action text, object text);`)
                .run();

            // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
            const tableName = create.txn?.name ?? ""; // e.g., my_table_31337_2
            console.log("1:", { tableName })
            await Promise.all([
                create.txn?.wait(),
                createTableMapping(tableName)
            ]);
        } catch (error) {
            console.log("ERRORO => ", error)
        } finally {
            setActions((prev) => (
                { ...prev, createTableClicked: false }
            ));
            checkTableExists()
        }
    }

    const writeTable = async () => {
        try {

            const privateKey = configs.NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY //"your_private_key";
            if (!privateKey) {
                console.log("NO_KEY_FOUND")
                return
            }
            const wallet = new Wallet(privateKey);
            // To avoid connecting to the browser wallet (locally, port 8545).
            // For example: "https://polygon-mumbai.g.alchemy.com/v2/aVMC4jrgIA9JbSD4Q2Ub6vIWIzXyaR-H"
            const provider = getDefaultProvider(getRPCURL(chain?.id));
            const signer = wallet.connect(provider);

            // Connect to the database
            const db = new Database({ signer });

            // Insert a row into the table
            const { meta: insert } = await db
                .prepare(`INSERT INTO ${'my_table_NIKHIL_314159_603'} (val) VALUES (?);`)
                .bind(`NIKHIL KUMAR ${Date.now()} NEW`)
                .run();
            console.log({ insert })
            // Wait for transaction finality
            await insert.txn?.wait();
        } catch (error) {
            console.log("WRITE TABLE ERROR: ", error)
        }
    }

    const readTable = async () => {
        try {
            const privateKey = configs.NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY//"your_private_key"; 
            if (!privateKey) {
                console.log("NO_KEY_FOUND")
                return
            }
            const wallet = new Wallet(privateKey);
            // To avoid connecting to the browser wallet (locally, port 8545).
            // For example: "https://polygon-mumbai.g.alchemy.com/v2/aVMC4jrgIA9JbSD4Q2Ub6vIWIzXyaR-H"
            const provider = getDefaultProvider(getRPCURL(chain?.id));

            const signer = wallet.connect(provider);


            // Connect to the database
            const db = new Database({ signer });
            // Type is inferred due to `Database` instance definition
            // const tab = await listTables({ signer })
            // console.log({ tab })
            console.log("READ: ", { userInfo })
            if (userInfo?.table) {
                // const { results } = await db.prepare(` SELECT table_name = t.name FROM sys.tables t INNER JOIN sys.schemas s ON t.schema_id = s.schema_id;`).all();
                const { results } = await db.prepare(`SELECT * FROM ${userInfo?.table};`).all();
                console.log(results);
                setUserInfo((prev) => ({
                    ...prev,
                    history: results,
                    isTableCreated: true
                }))
            }

        } catch (error) {
            console.log("READ TABLE ERROR: ", error)
            setUserInfo((prev) => ({
                ...prev,
                history: [],
                isTableCreated: false
            }))

        }
    }
    useEffect(() => {
        console.log({ chain, chains, address })
        if (address && chain?.id)
            checkTableExists()
    }, [])
    useEffect(() => {
        readTable()
    }, [userInfo.isTableCreated])
    const checkTableExists = async () => {
        try {
            const { data: { data } } = await axiosHelper(`/api/tableland?address=${address}&chain=${chain?.id}`)
            console.log(data)
            if (!data) {
                setUserInfo({
                    isTableAvailable: false
                });
                return
            }
            setUserInfo({
                isTableAvailable: true,
                ...data
            })
        } catch (error) {
            console.log("ERERE", error)
        }
    }
    const createTableMapping = async (table: string) => {
        try {
            console.log("createTableMapping", { table })
            const { data: { data } } = await axiosHelper('/api/tableland', 'POST', null, {
                address,
                chain: chain.id,
                table,
            })
            console.log(data)
            if (!data) {
                setUserInfo({
                    isTableAvailable: false
                });
                return
            }
            setUserInfo({
                isTableAvailable: true,
                ...data
            })
        } catch (error) {
            console.log("createTableMapping ERRR", error)
        }
    }
    if (isDisconnected) {
        return
    }

    return (
        <div className="mx-auto w-full  px-4 content-center items-center">
        <div className="rounded-lg border h-screen bg-background p-8  shadow-md">
            <div className="bg-white flex flex-col w-full overflow-auto ">

            <div className="text-2xl font-semibold text-gray-500 text-center py-2 sm:py-8 ">
                    <h1 className="text-emerald-700 text-center text-4xl font-black">
                    Manage Your History
                    </h1>
            </div>
            <div className="flex-1 flex justify-center ">
                <div className="w-2/3 border-2 border-gray-200 rounded-md h-fit p-8 my-4">
                    <div className="flex  flex-col">
                        <div>Default History:  <span className="text-green-600 font-medium">Enabled</span></div>
                        <div className='text-red-600 font-normal text-sm mb-4'>Note: Default history means it will store in web2 storage.</div>
                    </div>
                    {
                        VALID_CHAIN_ID.includes(chain?.id) && userInfo?.isTableAvailable && (
                            <div className="flex  flex-col">
                                <div className='text-wrap'>Tableland Table Name:  <span className="text-green-600 font-medium">{userInfo?.table}</span></div>
                                <div className='text-wrap'>Tableland Status:  <span className={`${userInfo?.isTableCreated ? 'text-green-600 ' : 'text-red-600 '} font-medium`}>{userInfo?.isTableCreated ? 'Active' : 'In-Progress'}</span></div>
                                <div className='text-red-600 font-normal text-sm mb-4'>Note: Tableland history means it will store in web3 storage.</div>
                            </div>)
                    }
                    {
                        VALID_CHAIN_ID.includes(chain?.id) && !userInfo?.isTableAvailable && (
                            <button className='flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-md' onClick={() => createTable()}>
                                <div>{actions?.createTableClicked ? 'Don\'t Refresh Page. Request is In-Progress...' : 'Click to Create Table'}</div>
                            </button>
                        )
                    }

                    {
                        !VALID_CHAIN_ID.includes(chain?.id) && (
                            <div className='flex justify-center items-center flex-col text-red-500 font-medium'>
                                <div className=' text-lg'>Unspported Chain for Tableland History - {chain?.name} </div>
                                <div className='text-gray-500'>Switch The Network</div>
                            </div>
                        )
                    }
                </div>

            </div>


            </div >
            </div>
            </div>
    )
}
