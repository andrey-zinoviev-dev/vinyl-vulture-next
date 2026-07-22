import "dotenv/config";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  Genre,
  ItemCondition,
  LotStatus,
  MediaType,
  PrismaClient,
  UserRole,
  type Prisma,
} from "../src/generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const DEV_PASSWORD = "password123";
const PLACEHOLDER_COVER = "/placeholders/release-cover.svg";
const PHANTOM_LIBERTY_COVER =
  "https://i.pinimg.com/1200x/7e/97/bb/7e97bbab200333850c73197d0528419e.jpg";

type TrackInput = { title: string; duration: string };

/** Same A/B position style for every media type (temporary). */
function toTracklist(tracks: TrackInput[]): Prisma.InputJsonValue {
  const mid = Math.ceil(tracks.length / 2);
  return tracks.map((track, index) => ({
    title: track.title,
    duration: track.duration,
    position: index < mid ? `A${index + 1}` : `B${index - mid + 1}`,
  }));
}

type ReleaseSeed = {
  title: string;
  artist: string;
  coverArt: string;
  genre: Genre;
  mediaType: MediaType;
  label?: string;
  catNumber?: string;
  releaseYear?: number;
  tracklist: TrackInput[];
};

const NEW_RELEASES: ReleaseSeed[] = [
  {
    title: "Cave World",
    artist: "Viagra Boys",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.PUNK,
    mediaType: MediaType.VINYL,
    label: "Year0001",
    releaseYear: 2022,
    tracklist: [
      { title: "Baby Criminal", duration: "4:39" },
      { title: "Cave Hole", duration: "0:39" },
      { title: "Troglodyte", duration: "3:19" },
      { title: "Punk Rock Loser", duration: "3:57" },
      { title: "Creepy Crawlers", duration: "3:09" },
      { title: "The Cognitive Trade-Off Hypothesis", duration: "3:55" },
      { title: "Globe Earth", duration: "0:41" },
      { title: "Ain't No Thief", duration: "3:59" },
      { title: "Big Boy", duration: "5:30" },
      { title: "ADD", duration: "3:37" },
      { title: "Human Error", duration: "0:29" },
      { title: "Return to Monke", duration: "6:28" },
    ],
  },
  {
    title: "Wayward Fire",
    artist: "The Chain Gang of 1974",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.ELECTRONIC,
    mediaType: MediaType.CD,
    label: "Modern Art",
    releaseYear: 2011,
    tracklist: [
      { title: "Stop", duration: "4:04" },
      { title: "Devil Is a Lady", duration: "5:49" },
      { title: "Hold On", duration: "8:09" },
      { title: "Heartbreakin' Scream", duration: "4:51" },
      { title: "Taste of Heaven", duration: "5:15" },
      { title: "Matter of Time", duration: "5:17" },
      { title: "Undercover", duration: "4:28" },
      { title: "Teenagers", duration: "5:40" },
      { title: "Ethical Drugs", duration: "5:06" },
      { title: "Tell Me", duration: "4:58" },
      { title: "Don't Walk Away", duration: "6:09" },
    ],
  },
  {
    title: "ANTIHERO",
    artist: "Neverlove",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.METAL,
    mediaType: MediaType.CASSETTE,
    label: "OSUMA",
    releaseYear: 2023,
    tracklist: [
      { title: "Королева", duration: "4:26" },
      { title: "Оставаться счастливо", duration: "2:38" },
      { title: "Одержим", duration: "2:31" },
      { title: "Спасти меня", duration: "3:40" },
      { title: "Самая дрянная", duration: "3:14" },
      { title: "Антигерой", duration: "3:38" },
      { title: "Диагноз", duration: "2:33" },
      { title: "От любви к искусству", duration: "2:17" },
    ],
  },
  {
    title: "Conflict DLC",
    artist: "HEALTH",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.ELECTRONIC,
    mediaType: MediaType.VINYL,
    label: "Loma Vista",
    releaseYear: 2025,
    tracklist: [
      { title: "Ordinary Loss", duration: "3:53" },
      { title: "Burn the Candles", duration: "3:14" },
      { title: "Vibe Cop", duration: "2:53" },
      { title: "Trash Decade", duration: "2:35" },
      { title: "Torture II", duration: "1:07" },
      { title: "Antidote", duration: "3:04" },
      { title: "Darkage", duration: "3:11" },
      { title: "Shred Envy", duration: "3:43" },
      { title: "You Died", duration: "3:24" },
      { title: "Thought Leader", duration: "3:22" },
      { title: "Don't Kill Yourself", duration: "2:35" },
      { title: "Wasted Years", duration: "6:20" },
    ],
  },
  {
    title: "Glimmer of God",
    artist: "Jean Dawson",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.POP,
    mediaType: MediaType.CD,
    label: "Handwritten",
    releaseYear: 2024,
    tracklist: [
      { title: "Darlin'", duration: "3:12" },
      { title: "Black Sugar", duration: "2:58" },
      { title: "Play Dead", duration: "3:05" },
      { title: "Houston", duration: "3:40" },
      { title: "Paranoid Echo", duration: "2:44" },
      { title: "Die for Me", duration: "3:22" },
      { title: "Slow Heavy Ecstasy", duration: "3:18" },
      { title: "The Boy and the Swan", duration: "2:51" },
      { title: "Murciélago", duration: "3:09" },
      { title: "You're Bleeding Everywhere", duration: "3:33" },
      { title: "200 Cigarettes", duration: "2:47" },
      { title: "P4IN", duration: "3:01" },
      { title: "Bubba", duration: "2:39" },
      { title: "Electric Children", duration: "3:15" },
      { title: "Kollapse", duration: "3:28" },
    ],
  },
  {
    title: "Out of Touch",
    artist: "Brothertiger",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.ELECTRONIC,
    mediaType: MediaType.CASSETTE,
    label: "Brothertiger Music",
    releaseYear: 2015,
    tracklist: [
      { title: "Beyond the Infinite", duration: "4:10" },
      { title: "Wake", duration: "3:45" },
      { title: "Fall Apart", duration: "4:02" },
      { title: "Out of Touch", duration: "3:58" },
      { title: "Engulfed", duration: "4:20" },
      { title: "Jungle Floor", duration: "3:55" },
      { title: "High Tide", duration: "4:08" },
      { title: "Grenada", duration: "3:40" },
      { title: "Upon Viridian Waterways", duration: "4:15" },
      { title: "Drift", duration: "3:50" },
    ],
  },
  {
    title: "Technology",
    artist: "Don Broco",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.ROCK,
    mediaType: MediaType.VINYL,
    label: "SharpTone",
    releaseYear: 2018,
    tracklist: [
      { title: "Technology", duration: "3:36" },
      { title: "Stay Ignorant", duration: "3:15" },
      { title: "T-Shirt Song", duration: "4:03" },
      { title: "Come Out to LA", duration: "3:29" },
      { title: "Pretty", duration: "3:35" },
      { title: "The Blues", duration: "3:15" },
      { title: "Tightrope", duration: "3:33" },
      { title: "Everybody", duration: "3:20" },
      { title: "Greatness", duration: "3:21" },
      { title: "Porkies", duration: "4:09" },
      { title: "Got to Be You", duration: "3:22" },
      { title: "Good Listener", duration: "2:43" },
      { title: "¥ (Yen)", duration: "3:32" },
      { title: "Something to Drink", duration: "3:58" },
      { title: "Blood in the Water", duration: "3:32" },
      { title: "Potty Mouth", duration: "6:50" },
    ],
  },
  {
    title: "Rebirth",
    artist: "Old Gods of Asgard",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.SOUNDTRACK,
    mediaType: MediaType.CD,
    label: "Insomniac",
    catNumber: "OGOA-01",
    releaseYear: 2023,
    tracklist: [
      { title: "The Skald Awakens", duration: "1:05" },
      { title: "Dark Ocean Summoning", duration: "6:43" },
      { title: "Children of the Elder God", duration: "3:38" },
      { title: "The Poet and the Muse", duration: "4:17" },
      { title: "Balance Slays the Demon", duration: "5:14" },
      { title: "Anger's Remorse", duration: "5:48" },
      { title: "Herald of Darkness", duration: "13:34" },
      { title: "Take Control", duration: "7:54" },
      { title: "The Sea of Night", duration: "6:54" },
    ],
  },
  {
    title: "War Music",
    artist: "Refused",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.PUNK,
    mediaType: MediaType.VINYL,
    label: "Spinefarm",
    releaseYear: 2019,
    tracklist: [
      { title: "Rev 001", duration: "3:10" },
      { title: "Violent Reaction", duration: "4:03" },
      { title: "I Wanna Watch the World Burn", duration: "3:30" },
      { title: "Blood Red", duration: "3:39" },
      { title: "Malfire", duration: "3:01" },
      { title: "Turn the Cross", duration: "3:38" },
      { title: "Damaged III", duration: "3:08" },
      { title: "Death in Vännäs", duration: "3:03" },
      { title: "The Infamous Left", duration: "3:05" },
      { title: "Economy of Death", duration: "4:01" },
    ],
  },
  {
    title: "Основа",
    artist: "Kunteynir",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.HIP_HOP,
    mediaType: MediaType.CASSETTE,
    releaseYear: 2014,
    tracklist: [
      { title: "Введение", duration: "1:42" },
      { title: "Основа", duration: "3:18" },
      { title: "Героиня", duration: "3:05" },
      { title: "Мой друг", duration: "2:54" },
      { title: "Пистолет", duration: "3:22" },
      { title: "Всё будет нормально", duration: "3:40" },
      { title: "Лето", duration: "3:11" },
      { title: "Музло", duration: "2:48" },
    ],
  },
  {
    title: "Even In Arcadia",
    artist: "Sleep Token",
    coverArt: PLACEHOLDER_COVER,
    genre: Genre.METAL,
    mediaType: MediaType.VINYL,
    label: "RCA",
    releaseYear: 2025,
    tracklist: [
      { title: "Look to Windward", duration: "7:46" },
      { title: "Emergence", duration: "6:26" },
      { title: "Past Self", duration: "3:34" },
      { title: "Dangerous", duration: "4:11" },
      { title: "Caramel", duration: "4:50" },
      { title: "Even in Arcadia", duration: "4:28" },
      { title: "Provider", duration: "6:05" },
      { title: "Damocles", duration: "4:25" },
      { title: "Gethsemane", duration: "6:23" },
      { title: "Infinite Baths", duration: "8:23" },
    ],
  },
  {
    title: "Phantom Liberty",
    artist: "Dawid Podsiadło & P.T. Adamczyk",
    coverArt: PHANTOM_LIBERTY_COVER,
    genre: Genre.SOUNDTRACK,
    mediaType: MediaType.CD,
    label: "Pur Pur / Sony",
    releaseYear: 2023,
    tracklist: [{ title: "Phantom Liberty", duration: "5:47" }],
  },
];

