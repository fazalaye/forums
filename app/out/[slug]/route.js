import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";
import { SEED_SITES } from "@/data/sites";

export async function GET(request, { params }) {
  const conn = await dbConnect();
  let targetUrl;

  if (conn) {
    const site = await Site.findOneAndUpdate(
      { slug: params.slug },
      { $inc: { clicks: 1 } },
      { new: true }
    ).lean();
    targetUrl = site?.url;
  }

  if (!targetUrl) {
    const seedSite = SEED_SITES.find((s) => s.slug === params.slug);
    targetUrl = seedSite?.url;
  }

  if (!targetUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(targetUrl);
}
