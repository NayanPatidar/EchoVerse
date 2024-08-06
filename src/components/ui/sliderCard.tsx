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
  console.log(image);
  
  const imageUrl = getImageURL(image);

  return (
    <div className="media-element">
      <img src={imageUrl} alt="" />
    </div>
  );
};
export default HorizontalScrollerCard;
