import { type NextPage } from "next";
import Head from "next/head";

import MainLayout from "../components/layouts/MainLayout";
import SnippetForm from "../components/SnippetForm";
import Section from "../components/common/Section";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout useContainer={true}>
        <Section>
          <SnippetForm />
        </Section>
      </MainLayout>
    </>
  );
};

export default Home;
