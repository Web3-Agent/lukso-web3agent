import '@rainbow-me/rainbowkit/styles.css'
import merge from 'lodash.merge';
import
  {
  
  RainbowKitProvider,
  darkTheme,
    Theme,
    getDefaultWallets,
  lightTheme
} from '@rainbow-me/rainbowkit';
// import { getDefaultWallets, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
import { goerli, polygon, polygonZkEvmTestnet, polygonMumbai, lu } from '@wagmi/chains'

import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ReactNode } from 'react'
import { infuraProvider } from 'wagmi/providers/infura'
import React from 'react'
import { Chain } from '@rainbow-me/rainbowkit';


const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: '#0E7D02',
    
  },
  
} as Theme);

interface Props {
  children: ReactNode
}

const luksoT: Chain = {
  id: 4201,
  name: 'Lukso Testnet',
  network: 'Testnet',
  iconUrl: 'https://docs.lukso.tech/img/logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'lucso testnet',
    symbol: 'LYXt',
  },
  rpcUrls: {
    public: { http: ['https://rpc.testnet.lukso.network'] },
    default: { http: ['https://rpc.testnet.lukso.network'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://blockscout.com/lukso/l14' },

  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
  testnet: false,
};
const lukso: Chain = {
  id: 42,
  name: 'Lukso Mainnet',
  network: 'Mainnet',
  iconUrl: 'https://docs.lukso.tech/img/logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'lucso mainnet',
    symbol: 'LYX',
  },
  rpcUrls: {
    public: { http: ['https://lukso.nownodes.io'] },
    default: { http: ['https://lukso.nownodes.io'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.execution.mainnet.lukso.network/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
  testnet: false,
};

const NETWORKS = [ luksoT,lukso]
const { chains, provider } = configureChains( NETWORKS, [ infuraProvider( { apiKey: "" } ), publicProvider() ] )

const { connectors } = getDefaultWallets({
  appName: "Web3 Agent",
  chains,
})

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export function Web3Provider(props: Props) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider modalSize="compact"  theme={lightTheme({
        
        borderRadius: 'medium',
        accentColor: '#388E3C',
        fontStack: 'rounded',
        

      })} coolMode chains={chains}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
