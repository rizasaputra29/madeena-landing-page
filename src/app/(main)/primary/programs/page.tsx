import ProgramsContent from "~/components/academic/ProgramsContent";
import PageHeader from "~/components/common/PageHeader";
import PrimaryQuickLinks from "~/components/academic/PrimaryQuickLinks";

export const metadata = {
  title: "Program Unggulan Primary",
  description:
    "Program unggulan Al Madeena Primary: Qiroati, Tahfiz, Bilingual, Cambridge Assessment, dan kurikulum madrasah.",
};

export default function PrimaryProgramsPage() {
  return (
    <main>
      <PageHeader
        title="Program Unggulan Primary"
        subtitle="Membangun Pondasi Akademik dan Karakter Islami"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <ProgramsContent category="primary" />
      <PrimaryQuickLinks />
    </main>
  );
}
