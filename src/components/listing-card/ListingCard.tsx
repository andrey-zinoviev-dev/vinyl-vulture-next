import { ListingType } from "./listing-type";
import Link from "next/link";

export function ListingCard({ children, href }: ListingType) {
    return <Link href={href} className="listing-card">{children}</Link>;
}