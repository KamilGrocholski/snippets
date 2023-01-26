import { type SubmitErrorHandler, type SubmitHandler, useForm, type FieldErrorsImpl, Controller } from "react-hook-form"
import { type SnippetCreateSchema, snippetSchemes } from "../server/api/schemes/schemes"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from "react"
import TextInput from "./common/TextInput"
import Button from "./common/Button"
import CheckboxInput from "./common/CheckboxInput"
import Select from "./common/Select"
import { type Language, LANGUAGES } from "../utils/constants"
import generateRandomString from "../utils/generateRandomString"

const SnippetForm = <
    V extends (data: SnippetCreateSchema) => void,
    E extends (data: Partial<FieldErrorsImpl<SnippetCreateSchema>>) => void
>({
    onValid,
    onError
}: {
    onValid: V,
    onError?: E
}) => {
    const [withPassword, setWithPassword] = useState(false)

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<SnippetCreateSchema>({
        resolver: zodResolver(snippetSchemes.create),
        mode: 'onSubmit',
        defaultValues: {
            language: LANGUAGES[0]
        },
        shouldFocusError: false
    })

    useMemo(() => {
        if (withPassword) {
            const newPassword = generateRandomString(10)
            setValue('password', newPassword)
            return
        }
        setValue('password', undefined)
    }, [withPassword, setValue])

    const handleOnValid: SubmitHandler<SnippetCreateSchema> = (data, e) => {
        e?.preventDefault()
        onValid(data)
    }

    const handleOnError: SubmitErrorHandler<SnippetCreateSchema> | undefined = (data, e) => {
        e?.preventDefault()
        onError && onError(data)
    }

    return (
        <form
            className='w-full flex flex-col space-y-3'
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(handleOnValid, handleOnError)}
        >
            <textarea
                placeholder='Content'
                className='h-[50vh] w-full p-3 mx-auto bg-neutral rounded-sm'
                {...register('content')}
            />
            <p>{errors.content?.message}</p>

            <TextInput
                label='Title'
                placeholder='Title'
                errorMessage={errors.title?.message}
                {...register('title')}
            />

            <Controller
                control={control}
                name='language'
                render={({ field }) => (
                    <Select
                        label='Language'
                        errorMessage={errors.language?.message}
                        selected={field.value as Language}
                        setSelected={field.onChange}
                        options={LANGUAGES}
                        extractKey={language => language}
                        extractValue={language => language}
                    />
                )}
            />

            <Controller
                control={control}
                defaultValue={true}
                name='isPublic'
                render={({ field }) => (
                    <>
                        <CheckboxInput
                            label='Public'
                            checked={field.value}
                            ref={field.ref}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            errorMessage={errors.isPublic?.message}
                        />
                    </>
                )}

            />
            <CheckboxInput
                label='Password'
                checked={withPassword}
                onChange={() => setWithPassword(prev => !prev)}
            />

            {withPassword ?
                <TextInput
                    placeholder='Password'
                    sizeTotal="md"
                    {...register('password')}
                /> : null
            }
            <p>{errors.password?.message}</p>

            <Button type='submit' size='lg'>
                Submit
            </Button>
        </form>
    )
}

export default SnippetForm