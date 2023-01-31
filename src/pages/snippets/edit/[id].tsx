import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Section from "../../../components/common/Section";
import StateWrapper from "../../../components/common/StateWrapper";
import MainLayout from "../../../components/layouts/MainLayout";
import SnippetForm from "../../../components/SnippetForm";
import useToastsController from "../../../hooks/useToastsController";
import { api } from "../../../utils/api";



const EditSnippetPage: NextPage = () => {
    const router = useRouter()

    const id = router.query.id as string

    const snippetQuery = api.snippet.getOnyByIdProtected.useQuery({ snippetId: id ?? '' })

    const utils = api.useContext()

    const { add } = useToastsController()

    const updateSnippetMutation = api.snippet.updateById.useMutation({
        onSuccess: () => {
            add('update-snippet-success')
            void utils.snippet.infiniteSnippets.invalidate()
        },
        onError: () => {
            add('update-snippet-error')
        }
    })

    return (
        <MainLayout useContainer={true}>
            <StateWrapper
                data={snippetQuery.data}
                isLoading={snippetQuery.isLoading}
                isError={snippetQuery.isError}
                NonEmpty={(snippet) => <>
                    <Head>
                        <title>{snippet.title}</title>
                        <meta name="snippetId" content={snippet.id} />
                        <meta name="authorId" content={snippet.user.id} />
                        <meta name="authorName" content={snippet.user.name} />
                        <meta name="createdAt" content={snippet.createdAt.toString()} />
                    </Head>
                    <Section>
                        <SnippetForm
                            onValid={(data) => updateSnippetMutation.mutate({ ...data, snippetId: id })}
                            loading={updateSnippetMutation.isLoading}
                            disabled={updateSnippetMutation.isLoading}
                            initialData={{ ...snippet }}
                        />
                    </Section>
                </>}
            />
        </MainLayout>
    );
};

export default EditSnippetPage
