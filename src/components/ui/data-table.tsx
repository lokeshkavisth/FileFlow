import React from "react";
import FileList from "./file-list";
import { FileData } from "@/types/types";

interface DataTableProps {
  data: FileData[];
  onDeleteFile: (fileId: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onDeleteFile }) => {
  return (
    <section>
      <ul role="listbox">
        <li
          role="listitem"
          className="grid grid-cols-4 sm:grid-cols-5  items-center border-b dark:bg-gray-300 dark:bg-opacity-5 bg-gray-100 py-3 text-xs px-3"
        >
          <span>Type</span>
          <span>Filename</span>
          <span>Date Added</span>
          <span className="hidden sm:block">Size</span>
          <span>Actions</span>
        </li>
        {data?.map((file) => (
          <FileList key={file.id} onDeleteFile={onDeleteFile} {...file} />
        ))}
      </ul>
    </section>
  );
};

export default DataTable;
