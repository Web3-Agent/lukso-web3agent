import { NextResponse } from 'next/server';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { rpcGetBlockNumber } from '@/app/api-helpers/block-number';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        let chainId: any = url.searchParams.get('chainId');

        if (!chainId) {
            return NextResponse.json({ message: 'Network (chain) is required!', data: { chainId } }, { status: 400 });
        }

        chainId = parseInt(chainId, 10);

        let response = await rpcGetBlockNumber(chainId);
        response = response?.data?.result || null;
        if (!response) {
            return NextResponse.json({ message: 'No Content Found!', data: response }, { status: 204 });
        }
        const responsePayload = {
            chainId,
            hexadecimal: response,
            integer: convertStringToNumber(convertHexToString(response)),
        };

        return NextResponse.json({ message: 'Here is block number for Ethereum!', data: responsePayload }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });

    }
} 