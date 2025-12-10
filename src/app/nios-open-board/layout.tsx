import { Metadata } from "next";

export const metadata: Metadata = {
  title: "10वीं/12वीं NIOS Open Board Admission | ULP Academy Gurugram",
  description:
    "NIOS और Open Board से 10वीं/12वीं पास करें। BA, B.Com, B.Sc, B.Ed और अन्य सभी Degree Courses में Direct Admission। Call Now: 8447448370",
};

export default function NIOSOpenBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
