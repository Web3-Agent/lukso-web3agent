import { UseChatHelpers } from 'ai/react'

import { Button } from '@/app/_components/ui/button'
import { IconArrowRight, IconArrowElbow } from '@/app/_components/ui/icons'
import { IconCheck, IconEdit } from './ui/icons'

const exampleMessages = [
  {
    heading: 'ERC20 Wizard',
    message: `Help me write an ERC20 token smart contract.`
  },
  {
    heading: 'ERC721 Wizard',
    message: 'Help me write an ERC721 NFT smart contract.'
  },
  {
    heading: 'Multisig Wizard',
    message: `Help me write a multisig wallet.`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto w-full px-4">
      <div className="rounded-lg border bg-background p-8 shadow-md">
        <h1 className=" text-emerald-700 text-center text-3xl font-black">
          Your Web3 Agent
        </h1>

      
        <p className="leading-normal mt-2 text-lg text-muted-foreground text-center">
         Unlock the power of web3, Type a prompt to get started
        </p>
        {/* <p className="mb-2 text-center leading-normal text-muted-foreground">
          I am a smart contract development assistant. I can help you write, and
          interact with smart contracts on any compatible blockchain. I also can
          <b> Deploy</b> the smart contract as well.
        </p> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px'
          }}
        >
          {exampleMessages.map((message, index) => (
            <Button
              variant="destructive"
              key={index}
              onClick={() => setInput(message.message)}
              style={{ margin: '7px', marginTop: '-7px', height: '50px' }}
            >
              <IconEdit className="mr-2" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
