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
import { goerli, polygon, polygonZkEvmTestnet, polygonMumbai, filecoinCalibration } from '@wagmi/chains'

import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ReactNode } from 'react'
import { infuraProvider } from 'wagmi/providers/infura'
import React from 'react'

const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: '#0E7D02',
    
  },
  
} as Theme);

interface Props {
  children: ReactNode
}
const NETWORKS = [ goerli, polygon,  polygonMumbai, polygonZkEvmTestnet, filecoinCalibration]
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
