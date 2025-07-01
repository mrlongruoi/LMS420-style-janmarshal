import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditCourseForm } from "./_components/EditCourseForm";
import { CourseStructure } from "./_components/CourseStructure";

type Params = Promise<{ courseId: string }>;

export default async function EditRoute({ params }: { params: Params }) {
  const { courseId } = await params;
  const data = await adminGetCourse(courseId);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Chỉnh sửa khóa học:{" "}
        <span className="text-primary underline">{data.title}</span>
      </h1>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="course-structure">Cấu trúc khóa học</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>
                Chỉnh sửa thông tin cơ bản về khóa học
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Cấu trúc khóa học</CardTitle>
              <CardDescription>
                Chỉnh sửa cấu trúc khóa học của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseStructure data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
