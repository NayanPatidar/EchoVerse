import { getImageURL } from "@/lib/utils";
import { Quality, Type } from "@/types";

interface HorizontalScrollerProps {
  key: string;
  name: string;
  subtitle?: string;
  type: Type;
  url: string;
  explicit?: boolean;
  image: Quality;
}

const HorizontalScrollerCard: React.FC<HorizontalScrollerProps> = ({
  key,
  name,
  subtitle,
  type,
  url,
  explicit,
  image,
}) => {
  const imageUrl = getImageURL(image);

  return (
    <div className="media-element flex flex-col text-left">
      <img src={imageUrl} className="media-elements-image" alt="" />
      <span className=" text-base lato-regular mt-5  overflow-hidden whitespace-nowrap text-ellipsis">
        {name}
      </span>
      <span className=" lato-regular text-gray-400 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
        {subtitle}
      </span>
    </div>
  );
};
export default HorizontalScrollerCard;
