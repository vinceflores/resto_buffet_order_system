"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
//   FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { MultiUploader } from "../custom-uploadthing-button";
import { useUploadThing } from "@/utils/uploadthing";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const MenuFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Item name is required" }),
  description: z.string().optional(),
  restaurantId: z.string(),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }).optional(),
});

export type MenuFormSchemaType = z.infer<typeof MenuFormSchema>;

interface MenuFormProps {
  onSubmit: (
    restaurantId: string,
    data: MenuFormSchemaType
  ) => void | Promise<void>;
  defaultValues?: MenuFormSchemaType;
  restaurantId: string;
}

const defaultMenu = {
  name: "",
  description: "",
  restaurantId: "",
};

export function MenuForm(props: MenuFormProps) {
  const { defaultValues, restaurantId } = props;
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<MenuFormSchemaType>({
    resolver: zodResolver(MenuFormSchema),
    defaultValues: defaultValues || defaultMenu,
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {},
    onUploadError: () => {},
    onUploadBegin: () => {},
  });

  async function onSubmit(values: MenuFormSchemaType) {
    let uploadedFiles;
    let imageUrls: string[];
    if (files.length > 0) {
      uploadedFiles = await startUpload(files);
      if (uploadedFiles) {
        imageUrls = uploadedFiles?.map((u) => u.appUrl);
        values.imageUrl = imageUrls[0];
      }
    }
    props.onSubmit(restaurantId, values);
  }

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={() => (
            <FormItem>
              <FormLabel>Menu name*</FormLabel>
              <FormControl>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <Input placeholder="Enter menu name" {...field} />
                  )}
                />
              </FormControl>
              {/* <FormMessage>{errors.description?.message}</FormMessage> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={() => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <Textarea placeholder="Enter item description" {...field} />
                  )}
                />
              </FormControl>
              {/* <FormMessage>{errors.description?.message}</FormMessage> */}
            </FormItem>
          )}
        />

        <Label>Upload Image (Optional)</Label>
        <div className="p-4">
          <MultiUploader
            files={files}
            setFiles={setFiles}
            render={
              <div className="cursor-pointer relative">
                {files.length <= 0 && <p>Drag and Drop Image</p>}
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Uploaded Preview ${index + 1}`}
                          width={96}
                          height={96}
                          className="w-full object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-4 py-2 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newFiles = [...files];
                            newFiles.splice(index, 1);
                            setFiles(newFiles);
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
