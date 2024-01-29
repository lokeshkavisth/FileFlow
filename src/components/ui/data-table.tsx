import React from "react";
import FileList from "./file-list";

const DataTable = ({ data, onDeleteFile }) => {
  return (
    <section>
      <ul>
        <li className="grid grid-cols-6 items-center border-b dark:bg-gray-300 dark:bg-opacity-5 bg-gray-100 py-3 text-xs px-3">
          <span>Type</span>
          <span>Filename</span>
          <span>Date Added</span>
          <span>Size</span>
          <span>Link</span>
          <span>Delete</span>
        </li>
        {data?.map((file) => (
          <FileList key={file.id} onDeleteFile={onDeleteFile} {...file} />
        ))}
      </ul>
    </section>
  );
};

export default DataTable;
