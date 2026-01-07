import ActivitiesContent from "~/components/academic/ActivitiesContent";
import PageHeader from "~/components/common/PageHeader";
import PrimaryQuickLinks from "~/components/academic/PrimaryQuickLinks";

export const metadata = {
  title: "Kegiatan Primary",
  description:
    "Kegiatan akademik dan karakter Al Madeena Primary untuk mengembangkan potensi siswa.",
};

export default function PrimaryActivitiesPage() {
  return (
    <main>
      <PageHeader
        title="Kegiatan Primary"
        subtitle="Mengembangkan Potensi Akademik dan Karakter"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      <ActivitiesContent category="primary" />
      <PrimaryQuickLinks />
    </main>
  );
}
