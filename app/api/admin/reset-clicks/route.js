import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";

export const dynamic = "force-dynamic";

/**
 * Zeroes every outbound click counter.
 *
 * The counters accumulated while /out/ was crawlable and before bot filtering
 * existed, so the totals are mostly crawler traffic. This wipes them so the
 * ranking restarts from filtered data only. Destructive and irreversible:
 * triggered manually by an admin, never automatically.
 */
export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const conn = await dbConnect();
  if (!conn) {
    return NextResponse.json(
      { error: "Base de données injoignable." },
      { status: 503 }
    );
  }

  const before = await Site.aggregate([
    { $group: { _id: null, total: { $sum: "$clicks" } } },
  ]);
  const totalBefore = before[0]?.total || 0;

  const result = await Site.updateMany(
    { clicks: { $gt: 0 } },
    { $set: { clicks: 0 } }
  );

  return NextResponse.json({
    message: `Compteurs remis à zéro. ${totalBefore} clics effacés sur ${result.modifiedCount} outils. Le comptage repart maintenant sur du trafic filtré.`,
    clicsEffaces: totalBefore,
    outilsReinitialises: result.modifiedCount,
  });
}
