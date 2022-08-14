import { gql, useQuery } from "@apollo/client";
import { Button, Input, Table, Typography } from "antd";
import "antd/dist/antd.css";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import React, { useState } from "react";
import { Address } from "../components";

const highlight = {
  marginLeft: 4,
  marginRight: 8,
  /* backgroundColor: "#f9f9f9", */ padding: 4,
  borderRadius: 4,
  fontWeight: "bolder",
};

function Subgraph(props) {
  function graphQLFetcher(graphQLParams) {
    return fetch(props.subgraphUri, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  const EXAMPLE_GRAPHQL = `
  {
    purposes(first: 25, orderBy: createdAt, orderDirection: desc) {
      id
      purpose
      createdAt
      sender {
        id
      }
    }
    senders {
      id
      address
      purposeCount
    }
  }
  `;
  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
  const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

  const purposeColumns = [
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Sender",
      key: "id",
      render: record => <Address value={record.sender.id} ensProvider={props.mainnetProvider} fontSize={16} />,
    },
    {
      title: "createdAt",
      key: "createdAt",
      dataIndex: "createdAt",
      render: d => new Date(d * 1000).toISOString(),
    },
  ];

  const [newPurpose, setNewPurpose] = useState("loading...");

  const deployWarning = (
    <div style={{ marginTop: 8, padding: 8 }}>Warning: 🤔 Have you deployed your subgraph yet?</div>
  );

  return (
    <>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📝</span>
        Create your <b>local subgraph</b> by running
        <span className="highlight" style={highlight}>
          yarn graph-create-local
        </span>
        (only required once!)
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🚢</span>
        Deploy your <b>local subgraph</b> by running
        <span className="highlight" style={highlight}>
          yarn graph-ship-local
        </span>
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🖍️</span>
        Edit your <b>local subgraph</b> in
        <span className="highlight" style={highlight}>
          packages/subgraph/src
        </span>
        (learn more about subgraph definition{" "}
        <a
          href="https://thegraph.com/docs/en/developer/define-subgraph-hosted/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        )
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🤩</span>
        Deploy your <b>contracts and your subgraph</b> in one go by running
        <span className="highlight" style={highlight}>
          yarn deploy-and-graph
        </span>
      </div>

      <div style={{ width: 780, margin: "auto", paddingBottom: 64 }}>
        {data ? (
          <Table dataSource={data.purposes} columns={purposeColumns} rowKey="id" />
        ) : (
          <Typography>{loading ? "Loading..." : deployWarning}</Typography>
        )}

        <div style={{ margin: 32, height: 400, border: "1px solid #888888", textAlign: "left" }}>
          <GraphiQL fetcher={graphQLFetcher} docExplorerOpen query={EXAMPLE_GRAPHQL} />
        </div>
      </div>

      <div style={{ padding: 64 }}>...</div>
    </>
  );
}

export default Subgraph;
