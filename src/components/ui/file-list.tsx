"use client";

import { FileData } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { DownloadIcon } from "@radix-ui/react-icons";
import moment from "moment";
import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { MdDelete } from "react-icons/md";
import { PiClipboard } from "react-icons/pi";
import { Button, buttonVariants } from "./button";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface FileListProps extends FileData {
  onDeleteFile: (id: string) => void;
}

const FileList: React.FC<FileListProps> = React.memo((props) => {
  const { fileName, type, downloadURL, size, onDeleteFile, timeStemp, id } =
    props;

  const { user } = useUser();

  const fileType = type.split("/")[1];
  let fileSizeMB = (size / (1024 * 1024)).toFixed(2);

  const formattedDate = moment
    .unix(timeStemp?.seconds || 0)
    .format("YYYY-MM-DD");

  const deleteFile = async () => {
    if (!user) return;

    onDeleteFile(id);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(downloadURL as string);
    toast.success("Copied to clipboard");
  };

  return (
    <li
      role="listitem"
      className="grid grid-cols-4 sm:grid-cols-5 items-center border-b hover:bg-gray-100 dark:hover:bg-gray-300 dark:hover:bg-opacity-5 py-1 text-xs px-3"
    >
      <span className="w-4">
        <FileIcon
          extension={fileType || ""}
          {...(defaultStyles as any)[fileType || ""]}
        />
      </span>
      <p className="truncate w-28">{fileName.split(".")[0]}</p>
      <p>{formattedDate}</p>
      <p className="hidden sm:block">{fileSizeMB} kb</p>

      <div>
        <a
          role="link"
          href={downloadURL}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        >
          <DownloadIcon />
        </a>
        <Button onClick={deleteFile} variant={"ghost"} size={"icon"}>
          <MdDelete />
        </Button>
        <Button onClick={copyToClipboard} variant={"ghost"} size={"icon"}>
          <PiClipboard />
        </Button>
      </div>
    </li>
  );
});

FileList.displayName = "FileList";

export default FileList;
