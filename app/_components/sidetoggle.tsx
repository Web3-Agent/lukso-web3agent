// import React from "react";
// import { useState } from "react";
import React, { useState, useEffect } from 'react';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CopyAll, CopyAllRounded, CopyAllSharp, LockClockOutlined, LockClockRounded, Login, LoginRounded, Power, PowerOff, Search, SearchOffOutlined } from "@mui/icons-material";
import Link from 'next/link'
import { useRouter } from 'next/router';



const SideToggle = () => {
  const [ open, setOpen ] = useState( true );
  const [ currentPath, setCurrentPath ] = useState( '/' );
  
  useEffect(() => {
      setCurrentPath(window.location.pathname);
  }, [] );
  
  const Menus = [
    { title: "Home", src: "https://i.imgur.com/QMNAWX7.png", gap: true, slug: "/home" },
    { title: "Ask Agent", src: "https://i.imgur.com/2pHVHza.png", slug: "/" },
    { title: "Send Transacetion", src: "https://i.imgur.com/XjBwspt.png", slug: "/defi-prompt" },
    { title: "Deploy Contracts", src: "https://i.imgur.com/VT7UdPH.png", slug: "/defi-prompt" },
    { title: "Defi", src: "https://i.imgur.com/IYxIvAB.png", slug: "/defi-prompt" },
    { title: "Manage History", src: "https://i.imgur.com/g0as0Mv.png", slug: "/manage-history" },
    { title: "View History", src: "https://i.imgur.com/TW9s7qs.png", slug: "/history" },

  ];

  return (
    <div className="flex font-medium">
      <div
        style={{ borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}
        className={ ` ${ open ? "w-64" : "w-20 " }
         bg-gray-100 h-screen p-5  pt-8 duration-300 rounded-tr-md rounded-br-md fixed`}
      >
        <img
          src="https://i.imgur.com/0KJGLEI.png"
          className={`absolute z-50 cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="button"
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="https://i.imgur.com/NdhWi7c.png"
            className={` h-9 cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={` origin-left font-bold text-xl duration-300 ${!open && "scale-0"
              }`}
          >
            Web3 Agent
          </h1>
        </div>
        <ul className="pt-6">
          { Menus.map( ( Menu, index ) => (
          <Link href={Menu?.slug} className='text-gray-600 font-semibold'>

              <li
                
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-300 active:bg-gray-200 text-gray-700  text-sm font-semibold items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}
                  
                   ${currentPath  === Menu?.slug ? 'bg-gray-300' : ''}
                  `}
                          onClick={() => setCurrentPath(Menu?.slug)}

                // ${router.asPath === Menu?.slug ? 'bg-gray-200' : ''}
              >
                <img height={"20px"} width={"20px"} src={Menu.src} />


                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
              </li>
          </Link>

          ))}
        </ul>
        <ul style={{ position: "absolute", bottom: "10px", }}  >
          <span style={{ width: "100%", fontSize: "13px" }} className={`${!open && "hidden"} origin-left duration-200`}>
            <ConnectButton chainStatus="icon" showBalance={false} ></ConnectButton>
          </span>
          <span className={`${open && "hidden"} origin-left duration-200`}>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button style={{ background: "green", color: "white", padding: "5px", borderRadius: "50%" }} onClick={openConnectModal} type="button">
                            <LoginRounded></LoginRounded>
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button">
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div style={{ display: 'flex', flexDirection: "column", gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 30,
                                  height: 30,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 30, height: 30 }}
                                  />
                                )}
                              </div>
                            )}
                            {/* {chain.name} */}
                          </button>

                          <button style={{ background: "green", color: "white", padding: "5px", borderRadius: "50%", height: "30px", width: "30px", fontSize: "15px" }} onClick={openAccountModal} type="button">
                            {/* { account.displayName } */}
                            <CopyAll fontSize="15px" ></CopyAll>
                            {/* {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''} */}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </span>
        </ul>
      </div>
      {/* <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div> */}
    </div>
  );
};
export default SideToggle;