type CollectionSeed = {
  slug: string;
  title: string;
  description: string;
  label?: string;
  /** Release titles already in the catalog (order = position). */
  releaseTitles: string[];
};

type SellerSeed = {
  email: string;
  username: string;
  roles: UserRole[];
};

/** Extra sellers on top of kolya_plates / retro_vinyl already in the DB. */
const SELLERS: SellerSeed[] = [
  {
    email: "dusty.groove@example.com",
    username: "dusty_groove",
    roles: [UserRole.SELLER, UserRole.BUYER],
  },
  {
    email: "needle.drop@example.com",
    username: "needle_drop",
    roles: [UserRole.SELLER],
  },
  {
    email: "crate.digger@example.com",
    username: "crate_digger",
    roles: [UserRole.SELLER, UserRole.BUYER],
  },
  {
    email: "spin.city@example.com",
    username: "spin_city",
    roles: [UserRole.SELLER],
  },
];

type LotSeed = {
  /** Must match an existing Release.title in the DB. */
  releaseTitle: string;
  sellerUsername: string;
  price: number;
  quantity?: number;
  mediaCondition: ItemCondition;
  sleeveCondition?: ItemCondition | null;
  comment?: string | null;
  status?: LotStatus;
};

/**
 * Lots for releases already in the catalog (classics + NEW_RELEASES).
 * Idempotent: creates missing lots; updates condition fields on existing matches.
 */
