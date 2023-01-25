import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import MainLayout from "../components/layouts/MainLayout";
import StateWrapper from "../components/common/StateWrapper";
import SnippetLink from "../components/SnippetLink";
import SnippetForm from "../components/SnippetForm";
import SnippetsListing from "../components/SnippetsListing";
import Section from "../components/common/Section";

const Home: NextPage = () => {
  const getRecentlyAddedQuery = api.snippet.getRecentlyAdded.useQuery({})
  const createSnippetMutation = api.snippet.create.useMutation()

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout useContainer={true}>
        {/* <StateWrapper
          isLoading={getRecentlyAddedQuery.isLoading}
          isError={getRecentlyAddedQuery.isError}
          data={getRecentlyAddedQuery.data}
          NonEmpty={(snippets) =>
            <SnippetsListing
              snippets={snippets}
              renderItem={(snippet, index) => <SnippetLink key={index} {...snippet} />}
            />
          }
        /> */}
        <Section>
          <SnippetForm
            onValid={(data) => createSnippetMutation.mutate(data)}
            onError={console.log}
          />
        </Section>
      </MainLayout>
    </>
  );
};

export default Home;
