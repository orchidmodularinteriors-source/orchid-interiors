import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { getDesignLibrary, getProjects, getServices } from "@/lib/content";
import { resolveProjectAsset } from "@/lib/project-assets";

const serviceCategories = [
  { slug: "modular-kitchen", title: "Modular Kitchen", category: "kitchen" },
  { slug: "bed-room", title: "Bed Room", category: "bed-room" },
  { slug: "living-rooms", title: "Living Rooms", category: "living-room" },
  { slug: "dining-area", title: "Dining Area", category: "dining-room" },
  { slug: "pooja-units", title: "Pooja Units", category: "pooja-units" },
  {
    slug: "office-workstation",
    title: "Office and Workstation",
    category: "office-room",
  },
  {
    slug: "aluminium-doors-partitions",
    title: "Aluminium Doors & Partitions",
    category: "partition-wall",
  },
  {
    slug: "institutions",
    title: "Institutions",
    projectSlug: "kongu-engineering-college",
    href: "/projects/kongu-engineering-college",
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    category: "hotel-room",
    projectSlug: "sangeetha-dental",
    href: "/projects/sangeetha-dental",
  },
];

export const metadata: Metadata = {
  title: "Interior Design Services in Coimbatore",
  description:
    "Explore modular kitchens, bedrooms, living rooms, workspaces, and more from Orchid Interiors, serving Coimbatore and nearby Tamil Nadu communities.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: "Interior Design Services in Coimbatore",
    description:
      "Explore modular kitchens, bedrooms, living rooms, workspaces, and more from Orchid Interiors, serving Coimbatore and nearby Tamil Nadu communities.",
    url: "/services",
    images: [
      { url: "/images/services.jpg", alt: "Orchid Interiors design services" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Services in Coimbatore",
    description:
      "Explore modular kitchens, bedrooms, living rooms, workspaces, and more from Orchid Interiors, serving Coimbatore and nearby Tamil Nadu communities.",
    images: ["/images/services.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [designCategories, existingServices, projects] = await Promise.all([
    getDesignLibrary(),
    getServices(),
    getProjects(),
  ]);
  const services = serviceCategories.map((service) => {
    const category = service.category
      ? designCategories.find((item) => item.slug === service.category)
      : undefined;
    const project = service.projectSlug
      ? projects.find((item) => item.slug === service.projectSlug)
      : undefined;
    const existingService = service.projectSlug
      ? undefined
      : existingServices.find((item) =>
          item.title.toLowerCase().includes("institution"),
        );

    return {
      slug: service.slug,
      title: service.title,
      image:
        (project ? resolveProjectAsset(project.image) : undefined) ??
        category?.images[0] ??
        existingService?.image ??
        "/images/projects/4.png",
      href:
        service.href ??
        (category ? `/design-library/${category.slug}` : "/design-library"),
    };
  });

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Orchid Interiors"
          image="/images/services.jpg"
          imageAlt="Interior design by Orchid Interiors"
          title="Interior Design Services"
        />
        <div className="pt-8 sm:pt-10">
          <Services
            layout="grid"
            showHeading={false}
            services={services}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