const LOTS: LotSeed[] = [
  {
    releaseTitle: "Cave World",
    sellerUsername: "dusty_groove",
    price: 32.0,
    mediaCondition: ItemCondition.NEW,
    sleeveCondition: ItemCondition.NEW,
    comment: "Sealed Year0001 press.",
  },
  {
    releaseTitle: "Cave World",
    sellerUsername: "kolya_plates",
    price: 24.5,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_WITH_NOTES,
    comment: "Played a handful of times, no skips.",
  },
  {
    releaseTitle: "Wayward Fire",
    sellerUsername: "needle_drop",
    price: 14.99,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_PERFECT,
  },
  {
    releaseTitle: "ANTIHERO",
    sellerUsername: "crate_digger",
    price: 18.0,
    mediaCondition: ItemCondition.NEW,
    sleeveCondition: ItemCondition.NEW,
    comment: "Cassette, still in wrap.",
  },
  {
    releaseTitle: "Conflict DLC",
    sellerUsername: "spin_city",
    price: 36.5,
    mediaCondition: ItemCondition.NEW,
    sleeveCondition: ItemCondition.USED_PERFECT,
  },
  {
    releaseTitle: "Glimmer of God",
    sellerUsername: "dusty_groove",
    price: 16.0,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_PERFECT,
  },
  {
    releaseTitle: "Out of Touch",
    sellerUsername: "needle_drop",
    price: 22.0,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_WITH_NOTES,
    comment: "Cassette shell mint, slight fade on J-card.",
  },
  {
    releaseTitle: "Technology",
    sellerUsername: "crate_digger",
    price: 28.99,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_PERFECT,
  },
  {
    releaseTitle: "Rebirth",
    sellerUsername: "spin_city",
    price: 19.5,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_PERFECT,
    comment: "Insomniac CD, booklet included.",
  },
  {
    releaseTitle: "War Music",
    sellerUsername: "dusty_groove",
    price: 27.0,
    mediaCondition: ItemCondition.USED_WITH_NOTES,
    sleeveCondition: ItemCondition.USED_WITH_NOTES,
  },
  {
    releaseTitle: "Основа",
    sellerUsername: "needle_drop",
    price: 15.0,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: null,
    comment: "Cassette only, no case.",
  },
  {
    releaseTitle: "Even In Arcadia",
    sellerUsername: "crate_digger",
    price: 41.0,
    mediaCondition: ItemCondition.NEW,
    sleeveCondition: ItemCondition.NEW,
    comment: "Black vinyl, unopened.",
  },
  {
    releaseTitle: "Even In Arcadia",
    sellerUsername: "retro_vinyl",
    price: 34.0,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_PERFECT,
  },
  {
    releaseTitle: "Phantom Liberty",
    sellerUsername: "spin_city",
    price: 21.0,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_PERFECT,
  },
  {
    releaseTitle: "Nevermind",
    sellerUsername: "dusty_groove",
    price: 11.99,
    quantity: 2,
    mediaCondition: ItemCondition.USED_WITH_NOTES,
    sleeveCondition: ItemCondition.USED_WITH_NOTES,
  },
  {
    releaseTitle: "The Dark Side of the Moon",
    sellerUsername: "crate_digger",
    price: 95.0,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_PERFECT,
    comment: "Gatefold clean, includes poster.",
  },
  {
    releaseTitle: "Madvillainy",
    sellerUsername: "needle_drop",
    price: 52.0,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_PERFECT,
  },
  {
    releaseTitle: "Unknown Pleasures",
    sellerUsername: "spin_city",
    price: 185.0,
    mediaCondition: ItemCondition.USED_WITH_NOTES,
    sleeveCondition: ItemCondition.USED_WITH_NOTES,
    comment: "Factory FACT 10 style reissue.",
    status: LotStatus.ACTIVE,
  },
  {
    releaseTitle: "OK Computer",
    sellerUsername: "dusty_groove",
    price: 15.5,
    quantity: 2,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_WITH_NOTES,
  },
  {
    releaseTitle: "Master of Puppets",
    sellerUsername: "kolya_plates",
    price: 19.0,
    mediaCondition: ItemCondition.USED_PERFECT,
    sleeveCondition: ItemCondition.USED_WITH_NOTES,
    comment: "Cassette, case scuffed.",
  },
];

