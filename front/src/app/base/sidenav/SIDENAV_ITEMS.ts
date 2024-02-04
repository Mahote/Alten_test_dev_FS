import { SidenavItem } from "app/base/sidenav/sidenav.model";

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    id: 'products',
    icon: "shopping-cart",
    labels: {
      en: "products",
      fr: "produits"
    },
    link: 'products'

  },
  {
    id: 'admin',
    icon: "users",  
    labels: {
      en: "admin",
      fr: "admin"
    },
    link: 'admin/products'

  }

];