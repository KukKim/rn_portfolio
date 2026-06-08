type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export interface RatingProps {
  type?: Variant;
  value: number;
  onChange?: (rating: number) => void;
  editable?: boolean;
  size?: number;
  maxRating?: number;
}
