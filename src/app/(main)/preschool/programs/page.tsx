import ProgramsContent from "~/components/academic/ProgramsContent";
import PageHeader from "~/components/common/PageHeader";
import PreschoolQuickLinks from "~/components/academic/PreschoolQuickLinks";

export const metadata = {
  title: "Program Unggulan Preschool",
  description:
    "Program unggulan Al Madeena Preschool: Qiroati, Tahfiz, Bilingual, dan Islamic Character untuk anak usia 3-5 tahun.",
};

export default function PreschoolProgramsPage() {
  return (
    <main>
      <PageHeader
        title="Program Unggulan Preschool"
        subtitle="Ceria Belajar, Tumbuh Berkarakter"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <ProgramsContent category="preschool" />
      <PreschoolQuickLinks />
    </main>
  );
}
