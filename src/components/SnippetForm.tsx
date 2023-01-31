import { type SubmitErrorHandler, type SubmitHandler, useForm, type FieldErrorsImpl, Controller } from "react-hook-form"
import { type SnippetCreateSchema, snippetSchemes } from "../server/api/schemes/schemes"
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from "./common/TextInput"
import Button from "./common/Button"
import CheckboxInput from "./common/CheckboxInput"
import Select from "./common/Select"
import { type Language, LANGUAGES } from "../utils/constants"

const SnippetForm = <
    V extends (data: SnippetCreateSchema) => void,
    E extends (data: Partial<FieldErrorsImpl<SnippetCreateSchema>>) => void,
>({
    onValid,
    onError,
    loading,
    disabled,
    initialData
}: {
    onValid: V,
    onError?: E,
    loading: boolean,
    disabled: boolean
    initialData?: SnippetCreateSchema
}) => {

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<SnippetCreateSchema>({
        resolver: zodResolver(snippetSchemes.create),
        mode: 'onSubmit',
        defaultValues: initialData ? initialData : {
            language: LANGUAGES[0]
        },
        shouldFocusError: false
    })

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
            <p>{errors.content?.message}</p>
            <textarea
                placeholder='Content'
                className='h-[50vh] w-full p-3 mx-auto bg-neutral rounded-sm'
                {...register('content')}
            />

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
                        />
                    </>
                )}

            />

            <Button
                type='submit'
                size='lg'
                className='w-fit'
                loading={loading}
                disabled={disabled}
            >
                Submit
            </Button>
        </form>
    )
}

export default SnippetForm