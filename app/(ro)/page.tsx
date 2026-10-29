import { HomePage } from "@/components/HomePage";
import { homeUrls, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("ro", homeUrls);

export default function Page() {
  return <HomePage lang="ro" />;
}
