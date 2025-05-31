import { FileData } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Stats = ({ data }: { data: FileData[] }) => {
  const totalStorageUsed = data.reduce((acc, { size }) => acc + size, 0);
  const convertToMB = (totalStorageUsed / 1024).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Files Uploaded</CardTitle>
          <CardDescription>Total files uploaded</CardDescription>
        </CardHeader>
        <CardContent>{data.length} Files</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Storage Used</CardTitle>
          <CardDescription>Total storage used</CardDescription>
        </CardHeader>
        <CardContent>{convertToMB} MB</CardContent>
      </Card>
    </div>
  );
};

export default Stats;
