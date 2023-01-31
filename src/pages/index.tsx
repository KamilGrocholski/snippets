import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";

import MainLayout from "../components/layouts/MainLayout";
import SnippetForm from "../components/SnippetForm";
import Section from "../components/common/Section";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import useToastsController from "../hooks/useToastsController";

const Home: NextPage = () => {

  const router = useRouter()
  const { add } = useToastsController()

  const createSnippetMutation = api.snippet.create.useMutation({
    onSuccess: (createdSnippet) => {
      add('add-snippet-success')
      void router.push(`/snippets/${createdSnippet.id}`)
    },
    onError: () => {
      add('add-snippet-error')
    }
  })

  return (
    <>
      <Head>
        <title>Create a snippet</title>
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

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {}
  }
}