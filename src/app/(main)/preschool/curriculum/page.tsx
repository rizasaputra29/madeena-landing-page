// src/app/(main)/preschool/curriculum/page.tsx

import PageHeader from "~/components/common/PageHeader";
import CurriculumContent from "~/components/academic/CurriculumContent";
import { curriculumData } from "~/data/academic/curriculumData";
import PreschoolQuickLinks from "~/components/academic/PreschoolQuickLinks";

export const metadata = {
  title: "Kurikulum Preschool - Al Madeena",
  description:
    "Program pendidikan Preschool Al Madeena dengan fokus pada Islamic Character Building dan Fun Learning.",
};

const headerImageUrl =
  "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp";

export default function PreschoolCurriculumPage() {
  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Kurikulum Preschool"
        subtitle="Kami fokus pada penanaman karakter Islami, pengenalan bahasa Inggris, dan proses belajar yang menyenangkan untuk fondasi terbaik anak Anda."
        imageUrl={headerImageUrl}
      />

      <CurriculumContent
        level="preschool"
        data={curriculumData.preschool}
        title=""
        subtitle=""
        visualAlt="Gambar anak-anak preschool sedang bermain di kelas"
        visualImage="https://res.cloudinary.com/imagehandlers/image/upload/v1767449546/DSCF7742_fiygc4.jpg"
      />
      <PreschoolQuickLinks />
    </div>
  );
}