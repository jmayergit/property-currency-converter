import { useState, type ComponentProps } from 'react'
import {
    Controller,
    useForm,
    type SubmitHandler,
    type Control,
} from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

interface CounterInputs {
    oku: number
    man: number
    ichi: number
}

const convertJapaneseCountersToInteger = ({ oku, man, ichi }: CounterInputs) =>
    oku * 100_000_000 + man * 10_000 + ichi

const ControllerPlus = <
    T extends string | number | readonly string[] | undefined,
    U
>({
    control,
    transform,
    name,
    defaultValue,
}: {
    control: Control<CounterInputs>
    transform: {
        input: (value: typeof NaN | number) => T
        output: (e: React.ChangeEvent<HTMLInputElement>) => U
    }
    name: 'oku' | 'man' | 'ichi'
    defaultValue: number
}) => (
    <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        render={({ field }) => (
            <Input
                className="max-w-20"
                onChange={(e) => field.onChange(transform.output(e))}
                value={transform.input(field.value)}
                placeholder="0"
            />
        )}
    />
)

const App = ({ ex }: { ex: number }) => {
    const { handleSubmit, control } = useForm<CounterInputs>()

    const [usdAmount, setUsdAmount] = useState('0')

    const onSubmit: SubmitHandler<CounterInputs> = (data) =>
        setUsdAmount(
            usdFormatter.format(convertJapaneseCountersToInteger(data) * ex)
        )

    return (
        <div>
            <form
                className="flex flex-col gap-2 justify-start my-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Label className="flex items-center justify-between w-24">
                    <ControllerPlus<string, number>
                        transform={{
                            input: (value) =>
                                isNaN(value) || value === 0
                                    ? ''
                                    : value.toString(),
                            output: (e) => {
                                const output = parseInt(e.target.value, 10)
                                return isNaN(output) ? 0 : output
                            },
                        }}
                        control={control}
                        name="oku"
                        defaultValue={0}
                    />
                    億
                </Label>
                <Label className="flex items-center justify-between w-24">
                    <ControllerPlus<string, number>
                        transform={{
                            input: (value) =>
                                isNaN(value) || value === 0
                                    ? ''
                                    : value.toString(),
                            output: (e) => {
                                const output = parseInt(e.target.value, 10)
                                return isNaN(output) ? 0 : output
                            },
                        }}
                        control={control}
                        name="man"
                        defaultValue={0}
                    />
                    万
                </Label>
                <Label className="flex items-center justify-between w-24">
                    <ControllerPlus<string, number>
                        transform={{
                            input: (value) =>
                                isNaN(value) || value === 0
                                    ? ''
                                    : value.toString(),
                            output: (e) => {
                                const output = parseInt(e.target.value, 10)
                                return isNaN(output) ? 0 : output
                            },
                        }}
                        control={control}
                        name="ichi"
                        defaultValue={0}
                    />
                    円
                </Label>

                <Button className="max-w-20" type="submit">
                    Submit
                </Button>
            </form>

            <p>USD: {usdAmount}$</p>
        </div>
    )
}

export default App
