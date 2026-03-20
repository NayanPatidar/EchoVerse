import HorizontalScrollerCard from "@/components/ui/Cards/sliderCard";
import QuickPickCard from "@/components/ui/Cards/quickPickCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getHomeData } from "@/lib/api_jiosaavn";
import HomeGreeting from "@/components/homeGreeting";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EchoVerse - Stream Music, Discover New Sounds",
  description:
    "Stream millions of songs, discover trending playlists, top albums, and your favorite artists on EchoVerse. Your personal music streaming experience.",
  keywords: [
    "music streaming",
    "songs",
    "playlists",
    "albums",
    "artists",
    "listen online",
    "EchoVerse",
    "Hindi songs",
    "Bollywood music",
    "trending music",
  ],
  openGraph: {
    title: "EchoVerse - Stream Music, Discover New Sounds",
    description:
      "Stream millions of songs, discover trending playlists, and top albums on EchoVerse.",
    type: "website",
    siteName: "EchoVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoVerse - Stream Music, Discover New Sounds",
    description:
      "Stream millions of songs, discover trending playlists, and top albums on EchoVerse.",
  },
};

const EXCLUDED_SECTIONS = new Set([
  "artist_recos",
  "city_mod",
  "mixes",
  "discover",
  "promo7",
  "promo3",
  "promo1",
  "radio",
]);

function isValidSection(
  key: string,
  section: any
): section is { title: string; data: any[] } {
  return (
    !EXCLUDED_SECTIONS.has(key) &&
    section &&
    typeof section === "object" &&
    !("random_songs_listid" in section) &&
    Array.isArray(section.data) &&
    section.data.length > 0 &&
    typeof section.title === "string"
  );
}

function isValidItem(item: any): boolean {
  return item && typeof item === "object" && item.id && item.name && item.url;
}

export default async function Home() {
  const homeData = await getHomeData();

  if (!homeData) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-[#b3b3b3] font-medium text-base">
          Unable to load music. Please try again later.
        </p>
      </div>
    );
  }

  const sections = Object.entries(homeData).filter(([key, section]) =>
    isValidSection(key, section)
  ) as [string, { title: string; data: any[] }][];

  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-[#b3b3b3] font-medium text-base">
          No music available right now.
        </p>
      </div>
    );
  }

  const quickPickSection = sections[0];
  const quickPicks = (quickPickSection?.[1]?.data ?? [])
    .filter(isValidItem)
    .slice(0, 6);
  const remainingSections = sections.slice(1);

  return (
    <div className="pb-10 home-fade-in">
      {/* Greeting */}
      <header className="md:px-6 px-4 pt-5 md:pt-7 pb-2">
        <HomeGreeting />
      </header>

      {/* Quick Picks Grid */}
      {quickPicks.length > 0 && (
        <section className="md:px-6 px-4 pt-2 pb-3" aria-label="Quick picks">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {quickPicks.map((item) =>
              item.id && item.name && item.url ? (
                <QuickPickCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  url={item.url}
                  type={item.type ?? "playlist"}
                  image={item.image ?? ""}
                />
              ) : null
            )}
          </div>
        </section>
      )}

      {/* Scrollable Sections */}
      {remainingSections.map(([key, section], sectionIndex) => {
        const validItems = section.data.filter(isValidItem);
        if (validItems.length === 0) return null;

        return (
          <section
            className="text-white md:px-6 px-3 mt-4 md:mt-6 section-slide-up"
            key={key}
            aria-label={section.title}
            style={{ animationDelay: `${sectionIndex * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4 px-1">
              <h2 className="text-[18px] md:text-[24px] font-bold first-letter:capitalize cursor-default">
                {section.title}
              </h2>
              <span className="text-[13px] font-bold text-[#b3b3b3] hover:underline cursor-pointer transition-colors duration-200">
                Show all
              </span>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max gap-1 md:gap-2">
                {validItems.map((item) => (
                  <HorizontalScrollerCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    url={item.url}
                    subtitle={item.subtitle ?? ""}
                    type={item.type ?? "song"}
                    image={item.image ?? ""}
                    explicit={item.explicit ?? false}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </section>
        );
      })}
    </div>
  );
}
