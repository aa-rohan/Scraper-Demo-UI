export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  price_amount: string;
  description?: string;
  image_url?: string;
  contact_info?: string;
  url?: string;
  currency_unit?: string;
  product_categories?: string[];
}
