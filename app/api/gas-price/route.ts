import { NextResponse } from 'next/server';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { rpcGetGasFee } from '@/app/api-helpers/gas-price';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        let chainId: any = url.searchParams.get('chainId');
        if (!chainId) {
            return NextResponse.json({ message: 'Network (chain) is required!', data: { chainId } }, { status: 400 });
        }
        chainId = parseInt(chainId, 10);

        let response = await rpcGetGasFee(chainId);
        response = response?.data?.result || null
        if (!response) {
            return NextResponse.json({ message: 'No Content Found!', data: response }, { status: 204 });
        }
        const responsePayload = {
            chainId,
            wei: convertStringToNumber(convertHexToString(response)),
            gwei: Math.ceil(convertStringToNumber(convertHexToString(response)) / 1000000000)
        }
        return NextResponse.json({ message: 'Here is gas fee for Ethereum!', data: responsePayload, }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 