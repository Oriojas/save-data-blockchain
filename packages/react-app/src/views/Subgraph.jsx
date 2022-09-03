import { gql, useQuery } from "@apollo/client";
import "antd/dist/antd.css";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import React, { useState } from "react";
import { Divider } from "antd";

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
  query MyQuery {
    pushDatas(first: 5, orderDirection: asc, orderBy: amount) {
      id
      origin
      destination
      name
      amount
      description
      status
      create
    }
  }
  `;
  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
  const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

  const deployWarning = (
  <div style={{ marginTop: 8, padding: 8 }}>Warning: 🤔 Have you deployed your subgraph yet?</div>
  );

  return (
    <>

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
      <Divider />
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📈</span>
        The queries in publish graph
        (this 🤓{" "}
        <a
          href="https://api.studio.thegraph.com/query/23301/save_data_blockchain/v0.0.10"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        )
      </div>
      <Divider />
    </>
  );
}

export default Subgraph;
