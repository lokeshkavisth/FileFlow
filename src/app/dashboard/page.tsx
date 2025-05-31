"use client";

import { database } from "@/config/firebase";
import { useUser } from "@clerk/nextjs";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import DropZone from "@/components/drop-zone";
import Stats from "@/components/stats";
import DataTable from "@/components/ui/data-table";
import { FileData } from "@/types/types";
import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const { user } = useUser();

  const fetchData = async () => {
    const querySnapshot = await getDocs(
      collection(database, `users/${user?.id}/files`)
    );

    const newFilesData: FileData[] = [];
    querySnapshot.forEach((doc) => {
      newFilesData.push({ id: doc.id, ...doc.data() } as FileData);
    });

    setFilesData(newFilesData);
  };

  useEffect(() => {
    fetchData();

    const unsubscribe = onSnapshot(
      collection(database, `users/${user?.id}/files`),
      (snapshot) => {
        const updatedFilesData: FileData[] = [];
        snapshot.forEach((doc) => {
          updatedFilesData.push({ id: doc.id, ...doc.data() } as FileData);
        });
        setFilesData(updatedFilesData);
      }
    );

    return () => unsubscribe();
  }, [user?.id]);

  const handleDeleteFile = async (fileId: string) => {
    if (!user?.id) return;

    await deleteDoc(doc(database, "users", user?.id, "files", fileId));

    setFilesData((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  return (
    <section className="min-h-screen">
      <DropZone />
      <div className="max-w-7xl mx-auto my-20 space-y-10">
        <DataTable data={filesData} onDeleteFile={handleDeleteFile} />
        <Stats data={filesData} />
      </div>
    </section>
  );
};

export default Dashboard;
