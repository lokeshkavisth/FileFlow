"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Button } from "./button";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { FileData } from "@/types/types";

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
  return (
    <li
      role="listitem"
      className="grid grid-cols-6 items-center border-b hover:bg-gray-100 dark:hover:bg-gray-300 dark:hover:bg-opacity-5 py-1 text-xs px-3"
    >
      <span className="w-4">
        <FileIcon
          extension={fileType || ""}
          {...(defaultStyles as any)[fileType || ""]}
        />
      </span>
      <p className="truncate w-28">{fileName.split(".")[0]}</p>
      <p>{formattedDate}</p>
      <p>{fileSizeMB} kb</p>
      <div>
        <a
          role="link"
          href={downloadURL}
          className="flex items-center gap-1 hover:underline"
        >
          Download <DownloadIcon />
        </a>
      </div>
      <Button
        role="button"
        onClick={deleteFile}
        className="max-w-max px-3"
        variant={"outline"}
      >
        <MdDelete />
      </Button>
    </li>
  );
});

FileList.displayName = "FileList";

export default FileList;
