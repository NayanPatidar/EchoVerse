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
        <p className="text-white/40 Montserrat-regular text-lg">
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
        <p className="text-white/40 Montserrat-regular text-lg">
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
      <header className="md:px-10 px-4 pt-6 md:pt-8 pb-1">
        <HomeGreeting />
      </header>

      {/* Quick Picks Grid */}
      {quickPicks.length > 0 && (
        <section className="md:px-10 px-4 pt-3 pb-5" aria-label="Quick picks">
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
            className="text-white md:pl-8 pl-3 md:pr-6 pr-2 mt-1 section-slide-up"
            key={key}
            aria-label={section.title}
            style={{ animationDelay: `${sectionIndex * 60}ms` }}
          >
            <div className="md:pt-6 pt-4 md:pb-2 pb-1 flex items-center justify-between md:pr-4 pr-2">
              <h2 className="text-[15px] md:text-[22px] first-letter:capitalize Montserrat-bold md:pl-3 pl-1 cursor-default tracking-tight">
                {section.title}
              </h2>
              <span className="text-[11px] md:text-xs text-white/40 hover:text-white/80 cursor-pointer transition-colors duration-200 Montserrat-regular tracking-widest uppercase">
                Show all
              </span>
            </div>
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex w-max">
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
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        );
      })}
    </div>
  );
}
