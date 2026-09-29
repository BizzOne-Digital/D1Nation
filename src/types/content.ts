export type ServiceItem = {
  _id: string;
  title: string;
  slug: string;
  overview: string;
  benefits?: string[];
  imageUrl?: string;
  internalPrice?: number | null;
  showPublicPrice?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

export type TestimonialItem = {
  _id: string;
  name?: string;
  role?: string;
  quote: string;
  context?: string;
  photoUrl?: string;
};

export type BlogListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  coverImageUrl?: string;
};

export type TeamListItem = {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  photoUrl?: string;
};
