"use client";

import React, { useCallback } from "react";
import { UploadIcon } from "@radix-ui/react-icons";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Dropzone from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { database, storage } from "@/config/firebase";
import debounce from "lodash/debounce";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import useLoading from "@/hooks/useLoading";

const DropZone: React.FC = () => {
  const [loading, setLoading] = useLoading();
  const { user } = useUser();

  const maxFileSize = 20 * 1024 * 1024;

  const debouncedOnDrop = useCallback(
    debounce(async (acceptedFiles: File[]) => {
      if (!user || loading) return;

      try {
        for (const file of acceptedFiles) {
          const toastID = toast.loading("Processing...");
          setLoading(true);
          if (file.size > maxFileSize) {
            toast.error("File size should not exceed 20MB");
            setLoading(false);
            continue;
          }

          await uploadFile(file, toastID);
        }
      } catch (error) {
        console.error("Error during file upload process:", error);
        toast.error("Error during file upload process!");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }, 400),
    [loading, setLoading, user]
  );

  const uploadFile = useCallback(
    async (file: File, toastID: string) => {
      const userCollection = collection(
        database,
        "users",
        user?.id || "",
        "files"
      );

      const docRef = await addDoc(userCollection, {
        userId: user?.id,
        fileName: file.name,
        fullName: user?.fullName,
        profileImg: user?.imageUrl,
        timeStemp: serverTimestamp(),
        type: file.type,
        size: file.size,
      });
      const imgRef = ref(storage, `users/${user?.id}/files/${docRef.id}`);

      await uploadBytes(imgRef, file);

      const downloadURL = await getDownloadURL(imgRef);

      const userPath = user ? `users/${user.id}` : "";

      await updateDoc(doc(database, userPath, "files", docRef.id), {
        downloadURL,
      });

      toast.success("File is Uploaded!", { id: toastID });
    },
    [user]
  );

  return (
    <>
      <div>
        <Toaster
          toastOptions={{
            className:
              "bg-background dark:bg-background border border-border dark:border-border text-foreground dark:text-foreground",
          }}
        />
      </div>
      <Dropzone minSize={0} maxSize={maxFileSize} onDrop={debouncedOnDrop}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <section className="border-b">
            <div
              {...getRootProps()}
              className={cn(
                "grid place-items-center min-h-40 hover:bg-gray-100 dark:hover:bg-gray-300 dark:hover:bg-opacity-5  cursor-pointer",
                isDragActive && "bg-gray-100 dark:bg-gray-300 dark:bg-opacity-5"
              )}
            >
              <input {...getInputProps()} />
              {isDragActive && !isDragReject && <p>Drop the files here ...</p>}
              {!isDragActive && (
                <div className="text-center grid place-items-center">
                  <UploadIcon />
                  <p>
                    Drag and drop some files here, or <br />
                    <b className="underline underline-offset-4 decoration-indigo-500">
                      click to select files
                    </b>
                  </p>
                </div>
              )}
              {isDragReject && <p>File type not accepted</p>}
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
};

export default DropZone;
