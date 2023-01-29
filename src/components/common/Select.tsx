import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment } from "react"
import UiIcons from "../../assets/UiIcons"
import { type Keys } from "../../types/helpers"

interface SelectProps<T extends readonly (string | undefined)[] | (string | undefined)[], O = T[number]> {
    options: T
    selected: O
    setSelected: (option: O) => void
    extractValue: (option: O) => string
    extractKey: (option: O, index: number) => string | number
    size?: Keys<typeof SELECT_SIZE>
    label?: string
    errorMessage?: string
}

const SELECT_SIZE = {
    xs: 'text-xs pl-2.5 py-1.5 rounded',
    sm: 'text-sm pl-3 py-2 leading-4 rounded',
    md: 'text-sm pl-4 py-2 rounded',
    lg: 'text-md pl-4 py-2 rounded-md'
} as const

const Select = <T extends readonly (string | undefined)[] | (string | undefined)[]>({
    size = 'md',
    options,
    selected,
    setSelected,
    extractValue,
    extractKey,
    label,
    errorMessage
}: SelectProps<T>) => {
    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative w-48 z-30">
                <Listbox.Label className='flex flex-col'>
                    <span>{label}</span>
                    <span className='text-sm text-error'>{errorMessage}</span>
                </Listbox.Label>
                <Listbox.Button
                    className={clsx(
                        'cursor-pointer relative w-full bg-neutral pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2',
                        SELECT_SIZE[size]
                    )}
                >
                    <span className="block truncate">{extractValue(selected)}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {UiIcons.chevronDown}
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overscroll-none overflow-auto rounded-md bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((option, optionIndex) => (
                            <Listbox.Option
                                key={extractKey(option, optionIndex)}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-zinc-900 text-primary' : 'text-white'
                                    }`
                                }
                                value={extractValue(option)}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {extractValue(option)}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                {UiIcons.check}
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}

export default Select