const COLLECTIONS: CollectionSeed[] = [
  {
    slug: "summer",
    title: "Летние вайбы",
    description: "Вайбы, которые вышли в летние месяцы",
    label: "• VV",
    releaseTitles: [
      "Rumours",
      "Abbey Road",
      "Autobahn",
      "The Dark Side of the Moon",
      "Kind of Blue",
      "OK Computer",
      "Nevermind",
      "Madvillainy",
    ],
  },
  {
    slug: "metal-soft-soul",
    title: "Металл для тонкой души",
    description: "Тяжело, но с чувством — когда риффы обнимают, а не давят",
    label: "• VV",
    releaseTitles: [
      "Even In Arcadia",
      "ANTIHERO",
      "Conflict DLC",
      "Master of Puppets",
      "Rebirth",
      "War Music",
      "Nevermind",
      "Cave World",
    ],
  },
  {
    slug: "dreamy-evening",
    title: "Мечтательный вечер",
    description: "Мягкий свет, медленный темп и пластинки для полутьмы",
    label: "• VV",
    releaseTitles: [
      "Out of Touch",
      "Kind of Blue",
      "Glimmer of God",
      "Phantom Liberty",
      "Autobahn",
      "The Dark Side of the Moon",
      "Rumours",
      "Abbey Road",
    ],
  },
  {
    slug: "self-destruction",
    title: "Вайбы саморазрушения",
    description: "Красиво гореть, громко падать и включать на повторе",
    label: "• VV",
    releaseTitles: [
      "Unknown Pleasures",
      "Cave World",
      "War Music",
      "Nevermind",
      "Основа",
      "Conflict DLC",
      "OK Computer",
      "Madvillainy",
    ],
  },
  {
    slug: "night-city",
    title: "Осколки Night City",
    description: "Синтетика, саундтреки и всё, что звучит как неон после полуночи",
    label: "• VV",
    releaseTitles: [
      "Phantom Liberty",
      "Rebirth",
      "Conflict DLC",
      "Wayward Fire",
      "Autobahn",
      "Out of Touch",
      "Technology",
      "Glimmer of God",
    ],
  },
];

