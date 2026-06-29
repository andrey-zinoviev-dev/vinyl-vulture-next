import "dotenv/config";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  ItemCondition,
  LotStatus,
  MediaType,
  PrismaClient,
  UserRole,
} from "../src/generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const DEV_PASSWORD = "password123";

async function main() {
  const passwordHash = bcrypt.hashSync(DEV_PASSWORD, 10);

  await prisma.lot.deleteMany();
  await prisma.release.deleteMany();
  await prisma.user.deleteMany();

  const [admin, sellerKolya, sellerRetro, buyer] = await Promise.all([
    prisma.user.create({
      data: {
        email: "admin@vinylvultures.local",
        username: "vinyl_admin",
        passwordHash,
        roles: [UserRole.ADMIN, UserRole.BUYER],
      },
    }),
    prisma.user.create({
      data: {
        email: "kolya.plates@example.com",
        username: "kolya_plates",
        passwordHash,
        roles: [UserRole.SELLER, UserRole.BUYER],
      },
    }),
    prisma.user.create({
      data: {
        email: "retro.vinyl@example.com",
        username: "retro_vinyl",
        passwordHash,
        roles: [UserRole.SELLER],
      },
    }),
    prisma.user.create({
      data: {
        email: "record.fan@example.com",
        username: "record_fan",
        passwordHash,
        roles: [UserRole.BUYER],
      },
    }),
  ]);

  const releases = await Promise.all([
    prisma.release.create({
      data: {
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        mediaType: MediaType.VINYL,
        label: "Harvest",
        catNumber: "SHVL 804",
        releaseYear: 1973,
        barcode: "5099750442227",
        tracklist: [
          { position: "A1", title: "Speak to Me", duration: "1:30" },
          { position: "A2", title: "Breathe (In the Air)", duration: "2:43" },
          { position: "B5", title: "Money", duration: "6:22" },
          { position: "B6", title: "Us and Them", duration: "7:49" },
        ],
      },
    }),
    prisma.release.create({
      data: {
        title: "Abbey Road",
        artist: "The Beatles",
        mediaType: MediaType.VINYL,
        label: "Apple",
        catNumber: "PCS 7088",
        releaseYear: 1969,
        barcode: "5099969944118",
        tracklist: [
          { position: "A1", title: "Come Together", duration: "4:20" },
          { position: "A2", title: "Something", duration: "3:03" },
          { position: "B1", title: "Here Comes the Sun", duration: "3:05" },
          { position: "B2", title: "Golden Slumbers", duration: "1:31" },
        ],
      },
    }),
    prisma.release.create({
      data: {
        title: "Unknown Pleasures",
        artist: "Joy Division",
        mediaType: MediaType.VINYL,
        label: "Factory",
        catNumber: "FACT 10",
        releaseYear: 1979,
        tracklist: [
          { position: "A1", title: "Disorder", duration: "3:32" },
          { position: "A2", title: "Day of the Lords", duration: "4:49" },
          { position: "B1", title: "She's Lost Control", duration: "3:57" },
        ],
      },
    }),
    prisma.release.create({
      data: {
        title: "Kind of Blue",
        artist: "Miles Davis",
        mediaType: MediaType.VINYL,
        label: "Columbia",
        catNumber: "CL 1355",
        releaseYear: 1959,
        tracklist: [
          { position: "A1", title: "So What", duration: "9:22" },
          { position: "A2", title: "Freddie Freeloader", duration: "9:46" },
          { position: "B1", title: "All Blues", duration: "11:33" },
        ],
      },
    }),
    prisma.release.create({
      data: {
        title: "OK Computer",
        artist: "Radiohead",
        mediaType: MediaType.CD,
        label: "Parlophone",
        catNumber: "7243 8 55229 2 5",
        releaseYear: 1997,
        barcode: "724385522925",
        tracklist: [
          { position: "1", title: "Airbag", duration: "4:44" },
          { position: "2", title: "Paranoid Android", duration: "6:23" },
          { position: "3", title: "Karma Police", duration: "4:21" },
        ],
      },
    }),
    prisma.release.create({
      data: {
        title: "Nevermind",
        artist: "Nirvana",
        mediaType: MediaType.CD,
        label: "DGC",
        catNumber: "24425",
        releaseYear: 1991,
        tracklist: [
          { position: "1", title: "Smells Like Teen Spirit", duration: "5:01" },
          { position: "2", title: "In Bloom", duration: "4:14" },
          { position: "3", title: "Come as You Are", duration: "3:39" },
        ],
      },
    }),
    prisma.release.create({
      data: {
        title: "Autobahn",
        artist: "Kraftwerk",
        mediaType: MediaType.VINYL,
        label: "Philips",
        catNumber: "6305 133",
        releaseYear: 1974,
        tracklist: [
          { position: "A", title: "Autobahn", duration: "22:43" },
          { position: "B1", title: "Kometenmelodie 1", duration: "6:05" },
        ],
      },
    }),
    prisma.release.create({
      data: {
        title: "Rumours",
        artist: "Fleetwood Mac",
        mediaType: MediaType.VINYL,
        label: "Warner Bros.",
        catNumber: "BSK 3010",
        releaseYear: 1977,
        tracklist: [
          { position: "A1", title: "Second Hand News", duration: "2:43" },
          { position: "A2", title: "Dreams", duration: "4:14" },
          { position: "B1", title: "Go Your Own Way", duration: "3:38" },
        ],
      },
    }),
    prisma.release.create({
      data: {
        title: "Madvillainy",
        artist: "Madvillain",
        mediaType: MediaType.VINYL,
        label: "Stones Throw",
        catNumber: "STH 2285",
        releaseYear: 2004,
        tracklist: [
          { position: "A1", title: "Accordion", duration: "1:55" },
          { position: "A2", title: "Meat Grinder", duration: "2:11" },
          { position: "B1", title: "All Caps", duration: "2:10" },
        ],
      },
    }),
    prisma.release.create({
      data: {
        title: "Master of Puppets",
        artist: "Metallica",
        mediaType: MediaType.CASSETTE,
        label: "Elektra",
        catNumber: "60439-4",
        releaseYear: 1986,
        tracklist: [
          { position: "A1", title: "Battery", duration: "4:22" },
          { position: "A2", title: "Master of Puppets", duration: "8:35" },
          { position: "B1", title: "Welcome Home (Sanitarium)", duration: "6:27" },
        ],
      },
    }),
  ]);

  const [
    darkSide,
    abbeyRoad,
    unknownPleasures,
    kindOfBlue,
    okComputer,
    nevermind,
    autobahn,
    rumours,
    madvillainy,
    masterOfPuppets,
  ] = releases;

  await prisma.lot.createMany({
    data: [
      {
        releaseId: darkSide.id,
        sellerId: sellerKolya.id,
        price: 89.99,
        quantity: 1,
        mediaCondition: ItemCondition.VG_PLUS,
        sleeveCondition: ItemCondition.VG,
        comment: "Original UK press. Light surface noise on side B.",
        status: LotStatus.ACTIVE,
      },
      {
        releaseId: darkSide.id,
        sellerId: sellerRetro.id,
        price: 124.5,
        quantity: 1,
        mediaCondition: ItemCondition.NM,
        sleeveCondition: ItemCondition.NM,
        comment: "2016 remaster, played twice.",
        status: LotStatus.ACTIVE,
      },
      {
        releaseId: abbeyRoad.id,
        sellerId: sellerKolya.id,
        price: 75.0,
        quantity: 2,
        mediaCondition: ItemCondition.VG,
        sleeveCondition: ItemCondition.G_PLUS,
        comment: "Ring wear on cover, vinyl plays clean.",
        status: LotStatus.ACTIVE,
      },
      {
        releaseId: unknownPleasures.id,
        sellerId: sellerRetro.id,
        price: 210.0,
        quantity: 1,
        mediaCondition: ItemCondition.VG_PLUS,
        sleeveCondition: ItemCondition.VG_PLUS,
        status: LotStatus.ACTIVE,
      },
      {
        releaseId: kindOfBlue.id,
        sellerId: sellerKolya.id,
        price: 55.0,
        quantity: 1,
        mediaCondition: ItemCondition.VG,
        sleeveCondition: ItemCondition.VG,
        comment: "Mono reissue, small seam split.",
        status: LotStatus.ACTIVE,
      },
      {
        releaseId: okComputer.id,
        sellerId: sellerRetro.id,
        price: 18.99,
        quantity: 3,
        mediaCondition: ItemCondition.NM,
        sleeveCondition: ItemCondition.NM,
        status: LotStatus.ACTIVE,
      },
      {
        releaseId: nevermind.id,
        sellerId: sellerKolya.id,
        price: 12.5,
        quantity: 1,
        mediaCondition: ItemCondition.VG_PLUS,
        sleeveCondition: ItemCondition.VG,
        status: LotStatus.SOLD,
      },
      {
        releaseId: autobahn.id,
        sellerId: sellerRetro.id,
        price: 42.0,
        quantity: 1,
        mediaCondition: ItemCondition.G_PLUS,
        sleeveCondition: ItemCondition.G,
        comment: "German pressing, audible wear but collectible.",
        status: LotStatus.ACTIVE,
      },
      {
        releaseId: rumours.id,
        sellerId: sellerKolya.id,
        price: 34.99,
        quantity: 1,
        mediaCondition: ItemCondition.VG_PLUS,
        sleeveCondition: ItemCondition.VG_PLUS,
        status: LotStatus.ACTIVE,
      },
      {
        releaseId: rumours.id,
        sellerId: sellerRetro.id,
        price: 29.0,
        quantity: 1,
        mediaCondition: ItemCondition.VG,
        sleeveCondition: ItemCondition.VG,
        status: LotStatus.SUSPENDED,
      },
      {
        releaseId: madvillainy.id,
        sellerId: sellerKolya.id,
        price: 48.0,
        quantity: 1,
        mediaCondition: ItemCondition.NM,
        sleeveCondition: ItemCondition.NM,
        status: LotStatus.ACTIVE,
      },
      {
        releaseId: masterOfPuppets.id,
        sellerId: sellerRetro.id,
        price: 22.0,
        quantity: 1,
        mediaCondition: ItemCondition.VG,
        sleeveCondition: null,
        comment: "J-card only, no case.",
        status: LotStatus.ACTIVE,
      },
    ],
  });

  console.log("Seed completed.");
  console.log(`  Users:    ${4} (password for all: "${DEV_PASSWORD}")`);
  console.log(`  Releases: ${releases.length}`);
  console.log(`  Lots:     ${12}`);
  console.log(`  Admin:    ${admin.email}`);
  console.log(`  Sellers:  ${sellerKolya.username}, ${sellerRetro.username}`);
  console.log(`  Buyer:    ${buyer.username}`);
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
