import { renderBrandIcon } from "@/lib/brand-icon";

export const dynamic = "force-static";

export async function GET() {
  const response = await renderBrandIcon(192);
  return new Response(response.body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
