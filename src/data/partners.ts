import { ReactNode } from "react";

export type Benefit = {
  title: string;
  description: string;
  icon: string;
};

export type PartnerData = {
  slug: string;
  type: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  whoIsThisFor: string;
  benefits: Benefit[];
};

export const partnersData: Record<string, PartnerData> = {
  "travel-agencies": {
    slug: "travel-agencies",
    type: "Travel Agencies",
    hero: {
      title: "Grow your travel agency with bus ticket booking.",
      subtitle: "Sell tickets from hundreds of routes, serve more customers, and earn commission from every booking.",
      image: "/images/travel_page.png",
    },
    whoIsThisFor: "Built for agencies that already sell flights, tours, hotels, visas, or travel services and want to expand their offerings without additional investment.",
    benefits: [
      {
        title: "More services",
        description: "Offer bus tickets alongside flights and tours.",
        icon: "Map",
      },
      {
        title: "More revenue",
        description: "Earn commission from every ticket sold.",
        icon: "Banknote",
      },
      {
        title: "Faster bookings",
        description: "Real-time inventory and instant ticket generation.",
        icon: "Zap",
      },
      {
        title: "One dashboard",
        description: "Bookings, customers and earnings in one place.",
        icon: "LayoutDashboard",
      },
    ],
  },
  "mobile-shops": {
    slug: "mobile-shops",
    type: "Mobile Shops",
    hero: {
      title: "Your phone shop can become a ticket center.",
      subtitle: "Extra income with no extra inventory. Sell tickets alongside recharge and accessories. Start in minutes.",
      image: "/images/mobile_page.png",
    },
    whoIsThisFor: "Perfect for neighborhood mobile and retail shops looking to turn daily foot traffic into a steady source of extra income.",
    benefits: [
      {
        title: "Extra income",
        description: "Earn extra income with no extra inventory.",
        icon: "Coins",
      },
      {
        title: "Capitalize on traffic",
        description: "Customers already visit your shop.",
        icon: "Users",
      },
      {
        title: "Easy bundling",
        description: "Sell tickets alongside recharge and accessories.",
        icon: "Package",
      },
      {
        title: "Quick start",
        description: "Start in minutes with zero complicated setup.",
        icon: "Rocket",
      },
    ],
  },
  "hotels": {
    slug: "hotels",
    type: "Hotels",
    hero: {
      title: "Help guests continue their journey.",
      subtitle: "Improve guest experience and earn additional revenue with no complicated setup.",
      image: "/images/hote_page.png",
    },
    whoIsThisFor: "Designed for hospitality businesses that want to provide end-to-end travel convenience for their guests while generating extra revenue.",
    benefits: [
      {
        title: "Seamless travel",
        description: "Help guests continue their journey easily.",
        icon: "MapPin",
      },
      {
        title: "Better experience",
        description: "Improve guest experience with instant ticketing.",
        icon: "Star",
      },
      {
        title: "New revenue stream",
        description: "Earn additional revenue effortlessly.",
        icon: "TrendingUp",
      },
      {
        title: "Zero hassle",
        description: "No complicated setup required.",
        icon: "CheckCircle",
      },
    ],
  },
  "independent-agents": {
    slug: "independent-agents",
    type: "Independent Agents",
    hero: {
      title: "Start your own ticket booking business.",
      subtitle: "Work from anywhere. You don't need to own a travel agency to become a travel agent.",
      image: "/images/indivisual_page.png",
    },
    whoIsThisFor: "Ideal for students, freelancers, stay-at-home parents, entrepreneurs, and anyone looking for extra income.",
    benefits: [
      {
        title: "Work from anywhere",
        description: "No physical shop required.",
        icon: "Laptop",
      },
      {
        title: "Build a network",
        description: "Build your own customer network.",
        icon: "Network",
      },
      {
        title: "Earn per booking",
        description: "Earn commission on every successful booking.",
        icon: "Wallet",
      },
      {
        title: "Flexible growth",
        description: "Grow at your own pace on your own schedule.",
        icon: "Clock",
      },
    ],
  },
};
