'use client'
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */

import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth } from "@web3auth/modal";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
// import RPC from ".api/ethersRPC"; // for using ethers.js
// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
// Adapters

// import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import { useEffect, useState } from "react";

import RPC from "./web3RPC"; // for using web3.js


const clientId = "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk"; // get from https://dashboard.web3auth.io


import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/app/lib/utils'
// import { auth } from '@/auth'
// import { options } from "../api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
import { clearChats } from '@/app/actions'
import { buttonVariants } from '@/app/_components/ui/button'
import { Sidebar } from '@/app/_components/sidebar'
import { SidebarList } from '@/app/_components/sidebar-list'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator
} from '@/app/_components/ui/icons'
import { SidebarFooter } from '@/app/_components/sidebar-footer'
import { ThemeToggle } from '@/app/_components/theme-toggle'
import { ClearHistory } from '@/app/_components/clear-history'
import { NetworkSwitcher } from "./switchNetwork";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useSmartAccount } from '../../hooks/use-smart-account';
import { FC } from 'react';
import { CFC } from '../../types/react';
import { ContentCopy, LinkOff, SmartToy, Wallet } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled
} from '@mui/material';
import { Web3AuthConnector } from '../../auth/wagmi';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from 'ethers';





const AddressTile: CFC<{ address?: string; label: string; }> = ({
  address,
  label,
  children
}) => {

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateRows: 'auto auto',
        columnGap: 1,
        flex: 1
      }}
    >
      <Typography
        sx={{
          gridColumn: '1 / 3',
          gridRow: '1 / 2'
        }}
        variant="caption"
        color="text.secondary"
      >
        {label}
      </Typography>

      <Box
        sx={{
          gridColumn: '1 / 2',
          gridRow: '2 / 3',
          alignSelf: 'center'
        }}
      >

      </Box>

      <Typography
        sx={{
          gridColumn: '2 / 3',
          gridRow: '2 / 3'
        }}
        variant="body1"
      >
        Address : {(address)}
      </Typography>

      <Box
        sx={{
          gridColumn: '3 / 4',
          gridRow: '1 / 3',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const SmartAccountTile = () => {
  const { smartAccountAddress } = useSmartAccount();
  console.log("final address is -========================>>>>>>>>>>>>>", smartAccountAddress)

  return (
    <>
      <AddressTile label="Smart Account" address={smartAccountAddress}>
        <IconButton color="error" size="small" onClick={() => copy(smartAccountAddress)}>
          <ContentCopy
            sx={{
              color: 'primary.main'
            }}
          />
        </IconButton>
      </AddressTile>

    </>

  );
};


export function Header() {
  const { address, connector, isConnected } = useAccount();
  // const { connect, connectors, error } = useConnect();
  // const { disconnect } = useDisconnect();
  // const { smartAccountAddress } = useSmartAccount();

  //  const { connect } = useConnect({
  //   connector: Web3AuthConnector
  // });
  // const { disconnect } = useDisconnect();


  //  const isReady = isConnected && address && smartAccountAddress;


  const handleSignMessage = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const message = 'Your message to sign'; // Replace with the actual message
        const signature = await signer.signMessage(message);
        console.log('Signature:', signature);
        // Handle the signature as needed, e.g., send it to the server for verification
      } catch (error) {
        console.error('Error signing message:', error);
      }
    } else {
      console.error('Please install MetaMask or another Ethereum wallet extension.');
    }
  };

  return (
    <>
    </>
    // <><header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
    //   <div className="flex items-center gap-4">
    //     {isConnected ? (
    //       <>
    //         {/* <Sidebar>
    //           <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>

    //             <SidebarList  />
    //           </React.Suspense>
    //           <SidebarFooter>
    //             <ThemeToggle />
    //             <ClearHistory clearChats={clearChats} />
    //           </SidebarFooter>
    //         </Sidebar>
    //         <Link href={'/defi-prompt'} className='text-gray-600 font-semibold'>
    //           Defi Prompt
    //         </Link> */}
    //       </>
    //     ) : (
    //       <Link href="/">
    //         <div style={{ display: "flex" }}>
    //           <img
    //             width={'130px'}
    //             style={{ cursor: 'pointer' }}
    //             src="https://i.imgur.com/VfXLfud.png"
    //           ></img>
    //         </div>

    //       </Link>
    //     )}
    //   </div>

    //   <div className="flex items-center justify-end space-x-2">
    //     <div className="flex items-center">

    //            <ConnectButton></ConnectButton>

    //       {isConnected ? (
    //         <>
    //           {/* Your existing connected user interface */ }
    //          <button onClick={handleSignMessage} className="text-white bg-green-500 px-4 py-2 rounded">
    //             Sign Message
    //           </button> 
    //         </>
    //       ) : (
    //         <>

    //         </>
    //       )}




    //     </div>
    //   </div>

    // </header>


    // </>

  )
}