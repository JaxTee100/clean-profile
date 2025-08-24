import { Suspense } from "react";
import EditprojectSkeleton from "./editprojectSkeleton";
import EditProjectDetails from "./editProjectdetails";

interface EditPageProps {
  params: {
    id: string;
  };
}

function EditPage({ params }: EditPageProps) {
  return (
    <Suspense fallback={<EditprojectSkeleton />}>
      <EditProjectDetails projectId={params.id} />
    </Suspense>
  );
}

export default EditPage;
