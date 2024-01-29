"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Button } from "./button";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { useUser } from "@clerk/nextjs";

const FileList = (props) => {
  const { fileName, type, downloadURL, size, onDeleteFile, timeStemp, id } =
    props;

  const { user } = useUser();

  const fileType = type.split("/")[1];
  let fileSizeMB = String((size / 1024) * 2).split(".")[0];

  const timestampMoment = moment
    .unix(timeStemp?.seconds)
    .add(timeStemp?.nanoseconds / 1e9, "seconds");

  const formattedDate = timestampMoment.format("YYYY-MM-DD");

  const deleteFile = async () => {
    if (!user) return;

    onDeleteFile(id);
  };
  return (
    <li className="grid grid-cols-6 items-center border-b hover:bg-gray-100 dark:hover:bg-gray-300 dark:hover:bg-opacity-5 py-1 text-xs px-3">
      <span className="w-4">
        <FileIcon extension="docx" {...defaultStyles[fileType]} />
      </span>
      <p className="truncate w-28">{fileName.split(".")[0]}</p>
      <p>{formattedDate}</p>
      <p>{fileSizeMB} kb</p>
      <div>
        <a
          href={downloadURL}
          className="flex items-center gap-1 hover:underline"
        >
          Download <DownloadIcon />
        </a>
      </div>
      <Button className="max-w-max px-3" variant={"outline"}>
        <MdDelete onClick={deleteFile} />
      </Button>
    </li>
  );
};

export default FileList;
