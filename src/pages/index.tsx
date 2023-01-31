import { type NextPage } from "next";
import Head from "next/head";

import MainLayout from "../components/layouts/MainLayout";
import SnippetForm from "../components/SnippetForm";
import Section from "../components/common/Section";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import useToastsController from "../hooks/useToastsController";

const Home: NextPage = () => {

  const utils = api.useContext()
  const router = useRouter()
  const { add } = useToastsController()

  const createSnippetMutation = api.snippet.create.useMutation({
    onSuccess: (createdSnippet) => {
      add('add-snippet-success')
      void router.push(`/snippets/${createdSnippet.id}`)
      void utils.snippet.infiniteSnippets.invalidate()
    },
    onError: () => {
      add('add-snippet-error')
    }
  })

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout useContainer={true}>
        <Section>
          <SnippetForm
            onValid={(data) => createSnippetMutation.mutate(data)}
            loading={createSnippetMutation.isLoading}
            disabled={createSnippetMutation.isLoading || createSnippetMutation.isSuccess}
          />
        </Section>
      </MainLayout>
    </>
  );
};

export default Home;
