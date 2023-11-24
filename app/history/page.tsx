"use client"
import React, { useEffect, useState } from 'react'
import { useTableland } from '@/context/TablelandProvider'
import { configs } from '../../configs'
import { Database } from "@tableland/sdk";
// import { getRPCURL } from '../manage-history/page'
import { useNetwork, useAccount } from 'wagmi';
import { Wallet, getDefaultProvider } from 'ethers/lib'
import TableThead from '@/components/TableThead';
import TableRow from '@/components/TableRow';
import Table from '@/components/Table';
import moment from 'moment'
import { titleize } from 'underscore.string'
import { FiExternalLink } from 'react-icons/fi'
import Loader from '@/components/Loader';
const VALID_CHAIN_ID = [80001, 5, 314159]
const CHAIN_MAPPING = {
    '80001': `https://polygon-mumbai.g.alchemy.com/v2/${configs.NEXT_PUBLIC_ALCHEMY_KEY}`,
    '5': `https://goerli.infura.io/v3/${configs.NEXT_PUBLIC_INFURA_API_KEY}`,
    '314159': 'https://api.calibration.node.glif.io/rpc/v1'
}
const getRPCURL = (chainId: number) => {
    return CHAIN_MAPPING[chainId] ?? ''
}

export default function History() {
    const { userHistory, writeTable } = useTableland()
    const { chain, chains } = useNetwork();
    const { address, isConnecting, isDisconnected } = useAccount();
    const [history, setHistory] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true);

    const readTable = async () => {
        try {
            setIsLoading(true)
            if (!userHistory?.table) {
                console.log("NO_TABLE_EXISTS")
                return
            }
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
            console.log({ signer })

            // Connect to the database
            const db = new Database({ signer });

            console.log("READ: ", { userHistory })
            if (userHistory?.table) {
                const { results } = await db.prepare(`SELECT * FROM ${userHistory?.table};`).all();
                console.log(results);
                setHistory(results)
            }

        } catch (error) {
            console.log("READ TABLE ERROR: ", error)
            return []
        } finally {
            setIsLoading(false)

        }
    }
    useEffect(() => {
        readTable()
    }, [userHistory])
    console.log({ userHistory })
    const thead = () => {
        const headers = [
            { label: "#" },
            { label: "Action" },
            { label: "Timestamp" },
            { label: "CID" },
            { label: "View" },
        ];
        return <TableThead headers={headers} />;
    };

    const tbody = () => {
        return (
            <>
                   
                {(history || []).map((_: any, index: number) => (
                    <TableRow>
                        <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{_?.action ? titleize(_?.action.replace('_', ' ')) : 'NA'}</td>

                        <td className="whitespace-nowrap px-6 py-4">{moment(_?.object?.timestamp).format('llll') ?? 'NA'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{_.object?.cid ?? "NA"}</td>
                        <td className="whitespace-nowrap px-6 py-4">{_.object?.cid ?
                            <button>
                                <a target="_blank" rel="noopener noreferrer" href={`https://ipfs.io/ipfs/${_.object?.cid}`}>
                                    <FiExternalLink className='w-8 h-8 text-green-400' />
                                </a>
                            </button> : "NA"}</td>
                    </TableRow>
                ) ) }
                        
            </>
        );
    };
    return (
        <div className="mx-auto w-full  px-4 content-center items-center">
        <div className="rounded-lg border h-screen bg-background p-8  shadow-md">
        <div className=' h-screen w-full overflow-auto'>
            {/* <div onClick={() => { readTable() }}>Click to load</div> */}
            <div className='text-2xl font-medium w-full text-center p-4 rounded-lg'>
            <h1 className="text-emerald-700 text-center text-4xl font-black">
                    History
                </h1>
            </div>
            {
                !!(!isLoading && history && history?.length) && (
                    <div className='flex flex-col w-full justify-center items-center'>
                        <Table thead={thead()} tbody={tbody()} />
                    </div>
                )

            }
            {
                !!(!isLoading && !history?.length) && (
                    <div className='flex flex-col w-full justify-center items-center'>
                        <div className='my-12 font-semibold text-4xl'>No Data Found!</div>
                    </div>
                )

            }
            {isLoading && (
                <Loader onClick={setIsLoading} showCloseIcon />
            )}

                </div>
            </div>
            </div>
    )
}
