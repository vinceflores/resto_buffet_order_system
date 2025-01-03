"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LocationSelector from "@/components/ui/location-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const CreateRestauSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  maxTables: z.number().min(1),
  cuisine: z.string().min(1),
  website: z.string().optional(),
  phone: z.string(),
  email: z.string().optional(),
  location: z.array(
    z.object({
      id: z.string().optional(),
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      zipCode: z.string(),
    })
  ),
});

const initialAddress = {
  street: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
};

const defaultCreateRestauValues: z.infer<typeof CreateRestauSchema> = {
  name: "",
  description: "",
  maxTables: 1,
  cuisine: "",
  website: "",
  phone: "",
  email: "",
  location: [initialAddress],
};

export type CreateRestaurantFormSubmitParams = z.infer<
  typeof CreateRestauSchema
>;

export type CreateRestaurantFormProps = {
  initialData?: CreateRestaurantFormSubmitParams;
  onSubmit: (values: CreateRestaurantFormSubmitParams) => Promise<void>;
};

export default function CreateRestaurantForm(props: CreateRestaurantFormProps) {
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");

  const form = useForm<CreateRestaurantFormSubmitParams>({
    resolver: zodResolver(CreateRestauSchema),
    defaultValues: props.initialData || defaultCreateRestauValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "location",
  });

  function onSubmit(values: CreateRestaurantFormSubmitParams) {
    try {
      props.onSubmit(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the name of your Restaurant"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                  placeholder="Describe you Restaurant"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Description of your Restaurant</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="maxTables"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Number of Tables = {value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={100}
                      step={5}
                      defaultValue={[5]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="cuisine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fast food, Italian, chineese"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The main cuisine you serve</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>website</FormLabel>
              <FormControl>
                <Input placeholder="https://" type="text" {...field} />
              </FormControl>
              <FormDescription>
                The url of your website (if applicable)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder="555-123-4567"
                      {...field}
                      defaultCountry="CA"
                    />
                  </FormControl>
                  <FormDescription>Enter your phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="business@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Business Email, a way for customers or business partners
                    reach you
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Addresses */}
        <div>
          <div className="flex mb-2 items-center justify-between">
            <h2 className="font-bold text-xl">Addresses</h2>
            <Button onClick={() => append(initialAddress)} type="button">
              Add Address
            </Button>
          </div>
          {fields.map((field, index: number) => (
            <div key={field.id} className="space-y-2 ">
              <h2 className="font-medium mb-1">Address {index + 1}</h2>
              <p>Select a Country</p>

              <Input
                {...form.register(`location.${index}.country` as const)}
                className="hidden"
              />
              <Input
                {...form.register(`location.${index}.state` as const)}
                className="hidden"
              />

              <LocationSelector
                onCountryChange={(country) => {
                  form.setValue(
                    `location.${index}.country` as const,
                    country?.name || ""
                  );
                }}
                onStateChange={(state) => {
                  form.setValue(
                    `location.${index}.state` as const,
                    state?.name || ""
                  );
                }}
              />

              <Label>Street</Label>
              <Input
                {...form.register(`location.${index}.street` as const)}
                placeholder="Street Address"
              />

              <Label>City</Label>
              <Input
                {...form.register(`location.${index}.city` as const)}
                placeholder="City"
              />

              <Label>ZIP Code</Label>
              <Input
                {...form.register(`location.${index}.zipCode` as const)}
                placeholder="ZIP Code"
              />

              <div className="flex justify-end items-center">
                <Button
                  variant="outline"
                  onClick={() => remove(index)}
                  type="button"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
