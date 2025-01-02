import React from "react";
import { useDropzone } from "@uploadthing/react";
import { useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type MultiUploaderProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  className?: string;
  submit?: () => void;
  render?: React.ReactNode;
};

export function MultiUploader(props: MultiUploaderProps) {
  const { setFiles } = props;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image"]),
  });

  const content = () => {
    if (props.render) {
      return props.render;
    }
    if (props.submit) {
      return (
        <div className="flex flex-col justify-center items-center space-y-2">
          {props.files.length == 0 ? (
            <p className="text-xl ">Drag files here</p>
          ) : (
            <div className="my-2">Files Uploaded = {files.length}</div>
          )}
          <Button onClick={props.submit}> Upload Image </Button>
        </div>
      );
    } else {
      <p>Customize Drag and Drop</p>;
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center border p-4 aspect-video w-3/4 m-2 min-h-[100px]",
        props.className
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {content()}
    </div>
  );
}
