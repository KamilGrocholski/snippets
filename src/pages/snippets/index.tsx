import { type NextPage } from "next"
import MainLayout from "../../components/layouts/MainLayout"
import Section from "../../components/common/Section"
import SnippetsFilter, { useSnippetsFilter } from "../../components/SnippetsFilter"
import SnippetsList from "../../components/SnippetsList"
import { api } from "../../utils/api"

const SnippetsPage: NextPage = () => {
  const snippetsFilter = useSnippetsFilter()

  const infiniteSnippets = api.snippet.infiniteSnippets.useInfiniteQuery({
    filter: snippetsFilter.state
  })

  if (!infiniteSnippets.data?.pages[0]?.snippets) return null

  return (
    <>
      <MainLayout useContainer={true}>
        <SnippetsFilter onSearch={(filter) => snippetsFilter.setFilter({ ...filter })} />
        <Section>
          <SnippetsList snippets={infiniteSnippets.data.pages[0]?.snippets} />
        </Section>
      </MainLayout>
    </>
  )
}

export default SnippetsPage