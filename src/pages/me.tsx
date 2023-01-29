import { Tab } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import Button from "../components/common/Button";
import Section from "../components/common/Section";
import StateWrapper from "../components/common/StateWrapper";
import TextInput from "../components/common/TextInput";
import MainLayout from "../components/layouts/MainLayout";
import { userSchemes, type UserProfileSchema } from "../server/api/schemes/schemes";
import { api } from "../utils/api";

const Me: NextPage = () => {
  const meQuery = api.user.getMe.useQuery()

  return (
    <MainLayout useContainer={true}>
      <StateWrapper
        data={meQuery.data}
        isLoading={meQuery.isLoading}
        isError={meQuery.isError}
        NonEmpty={(me) => <>
          <Section>
            <Tab.Group>
              <Tab.List className='flex gap-5 justify-center'>
                <Tab className={({ selected }) => clsx(
                  'py-1.5 px-5 border-b w-fit border-transparent',
                  selected && '!border-primary text-primary'
                )}>Profile</Tab>
                <Tab className={({ selected }) => clsx(
                  'py-1.5 px-5 border-b w-fit border-transparent',
                  selected && '!border-primary text-primary'
                )}>Settings</Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <Section>
                    <UserUpdateForm
                      name={me.name}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      websiteUrl={me.websiteUrl}
                      image={me.image}
                    />
                  </Section>
                </Tab.Panel>
                <Tab.Panel>
                  <Section>
                    <UserUpdateForm
                      name={me.name}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      websiteUrl={me.websiteUrl}
                      image={me.image}
                    />
                  </Section>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Section>
        </>}
      />
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

    const updateMeMutation = api.user.updateMe.useMutation({
      onError: (error) => {
        console.log({ error })
      },
      onSuccess: () => {
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