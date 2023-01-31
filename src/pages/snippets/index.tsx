import { type NextPage } from "next"
import MainLayout from "../../components/layouts/MainLayout"
import Section from "../../components/common/Section"
import SnippetsFilter, { initialFilterState } from "../../components/SnippetsFilter"
import { api } from "../../utils/api"
import SnippetListItem from "../../components/SnippetListItem"
import useInfiniteScroll from "../../hooks/useInfiniteScroll"
import { useRef } from "react"
import StateWrapper from "../../components/common/StateWrapper"
import { useRouter } from "next/router"
import Button from "../../components/common/Button"
import { object } from "../../utils/objectThings"
import Divider from "../../components/common/Divider"

const SnippetsPage: NextPage = () => {
  const router = useRouter()

  const filterQuery = router.query as typeof initialFilterState

  const infiniteSnippets = api.snippet.infiniteSnippets.useInfiniteQuery({
    filter: object.isEmpty(filterQuery) ? initialFilterState : filterQuery,
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

  return (
    <>
      <MainLayout useContainer={true}>
        <Section useBgColor={false} useSectionPadding={false} containerClassName="bg-base-300 rounded-none sticky top-12" sectionClassName="pt-4 pb-2">
          <SnippetsFilter />
        </Section>
        <Section>
          <StateWrapper
            isLoading={infiniteSnippets.isLoading}
            isError={infiniteSnippets.isError}
            data={infiniteSnippets.data}
            isEmpty={infiniteSnippets.data?.pages[0]?.snippets.length === 0}
            Error={<div className='mx-auto w-fit'>
              <span>Sorry, an error has occured.
                <Button
                  onClick={() => void infiniteSnippets.refetch()}
                  className='mx-1'
                >Try again</Button>
              </span>
            </div>}
            Empty={<div className='mx-auto w-fit'>No snippets meet such criteria</div>}
            NonEmpty={(data) =>
              <div className='flex flex-col lg:space-y-1 space-y-5'>
                {data.pages.map((page) => (
                  page.snippets.map((snippet, snippetIndex) => (
                    <>
                      <SnippetListItem key={snippetIndex} snippet={snippet} />
                      <Divider />
                    </>
                  ))
                ))}
              </div>
            }
          />
          <div ref={endRef} className='h-12 mx-auto w-fit mt-2 px-3 py-3'>
            <div>{
              infiniteSnippets.data?.pages[0]?.snippets.length === 0 || infiniteSnippets.isFetching || infiniteSnippets.isLoading
                ? '' :
                !!infiniteSnippets.hasNextPage
                  && infiniteSnippets.isFetching
                  ? '' : 'No more snippets'}</div>
          </div>
        </Section>
      </MainLayout>
    </>
  )
}

export default SnippetsPage
