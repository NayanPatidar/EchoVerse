import HorizontalScrollerCard from "@/components/ui/Cards/sliderCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getHomeData } from "@/lib/api_jiosaavn";

// async function slowFetchData() {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return { data: "Some data" };
// }

export default async function Home() {
  // const data = await slowFetchData();

  const homeData = await getHomeData();

  if (!homeData) {
    return;
  }

  return (
    <div>
      {Object.entries(homeData).map(([key, section]) => {
        if (
          "random_songs_listid" in section ||
          key === "artist_recos" ||
          key === "city_mod" ||
          key === "mixes" ||
          key === "discover" ||
          key === "promo7" ||
          key === "promo3" ||
          key === "promo1" ||
          key === "radio"
        )
          return null;
        return (
          <div className="text-white relative pl-8 pr-6" key={key}>
            <div className=" pt-5 text-2xl text first-letter:capitalize Montserrat-bold pl-3 cursor-default">
              {section.title}
            </div>
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex w-max">
                {section.data.map(
                  ({ id, name, url, subtitle, type, image, explicit }) => (
                    <HorizontalScrollerCard
                      key={id}
                      id={id}
                      name={name}
                      url={url}
                      subtitle={subtitle}
                      type={type}
                      image={image}
                      explicit={explicit}
                    />
                  )
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
}
