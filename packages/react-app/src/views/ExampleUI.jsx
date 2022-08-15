import { Button, Divider } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";

import { Address, Balance, Events } from "../components";

export default function ExampleUI({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [newPurpose, setNewPurpose] = useState("loading...");
  const [amount, newAmount] = useState("loading...");

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Withdraw:</h2>
        <Divider />
        <div style={{ margin: 8 }}>
          <Button
            type={"default"}
            onClick={() => {
              tx(writeContracts.YourContract.withDraw());
            }}
          >
            💰 Withdraw
          </Button>          
        </div>

        <Divider />
        <div style={{ padding: 8 }}>
          <h3>Contract balance:</h3> 
          🏧 <Balance address={readContracts && readContracts.YourContract ? readContracts.YourContract.address : null} provider={localProvider} price={price} />
        </div>          
        <Divider />
        Your Address:
        <Address address={address} ensProvider={mainnetProvider} fontSize={16} />
        <Divider />
        {/* use utils.formatEther to display a BigNumber: */}
        <h2>Your Balance: {yourLocalBalance ? utils.formatEther(yourLocalBalance) : "..."}</h2>
        <div>OR</div>
        <Balance address={address} provider={localProvider} price={price} />
        <Divider />
        {/* use utils.formatEther to display a BigNumber: */}
        Your Contract Address:
        <Address
          address={readContracts && readContracts.YourContract ? readContracts.YourContract.address : null}
          ensProvider={mainnetProvider}
          fontSize={16}
        />
      </div>
      <Divider />
      <Divider />
    </div>
  );
}
