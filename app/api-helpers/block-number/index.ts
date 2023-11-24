import { getChainData, payloadId } from '@/app/api-helpers/chain';
import axios from 'axios';

export const rpcGetBlockNumber = async (chainId: number) => {
    const rpcUrl = getChainData(chainId).rpc_url;

    if (!rpcUrl && typeof rpcUrl !== "string") {
        throw new Error("Invalid or missing rpc url");
    }

    const response = await axios.post(rpcUrl, {
        jsonrpc: "2.0",
        id: payloadId(),
        method: "eth_blockNumber",
        params: [],
    });
    return response;

};