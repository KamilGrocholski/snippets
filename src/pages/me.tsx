import { Tab } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Snippet } from "@prisma/client";
import clsx from "clsx";
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import UiIcons from "../assets/UiIcons";
import Button from "../components/common/Button";
import Section from "../components/common/Section";
import StateWrapper from "../components/common/StateWrapper";
import TextInput from "../components/common/TextInput";
import MainLayout from "../components/layouts/MainLayout";
import RemoveSnippetModal from "../components/RemoveSnippetModal";
import useToastsController from "../hooks/useToastsController";
import { userSchemes, type UserProfileSchema } from "../server/api/schemes/schemes";
import { api } from "../utils/api";
import formatBytes from "../utils/formatBytes";
import { formatDate } from "../utils/time";

export type Tab = typeof TABS[number]

const TABS = [
  'My snippets',
  'Profile',
  // 'Settings'
] as const

const Me: NextPage = () => {
  const router = useRouter()

  const utils = api.useContext()

  const [open, setOpen] = useState(false)
  const [snippetIdHelper, setSnippetIdHelper] = useState<Snippet['id'] | null>(null)

  const onSuccessRemove = () => {
    void utils.snippet.getMySnippets.invalidate()
    setOpen(false)
    setSnippetIdHelper(null)
    if (window.location.pathname !== '/me?tab=My snippets') {
      void router.push('/me?tab=My snippets')
    }
  }

  const onErrorRemove = () => {
    console.log('error')
  }

  const tab = useMemo(() => {
    return router.query.tab as Tab
  }, [router.query.tab])

  const mySnippets = api.snippet.getMySnippets.useQuery(undefined, {
    enabled: tab === 'My snippets'
  })

  const meQuery = api.user.getMe.useQuery(undefined, {
    enabled: tab === 'Profile'
  })

  const changeTab = (tab: Tab) => {
    void router.push(
      {
        pathname: '/me',
        query: {
          tab
        },
      },
      undefined,
      {
        shallow: true
      }
    )
  }

  return (
    <MainLayout useContainer={true}>
      {snippetIdHelper ? <RemoveSnippetModal
        openState={[open, setOpen]}
        snippetId={snippetIdHelper}
        onSuccess={onSuccessRemove}
        onError={onErrorRemove}
      /> : <></>}
      <Tab.Group>
        <Tab.List className='flex gap-5 justify-center'>
          {TABS.map((tab, index) => (
            <Tab
              onClick={() => changeTab(tab)}
              key={index}
              className={({ selected }) => clsx(
                'py-1.5 px-5 border-b w-fit border-transparent',
                selected && '!border-primary text-primary'
              )}
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Section>

            {/* My snippets */}
            <Tab.Panel>
              <StateWrapper
                data={mySnippets.data}
                isLoading={mySnippets.isLoading}
                isError={mySnippets.isError}
                NonEmpty={(snippets) => <>
                  <table className='z-40 table-auto border-collapse container mx-auto'>
                    <thead>
                      <tr className='[&>th]:text-start'>
                        <th>Title</th>
                        <th className='hide-when-not-md'>Created</th>
                        <th className='hide-when-not-md'>Size</th>
                        <th>Language</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {snippets.map((snippet, index) => (<>
                        <tr key={index} className='hover:bg-base-300/50'>
                          <td className='text-primary hover:text-primary/70 break-all'>
                            <Link href={`/snippets/${snippet.id}`}>
                              {snippet.title}
                            </Link>
                          </td>
                          <td className='hide-when-not-md'>{formatDate(snippet.createdAt)}</td>
                          <td className='hide-when-not-md'>{formatBytes(snippet.size)}</td>
                          <td>{snippet.language}</td>
                          <td>{snippet.isPublic ? 'Public' : 'Private'}</td>
                          <td>
                            <Button
                              size='xs'
                              variant='ghost'
                              onClick={() => void router.push(`/snippets/edit/${snippet.id}`)}
                            >
                              {UiIcons.pencilSquare}
                            </Button>
                            <Button
                              size='xs'
                              variant='danger'
                              onClick={() => {
                                setSnippetIdHelper(snippet.id)
                                setOpen(true)
                              }}
                            >
                              {UiIcons.trash}
                            </Button>
                          </td>
                        </tr>
                      </>
                      ))}
                    </tbody>
                  </table>
                </>}
              />
            </Tab.Panel>

            {/* Profile  */}
            <Tab.Panel>
              <StateWrapper
                data={meQuery.data}
                isLoading={meQuery.isLoading}
                isError={meQuery.isError}
                NonEmpty={(me) => <>
                  <UserUpdateForm
                    name={me.name}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    websiteUrl={me.websiteUrl}
                    image={me.image}
                  />
                </>}
              />
            </Tab.Panel>

          </Section>
        </Tab.Panels>

      </Tab.Group>
    </MainLayout>
  )
}

export default Me

const UserUpdateForm: React.FC<{
  name: string
  websiteUrl: string | null
  image: string | null
}> = ({
  name,
  websiteUrl,
  image,
}) => {
    const utils = api.useContext()

    const { add } = useToastsController()

    const updateMeMutation = api.user.updateMe.useMutation({
      onError: () => {
        add('update-profile-error')
      },
      onSuccess: () => {
        add('update-profile-success')
        void utils.user.getMe.invalidate()
      }
    })

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<UserProfileSchema>({
      resolver: zodResolver(userSchemes.updateMe),
      defaultValues: {
        name: name ?? '',
        websiteUrl: websiteUrl ?? '',
        image: image ?? ''
      }
    })


    return (
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(
          (data, e) => {
            e?.preventDefault()
            console.log({ data })
            updateMeMutation.mutate(data)
          }
        )}
      >
        <div className='flex flex-col gap-5 w-fit mx-auto'>
          <TextInput
            label='Name'
            {...register('name')}
            errorMessage={errors.name?.message}
          />
          <TextInput
            label='Website'
            {...register('websiteUrl')}
            errorMessage={errors.websiteUrl?.message}
          />
          <TextInput
            label='Avatar'
            {...register('image')}
            errorMessage={errors.image?.message}
          />
          <div className='mx-auto'>
            <Button
              type='submit'
              loading={updateMeMutation.isLoading}
              disabled={updateMeMutation.isLoading}
            >
              Update profile
            </Button>
          </div>
        </div>
      </form>
    )
  }