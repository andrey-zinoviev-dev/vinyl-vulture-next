import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CollectionHero, getCollectionBySlug } from "@/features/collections";
import styles from "./page.module.css";

type CollectionPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({
    params,
}: CollectionPageProps): Promise<Metadata> {
    const { slug } = await params;
    const collection = await getCollectionBySlug(slug);

    if (!collection) {
        return { title: "Коллекция не найдена" };
    }

    return {
        title: collection.title,
        description: collection.description,
    };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { slug } = await params;
    const collection = await getCollectionBySlug(slug);

    if (!collection) {
        notFound();
    }

    const releases = collection.items.map((item) => item.release);
    const coverArt = collection.coverArt ?? releases[0]?.coverArt ?? null;

    return (
        <div className={styles.page}>
            <SiteHeader />
            <main className={styles.main}>
                <CollectionHero
                    title={collection.title}
                    description={collection.description}
                    label={collection.label}
                    coverArt={coverArt}
                    releases={releases}
                />
            </main>
            <Footer />
        </div>
    );
}
