import { notFound } from "next/navigation";
import { partnersData } from "@/data/partners";
import {
  PartnerHero,
  PartnerWhoIsThisFor,
  PartnerBenefits,
  PartnerRequirements,
  PartnerHowItWorks,
  PartnerOutcomes,
  PartnerComparison,
  PartnerFAQ,
  PartnerCTA,
} from "@/components/partners/PartnerSections";

export async function generateStaticParams() {
  return Object.keys(partnersData).map((slug) => ({
    slug,
  }));
}

export default async function PartnerConversionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = partnersData[resolvedParams.slug];

  if (!data) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <PartnerHero data={data} />
      <PartnerWhoIsThisFor data={data} />
      <PartnerBenefits data={data} />
      <PartnerRequirements />
      <PartnerHowItWorks />
      <PartnerOutcomes />
      <PartnerComparison />
      <PartnerFAQ />
      <PartnerCTA />
    </main>
  );
}
