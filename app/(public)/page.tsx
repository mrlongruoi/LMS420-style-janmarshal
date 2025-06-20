"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

const features: featureProps[] = [
  {
    title: "Các khóa học toàn diện",
    description:
      "Truy cập một loạt các khóa học được quản lý cẩn thận được thiết kế bởi các chuyên gia trong ngành.",
    icon: "📚",
  },
  {
    title: "Học tập tương tác",
    description:
      "Tham gia vào nội dung tương tác, câu đố và bài tập để nâng cao trải nghiệm học tập của bạn.",
    icon: "🎮",
  },
  {
    title: "Theo dõi tiến độ",
    description:
      "Theo dõi tiến trình và thành tích của bạn với phân tích chi tiết và bảng điều khiển cá nhân hóa.",
    icon: "📈",
  },
  {
    title: "Hỗ trợ cộng đồng",
    description:
      "Tham gia vào một cộng đồng sôi nổi của những người học và giảng viên để hợp tác và chia sẻ kiến thức.",
    icon: "👥",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="outline">Tương lai của giáo dục trực tuyến</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Nâng cao kinh nghiệm học tập của bạn
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Khám phá một cách mới để học với học tập tương tác hiện đại của
            chúng tôi Hệ thống quản lý.Truy cập các khóa học chất lượng cao mọi
            lúc, mọi nơi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              className={buttonVariants({
                size: "lg",
              })}
              href="/courses"
            >
              Khám phá các khóa học
            </Link>
            <Link
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              })}
              href="/login"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
