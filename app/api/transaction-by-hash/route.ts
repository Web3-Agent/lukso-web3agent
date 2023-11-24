import { NextResponse } from 'next/server';
import { getChainData } from '@/app/api-helpers/chain';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { rpcGetTransactionByHash } from '@/app/api-helpers/transaction-by-hash';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const txnHash = url.searchParams.get('txnHash');
        let chainId: any = url.searchParams.get('chainId');
        if (!txnHash || !chainId) {
            return NextResponse.json({ message: 'Transaction hash & Chain is required!', data: { txnHash, chainId } }, { status: 400 });
        }
        chainId = parseInt(chainId, 10);
        const chainData = getChainData(chainId);
        const nativeCurrency = chainData.native_currency;
        let response: any = await rpcGetTransactionByHash(txnHash, chainId);
        response = response?.data?.result || null;
        if (!response) {
            return NextResponse.json({ message: 'No Content Found!', data: response }, { status: 204 });
        }
        const responsePayload = {
            ...nativeCurrency,
            ...response,
            txnHash,
            chainId,
            txnValueInWei: convertStringToNumber(convertHexToString(response?.value)),
            txnValueInGwei: Math.ceil(convertStringToNumber(convertHexToString(response?.value)) / 1000000000),
            txnValueInEther: convertStringToNumber(convertHexToString(response?.value)) / 1_000_000_000_000_000_000
        }
        return NextResponse.json({ message: 'Here is details of transcation!', data: responsePayload }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 