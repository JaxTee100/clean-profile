import { Suspense } from "react";
import EditprojectSkeleton from "./editprojectSkeleton";
import EditProjectDetails from "./editProjectdetails";


interface EditPageProps {
  params: Promise<{ id: string }>; // 👈 mark as Promise
}
async function EditPage({ params }: EditPageProps) {
   const { id } = await params;
  return (
    <Suspense fallback={<EditprojectSkeleton />}>
      <EditProjectDetails projectId={id} />
    </Suspense>
  );
}

export default EditPage;