async function seedNewReleases() {
  let created = 0;
  let skipped = 0;

  for (const release of NEW_RELEASES) {
    const existing = await prisma.release.findFirst({
      where: { title: release.title, artist: release.artist },
      select: { id: true },
    });

    if (existing) {
      skipped += 1;
      continue;
    }

    await prisma.release.create({
      data: {
        title: release.title,
        artist: release.artist,
        coverArt: release.coverArt,
        genre: release.genre,
        mediaType: release.mediaType,
        label: release.label,
        catNumber: release.catNumber,
        releaseYear: release.releaseYear,
        tracklist: toTracklist(release.tracklist),
      },
    });
    created += 1;
  }

  return { created, skipped };
}

async function seedCollection(seed: CollectionSeed) {
  const releases = await prisma.release.findMany({
    where: { title: { in: seed.releaseTitles } },
    select: { id: true, title: true },
  });

  const byTitle = new Map(releases.map((release) => [release.title, release]));
  const missing = seed.releaseTitles.filter((title) => !byTitle.has(title));

  if (missing.length > 0) {
    throw new Error(
      `Cannot seed collection "${seed.slug}" — missing releases: ${missing.join(", ")}`,
    );
  }

  const collection = await prisma.collection.upsert({
    where: { slug: seed.slug },
    create: {
      slug: seed.slug,
      title: seed.title,
      description: seed.description,
      label: seed.label,
      isPublished: true,
    },
    update: {
      title: seed.title,
      description: seed.description,
      label: seed.label,
      isPublished: true,
    },
  });

  await prisma.collectionRelease.deleteMany({
    where: { collectionId: collection.id },
  });

  await prisma.collectionRelease.createMany({
    data: seed.releaseTitles.map((title, position) => ({
      collectionId: collection.id,
      releaseId: byTitle.get(title)!.id,
      position,
    })),
  });

  return { slug: collection.slug, title: collection.title, itemCount: seed.releaseTitles.length };
}

