import { type NextPage } from "next"
import MainLayout from "../../components/layouts/MainLayout"
import Section from "../../components/common/Section"
import SnippetsFilter, { useQueryFromUrl, useSnippetsFilter } from "../../components/SnippetsFilter"
import { api } from "../../utils/api"
import SnippetListItem from "../../components/SnippetListItem"
import useInfiniteScroll from "../../hooks/useInfiniteScroll"
import { useEffect, useRef } from "react"
import StateWrapper from "../../components/common/StateWrapper"
import { useRouter } from "next/router"

const SnippetsPage: NextPage = () => {
  const snippetsFilter = useSnippetsFilter()

  const filter = useQueryFromUrl()

  const infiniteSnippets = api.snippet.infiniteSnippets.useInfiniteQuery({
    // filter: snippetsFilter.state,
    filter: filter,
    limit: 25
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  const endRef = useRef<HTMLDivElement | null>(null)

  useInfiniteScroll({
    elementRef: endRef,
    isFetching: infiniteSnippets.isFetching,
    hasMore: !!infiniteSnippets.hasNextPage,
    fetchMore: () => void infiniteSnippets.fetchNextPage(),
    threshold: 1
  })

  if (!infiniteSnippets.data?.pages[0]?.snippets) return null

  return (
    <>
      <MainLayout useContainer={true}>
        <Section containerClassName="sticky top-16">
          <SnippetsFilter onSearch={(filter) => snippetsFilter.setFilter({ ...filter })} />
        </Section>
        <Section>
          <StateWrapper
            isLoading={infiniteSnippets.isLoading}
            isError={infiniteSnippets.isError}
            data={infiniteSnippets.data}
            isEmpty={infiniteSnippets.data.pages[0].snippets.length === 0}
            NonEmpty={(data) =>
              <div className='flex flex-col space-y-1'>
                {data.pages.map((page) => (
                  page.snippets.map((snippet, snippetIndex) => (
                    <SnippetListItem key={snippetIndex} snippet={snippet} />
                  ))
                ))}
              </div>
            }
          />
          <div ref={endRef} className='h-48'>
            <div></div>
          </div>
        </Section>
      </MainLayout>
    </>
  )
}

export default SnippetsPage