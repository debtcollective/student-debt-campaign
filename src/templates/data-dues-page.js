import React from "react";

import Layout from "../components/Layout";
import Header from "../components/Header";
import DataDuesAction from "../components/DataDuesAction";

export const DataDuesPageTemplate = () => {
  return (
    <main className="mt-5">
      <Header />
      <DataDuesAction />
    </main>
  );
};

const DataDuesPage = () => {
  return (
    <Layout>
      <DataDuesPageTemplate />
    </Layout>
  );
};

export default DataDuesPage;