async function seedCollections() {
  const results = [];
  for (const collection of COLLECTIONS) {
    results.push(await seedCollection(collection));
  }
  return results;
}

async function seedSellers() {
  const passwordHash = bcrypt.hashSync(DEV_PASSWORD, 10);
  let created = 0;
  let skipped = 0;

  for (const seller of SELLERS) {
    const existing = await prisma.user.findUnique({
      where: { email: seller.email },
      select: { id: true },
    });

    if (existing) {
      skipped += 1;
      continue;
    }

    await prisma.user.create({
      data: {
        email: seller.email,
        username: seller.username,
        passwordHash,
        roles: seller.roles,
      },
    });
    created += 1;
  }

  return { created, skipped };
}

async function seedLots() {
  const sellerUsernames = [...new Set(LOTS.map((lot) => lot.sellerUsername))];
  const releaseTitles = [...new Set(LOTS.map((lot) => lot.releaseTitle))];

  const [sellers, releases] = await Promise.all([
    prisma.user.findMany({
      where: { username: { in: sellerUsernames } },
      select: { id: true, username: true },
    }),
    prisma.release.findMany({
      where: { title: { in: releaseTitles } },
      select: { id: true, title: true },
    }),
  ]);

  const sellerByUsername = new Map(sellers.map((s) => [s.username, s]));
  const releaseByTitle = new Map(releases.map((r) => [r.title, r]));

  const missingSellers = sellerUsernames.filter((u) => !sellerByUsername.has(u));
  const missingReleases = releaseTitles.filter((t) => !releaseByTitle.has(t));

  if (missingSellers.length > 0 || missingReleases.length > 0) {
    const parts = [
      missingSellers.length > 0 ? `sellers: ${missingSellers.join(", ")}` : null,
      missingReleases.length > 0 ? `releases: ${missingReleases.join(", ")}` : null,
    ].filter(Boolean);
    throw new Error(`Cannot seed lots — missing ${parts.join("; ")}`);
  }

  let created = 0;
  let updated = 0;

  for (const lot of LOTS) {
    const seller = sellerByUsername.get(lot.sellerUsername)!;
    const release = releaseByTitle.get(lot.releaseTitle)!;

    const existing = await prisma.lot.findFirst({
      where: {
        sellerId: seller.id,
        releaseId: release.id,
        price: lot.price,
      },
      select: { id: true },
    });

    const lotData = {
      quantity: lot.quantity ?? 1,
      mediaCondition: lot.mediaCondition,
      sleeveCondition: lot.sleeveCondition ?? null,
      comment: lot.comment ?? null,
      status: lot.status ?? LotStatus.ACTIVE,
    };

    if (existing) {
      await prisma.lot.update({
        where: { id: existing.id },
        data: lotData,
      });
      updated += 1;
      continue;
    }

    await prisma.lot.create({
      data: {
        releaseId: release.id,
        sellerId: seller.id,
        price: lot.price,
        ...lotData,
      },
    });
    created += 1;
  }

  return { created, updated };
}

async function main() {
  const releases = await seedNewReleases();
  const sellers = await seedSellers();
  const lots = await seedLots();
  const collections = await seedCollections();

  console.log("Seed completed (additive — no catalog wipe).");
  console.log(`  Releases created: ${releases.created}`);
  console.log(`  Releases skipped: ${releases.skipped} (already existed)`);
  console.log(`  Sellers created: ${sellers.created}`);
  console.log(`  Sellers skipped: ${sellers.skipped} (already existed)`);
  console.log(`  Lots created: ${lots.created}`);
  console.log(`  Lots updated: ${lots.updated} (conditions refreshed)`);
  console.log(`  Collections:`);
  for (const collection of collections) {
    console.log(`    - ${collection.slug}: ${collection.title} (${collection.itemCount} items)`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
