import { type SubmitErrorHandler, type SubmitHandler, useForm, type FieldErrorsImpl, Controller } from "react-hook-form"
import { type SnippetCreateSchema, snippetSchemes } from "../server/api/schemes/schemes"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from "react"
import TextInput from "./common/TextInput"

const selectOptions = [
    'TS',
    'JS'
];

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
        shouldFocusError: false
    })

    useMemo(() => {
        if (withPassword) {
            setValue('password', 'eqwe123')
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
            className='w-full'
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(handleOnValid, handleOnError)}
        >
            <textarea
                placeholder='Content'
                className='h-[50vh] w-full p-3 mx-auto bg-base-200'
                {...register('content')}
            />
            <p>{errors.content?.message}</p>

            <TextInput
                {...register('title')}
                placeholder='Title'
            />
            <p>{errors.title?.message}</p>

            <TextInput
                placeholder='Folder id'
                {...register('folderId')}
            />
            <p>{errors.folderId?.message}</p>

            <Controller
                control={control}
                defaultValue="TS"
                name='folderId'
                render={({ field }) => (
                    <select
                        className='select select-primary select-sm'
                        defaultValue={field.value}
                        onChange={field.onChange}
                    >
                        {selectOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                )}
            />

            <Controller
                control={control}
                defaultValue={true}
                name='isPublic'
                render={({ field }) => (
                    <>
                        <input
                            type='checkbox'
                            className='checkbox checkbox-primary'
                            checked={field.value}
                            ref={field.ref}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                        />
                        <p>{errors.isPublic?.message}</p>
                    </>
                )}

            />
            <label>Password</label>
            <input className='checkbox checkbox-primary' type='checkbox' checked={withPassword} onChange={() => setWithPassword(prev => !prev)} />

            {withPassword ?
                <TextInput
                    placeholder='Password'
                    sizeTotal="md"
                    className='w-24'
                    {...register('password')}
                /> : null
            }
            <p>{errors.password?.message}</p>

            <button type='submit'>
                Submit
            </button>
        </form>
    )
}

export default SnippetForm