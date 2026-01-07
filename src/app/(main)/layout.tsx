import Navbar from "~/components/common/Navbar";
import dynamic from "next/dynamic";
import { Skeleton } from "~/components/ui/skeleton";
import { AnalyticsTracker } from "~/components/analytics/AnalyticsTracker";
import WhatsAppButton from "~/components/home/WhatsappButton";

const Footer = dynamic(() => import("~/components/common/Footer"), {
  loading: () => <Skeleton className="h-[400px] w-full" />,
});

export default function LandingPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <AnalyticsTracker />
      {children}
      <WhatsAppButton />
      <Footer />
    </>
  );
}
