import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";
import { SEED_SITES } from "@/data/sites";
import { isBot } from "@/lib/bots";

export async function GET(request, { params }) {
  const conn = await dbConnect();
  let targetUrl;

  // Only real visits are counted. Crawlers walk every outbound link on the
  // site, which previously flattened the totals to roughly the same value for
  // every tool and made the ranking meaningless.
  const countThisVisit = !isBot(request.headers.get("user-agent"));

  if (conn) {
    const site = countThisVisit
      ? await Site.findOneAndUpdate(
          { slug: params.slug },
          { $inc: { clicks: 1 } },
          { new: true }
        ).lean()
      : await Site.findOne({ slug: params.slug }).lean();
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
