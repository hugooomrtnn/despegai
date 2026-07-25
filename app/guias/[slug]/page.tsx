import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STATIC_GUIDES, getGuideBySlug } from "@/lib/data/staticGuides";
import { GuideView } from "@/components/guides/GuideView";

export function generateStaticParams() {
  return STATIC_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: `Guía de ${guide.destination} — Qué ver, comer y cuándo ir | Despegai`,
    description: `Guía completa para viajar a ${guide.destination}, ${guide.country}: qué ver, gastronomía, mejor época, presupuesto orientativo y cómo llegar desde España.`,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="hero-dark py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <MapPin className="h-3.5 w-3.5" />
            Guía de viaje
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            {guide.flag} {guide.destination}
          </h1>
          <p className="text-slate-300">{guide.country}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/guias" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-500 mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a guías
        </Link>
        <GuideView guide={guide} />
      </div>
    </main>
  );
}
