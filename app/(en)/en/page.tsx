import { HomePage } from "@/components/HomePage";
import { homeUrls, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", homeUrls);

export default function Page() {
  return <HomePage lang="en" />;
}
