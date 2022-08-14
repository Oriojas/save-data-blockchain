import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import { Button, Divider, Form, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @param {*} tx
 * @param {*} writeContracts
 * @returns react component
 **/
function Home({ yourLocalBalance, 
                readContracts,
                tx,
                writeContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");
  const [ origin, newOrigin ] = useState("loading...");
  const [ destination, newDestination ] = useState("loading...");
  const [ name, newName ] = useState("loading...");
  const [ amount, newAmount ] = useState("loading...");
  const [ description, newDescription ] = useState("loading...");
  const [ status, newStatus ] = useState("loading...");
  
  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Save your data in a blockchain</h2>
        <p>For small fee 🤓</p>
        <Divider />
        <br></br>
        <div>  
          <Form name="basic"
            size="small" 
            labelCol={{ span: 8,}}
            wrapperCol={{ span: 16,}}
            initialValues={{ remember: true, }}
            autoComplete="off"
            >
              <Form.Item
                label="Origin"
                name="origin"
                rules={[
                  {
                    required: true,
                    message: "Please input the origin",
                  },
                  ]}
                  >
                    <Input /* Input data Name */
                      onChange={e => {
                        newOrigin(e.target.value);
                      }}
                    />
              </Form.Item>
              
              <Form.Item
                label="Destination"
                name="destination"
                rules={[
                  {
                    required: true,
                    message: "Please input the destination",
                  },
                  ]}
                  >
                    <Input 
                      onChange={e => {
                        newDestination(e.target.value);
                      }}
                    />
              </Form.Item>
              
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input name",
                  },
                  ]}
                  >
                    <Input
                      onChange={e => {
                        newName(e.target.value);
                      }}
                    />
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Please input amount",
                  },
                  ]}
                  >
                    <Input 
                    onChange={e => {
                      newAmount(e.target.value);
                    }}/>
              </Form.Item>
              
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input description",
                  },
                  ]}
                  >
                    <Input 
                    onChange={e => {
                      newDescription(e.target.value);
                    }}
                    />
              </Form.Item>
              
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Please input status",
                  },
                  ]}
                  >
                    <Input 
                    onChange={e => {
                      newStatus(e.target.value)
                    }}
                    />
              </Form.Item>            
          
          </Form> 
          <Divider />
        </div>          
        <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(writeContracts.YourContract.pushData(origin,
                                                            destination,
                                                            name,
                                                            amount,
                                                            description,
                                                            status), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Save Data
          </Button>      
      </div>
    <Divider />
    </div>
  );
}

export default Home;
