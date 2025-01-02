"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { PhoneInput } from "@/components/ui/phone-input";
import LocationSelector from "@/components/ui/location-input";

export const CreateRestauSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  maxTables: z.number().min(1),
  cuisine: z.string().min(1),
  website: z.string().optional(),
  phone: z.string(),
  email: z.string().optional(),
  address: z.string().min(1).optional(),
  address_2: z.string().optional(),
  country_state: z.tuple([z.string(), z.string().optional()]),
});

const defaultCreateRestauValues: z.infer<typeof CreateRestauSchema> = {
  id: "",
  name: "",
  description: "",
  maxTables: 1,
  cuisine: "",
  website: "",
  phone: "",
  email: "",
  address: "",
  address_2: "",
  country_state: ["", ""],
};

export type CreateRestaurantFormSubmitParams = {
  name: string;
  description: string;
  maxTables: number;
  phone?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  cuisine?: string;
  location: {
    city: string;
    street: string;
    country: string;
    state: string;
  }[];
};

export type CreateRestaurantFormProps = {
  initialData?: z.infer<typeof CreateRestauSchema>;
  onSubmit: (values: CreateRestaurantFormSubmitParams) => Promise<void>;
};

export default function CreateRestaurantForm(props: CreateRestaurantFormProps) {
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const form = useForm<z.infer<typeof CreateRestauSchema>>({
    resolver: zodResolver(CreateRestauSchema),
    defaultValues: props.initialData || defaultCreateRestauValues,
  });

  function onSubmit(values: z.infer<typeof CreateRestauSchema>) {
    try {
      const location = {
        street: values.address || "",
        city: city || "",
        state: values.country_state[1] || "",
        country: values.country_state[0] || "",
      };
      // console.log({ values, location });
      props.onSubmit({
        description: values.description,
        name: values.name,
        maxTables: values.maxTables,
        phone: values.phone,
        email: values.email,
        website: values.website,
        cuisine: values.cuisine,
        location: [location],
      });
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

        <FormField
          control={form.control}
          name="country_state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Country</FormLabel>
              <FormControl>
                <LocationSelector
                  onCountryChange={(country) => {
                    setCountryName(country?.name || "");
                    form.setValue(field.name, [
                      country?.name || "",
                      stateName || "",
                    ]);
                  }}
                  onStateChange={(state) => {
                    setStateName(state?.name || "");
                    form.setValue(field.name, [
                      form.getValues(field.name)[0] || "",
                      state?.name || "",
                    ]);
                  }}
                />
              </FormControl>
              <FormDescription>
                If your country has states, it will be appear after selecting
                country
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h2>City</h2>
          <Input
            placeholder="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address 1</FormLabel>
              <FormControl>
                <Input
                  placeholder="number, street, apt/suite"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address_2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address 2</FormLabel>
              <FormControl>
                <Input
                  placeholder="number, street, apt/suite"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
