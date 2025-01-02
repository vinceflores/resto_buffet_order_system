"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, Loader2 } from 'lucide-react'
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Table name is required",
    }),
    seats: z.number().int().min(1, {
        message: "Table must have at least 1 seat",
    }),
    seated: z.number().int().min(0, {
        message: "Seated guests cannot be negative",
    }),
    total: z.number().min(0, {
        message: "Total amount cannot be negative",
    }),
    isReserved: z.date(),
})

interface AddTableFormProps {
    onSuccess?: () => void
}

export function AddTableForm({ onSuccess }: AddTableFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            seats: 1,
            seated: 0,
            total: 0,
            isReserved: new Date(),
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        // Here you would typically send the data to your backend
        // For demonstration, we'll just simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        console.log(values)
        setIsLoading(false)
        toast({
            title: "Table added",
            description: `Table ${values.name} has been added successfully.`,
        })
        form.reset()
        onSuccess?.()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Table Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter table name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name or number of the table.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="seats"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of Seats</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                            </FormControl>
                            <FormDescription>
                                The total number of seats at this table.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="seated"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Currently Seated</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                            </FormControl>
                            <FormDescription>
                                The number of guests currently seated at this table.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    {...field}
                                    onChange={e => field.onChange(parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormDescription>
                                The total bill amount for this table.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isReserved"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Reservation Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date() || date > new Date("2100-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                The date this table is reserved for.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Table
                </Button>
            </form>
        </Form>
    )
}

