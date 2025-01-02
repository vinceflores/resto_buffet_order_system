"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { UploadButton } from "../../../utils/uploadthing"

const formSchema = z.object({
    name: z.string().min(1, { message: "Item name is required" }),
    description: z.string().optional(),
    price: z.number().min(0, { message: "Price must be a positive number" }),
    category: z.string().optional(),
    isAvailable: z.boolean().default(true),
    imageUrl: z.string().url({ message: "Please enter a valid URL" }).optional(),
})

interface AddMenuItemFormProps {
    onSuccess?: () => void
}

export function AddMenuItemForm({ onSuccess }: AddMenuItemFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [files, setFiles] = useState<File[] | null>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "",
            isAvailable: true,
            imageUrl: "",
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
            title: "Menu item added",
            description: `${values.name} has been added to the menu successfully.`,
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
                            <FormLabel>Item Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter item name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter item description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    {...field}
                                    onChange={e => field.onChange(parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter item category" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isAvailable"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Available</FormLabel>
                                <FormDescription>
                                    Is this item currently available on the menu?
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
                <UploadButton
                    appearance={{
                        button: "bg-black text-white p-3 m-0",
                    }}
                    content={{
                        button: "Select Image"
                    }}
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        setFiles(res)
                        console.log("Files: ", res);
                        alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                    }}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Menu Item
                </Button>
            </form>
        </Form>
    )
}

