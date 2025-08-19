// src/data/marketplaceData.ts

import {
  Factory, Smartphone, Truck, Shirt, Gem, Building, HeartPulse, Package,
  HardHat, Leaf, Droplets, Paintbrush, ToyBrick, Dog
} from "lucide-react";

// You can define a type for your products for better type safety
export interface Product {
  id: number;
  category?: string;
  name: string;
  price: string;
  seller: string;
  image: string;
  certified: boolean;
}

export const marketplaceProducts = [
  {
    id: 1,
    category: "laptops",
    name: "2023 Hot Selling Laptop Windows 11",
    price: "₹21,687 - ₹25,435",
    seller: "DI Xiang Industrial",
    image: "https://static-media.laptopoutlet.co.uk/magefan_blog/Top-5-best-selling-laptops-in-2023-505x353.jpg", // Space removed
    certified: true,
  },
  {
    id: 2,
    category: "laptops",
    name: "POS Billing System(with Scanner & Printer)",
    price: "₹18,000 - ₹26,000",
    seller: " FinTech Solutions India ",
    image:
      "https://imgs.search.brave.com/qCn-CkpJBR9mQdiBg8HQJOjV7XZ4x2X6PnG1Q1iSt48/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFwRDBPTndYeEwu/anBn",
    certified: true,
  },
  {
    id: 3,
    category: "laptops",
    name: "Zoho Books Subscription (or Tally on Cloud)",
    price: "₹8,000 - ₹12,000 /year",
    seller: "Certified Tech Resellers ",
    image:
      "https://imgs.search.brave.com/fCCS77DcmQbEsLRGlrn-lpJlAEXtlGVbGHGZ1SwzOUg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wcmlt/ZXNvbHV0aW9uc3Fh/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8xMi96b2hv/LWJvb2tzLXFhdGFy/LXByaW1lLWRvaGEt/MS5wbmc",
    certified: true,
  },
  {
    id: 4,
    category: "textiles",
    name: "Biodegradable Mailer Bags & Boxes",
    price: "₹250 - ₹400 /bundle of 100",
    seller: "EcoPack Solutions",
    image:
      "https://imgs.search.brave.com/puxvaoLvZBVE704HUxgaq1jBHr1l5htO5RwbRFNC0TE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzI0MzkxMTgxL3Iv/aWwvYTNhZmQ3LzI2/NzExOTczMDcvaWxf/NjAweDYwMC4yNjcx/MTk3MzA3X2RtOGYu/anBn",
    certified: true,
  },
  {
    id: 5,
    category: "textiles",
    name: "1kW Rooftop Solar Panel Kit for Shops",
    price: "₹60,000 - ₹85,000",
    seller: "Surya Power Systems",
    image:
      "https://imgs.search.brave.com/UJKuoqbSILBTvyG_zuLy1Ebww0DPt-sS-uILl1NITNI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MjFaenNwTExuVUwu/anBn",
    certified: true,
  },
  {
    id: 6,
    category: "industrial",
    name: "3-Axis Benchtop CNC Router for Prototyping",
    price: " ₹75,000 - ₹1,20,000",
    seller: "Precise Robotics India ",
    image:
   " https://imgs.search.brave.com/DlMGEI7Jw3TWf0itavOnNKtVPpDLPW2qHAxph7rlsa8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFIdGNRdlgxbEwu/anBn",
    certified: true,
  },
  {
    id: 7,
    category: "apparel",
    name: "Bulk Business WhatsApp API Credits",
    price: "₹5,000 - ₹7,500 /10k conversations",
    seller: "Tiruppur Garments",
    image:
      "https://assets.superblog.ai/site_cuid_cl9pmahic552151jpq6mko9ans/images/23-1730380626801-compressed.jpg",
    certified: true,
  },
  {
    id: 8,
    category: "health",
    name: "Ceramic Dinnerware (Khurja Pottery Set)",
    price: "₹3,500 - ₹5,000 /20-piece set",
    seller: "Heritage Crafts Collective ",
    image:
      "https://imgs.search.brave.com/NbgHGpyMyKTtCMLB-SvNdrqDIItWGxRONioGiS4PNjs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmpkbWFnaWNi/b3guY29tL2NvbXAv/a2h1cmphL2s1Lzk5/OTlwNTczMi41NzMy/LjIwMDMxNTIyNDAx/Ni5tNms1L2NhdGFs/b2d1ZS9zaGFybWEt/Y2VyYW1pY3Mta2h1/cmphLWtodXJqYS1w/b3R0ZXJ5LW1hbnVm/YWN0dXJlcnMtNWZi/ZGJlNWZscS0yNTAu/anBnP3c9NjQwJnE9/NzU",
    certified: true,
  },
  {
    id: 9,
    category: "auto",
    name: "Drone Pilot Training Certification Course",
    price: "₹80,000 - ₹1,10,000 /per course",
    seller: "AeroSkill Academy",
    image:
      "https://imgs.search.brave.com/QLCQN1uw_zjRGBIHOYUxGaOICOlQBGodjsgkpaOyPes/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aW5kaWFuaW5zdGl0/dXRlb2Zkcm9uZXMu/Y29tL21lZGlhL0Nv/dXJzZUltYWdlcy9t/dWx0aXJvdG9yLXBp/bG90LWNvdXJzZS5q/cGc",
    certified: true,
  },
  {
    id: 10,
    category: "electronics",
    name: "Industrial Indoor Air Quality (IAQ) Monitor",
    price: "₹22,000 - ₹35,000",
    seller: "EnviroSense Tech ",
    image:
      "https://imgs.search.brave.com/jNsDFVQKYGVDz4QwGpFnPtTLAbSgDtwBlr9JavvILmM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFOdER6T3VRMEwu/anBn",
    certified: false,
  },
  {
    id: 11,
    category: "agriculture",
    name: "Food Dehydrator & Vacuum Sealer Combo",
    price: "₹45,000 - ₹60,000",
    seller: "AgriPro Solutions",
    image:
      "https://imgs.search.brave.com/MykRHtXmHic1w3vV_8EGgf4y_a_fwywvwXUbQWonT2w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9uZXdl/bGxicmFuZHMuaW1n/aXgubmV0L2ZmYjYz/N2QwLTI3N2EtMzc3/YS1hMGQ2LWZkMjcw/MGNmZTY0OC9mZmI2/MzdkMC0yNzdhLTM3/N2EtYTBkNi1mZDI3/MDBjZmU2NDguanBl/Zz9hdXRvPWZvcm1h/dCxjb21wcmVzcyZ3/PTQwMCZoPTQwMA",
    certified: true,
  },
  {
    id: 12,
    category: "construction",
    name: "LED High Bay Lighting for Warehouses & Workshops",
    price: "₹2,500 - ₹4,000 /unit",
    seller: "Orolite Industrial Solutions",
    image:
      "https://imgs.search.brave.com/tWRGrp2iWevF8IlpOxKqogFqodqz5Y-UfOIqgn0dL8A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bGVkbXlwbGFjZS5j/b20vY2RuL3Nob3Av/ZmlsZXMvdWZvLWxl/ZC1oaWdoLWJheS1s/aWdodC0xNTAxMjAx/MDAtd2F0dC1hZGp1/c3RhYmxlLTU3MDBr/LTE1MGxtdy0xNTVs/bXctYWMyNzctNDgw/di1oaWdoLXZvbHRh/Z2UtaXA2NS11bC1k/bGMtbGlzdGVkLTEt/MTB2LWRpbS1mb3It/d2FyZWhvdXNlLWJh/cm4tYWlycG9ydC13/b3Jrc2hvcC1nYS00/NDMyMDkucG5nP3Y9/MTczNzk5MjExOA",
    certified: true,
  },
];

export const initialUserListedProducts = [
  {
    id: 101,
    name: "Bulk Bubble Wrap Roll (50 meters)",
    price: "₹1,800",
    seller: "Your Storefront",
    image:
      "https://imgs.search.brave.com/vPBNxU2dS1tFy6m1ZoEU3jELuBNdkAvrqJRUUT8O-vs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dXBhY2suaW4vbWVk/aWEvY2F0YWxvZy9w/cm9kdWN0L2NhY2hl/LzJlNzQ3YjE1ZDJi/ZDBjOWFiN2E0YjA4/MjY3MzAwMDNkL3Uv/cC91cGJ3XzQuanBn",
    certified: true,
  },
  {
    id: 102,
    name: "Complete PPE Safety Kit (Helmet, Goggles, Gloves, Jacket)",
    price: "₹1,500 /kit",
    seller: "Your Storefront",
    image:
      "https://m.media-amazon.com/images/I/61PD4h-j7QS._SX522_.jpg",
    certified: true,
  },
  {
    id: 103,
    name: "Industrial First Aid Station (Wall-Mountable)",
    price: "₹4,500",
    seller: "Your Storefront",
    image:
      "https://imgs.search.brave.com/7nLx1DRfocfK0yEaIuMcu5EfwoE89_s_Q01xVh_7fgA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bm9ybWVkLmNvbS9t/ZWRpYS9jYXRhbG9n/L3Byb2R1Y3QvY2Fj/aGUvMDE4OTM2MzQ0/OGZkZTIzOThiM2I4/YTU2YjQxMzI4YjYv/MC85LzA5NzUtYW5z/aV9sZy5wbmc",
    certified: true,
  },
  {
    id: 104,
    name: "Industrial Safety Helmets (Yellow)",
    price: "₹250 /piece",
    seller: "Your Storefront",
    image:
      "https://5.imimg.com/data5/TestImages/FK/QO/CE/SELLER-651104/saviour-safety-helmet-250x250.jpg",
    certified: true,
  },
];

// --- Massively Expanded Category List ---
export const categories = [
  {
    name: "Industrial Machinery",
    icon: Factory,
    sub: [
      "Construction Machinery",
      "Manufacturing Equipment",
      "Tools & Hardware",
    ],
  },
  {
    name: "Consumer Electronics",
    icon: Smartphone,
    sub: ["Mobile Phones", "Laptops & Gaming", "Smart Watches & Accessories"],
  },
  {
    name: "Vehicles & Transportation",
    icon: Truck,
    sub: ["Trucks & Buses", "Motorcycles", "Auto Parts & Accessories"],
  },
  {
    name: "Apparel & Accessories",
    icon: Shirt,
    sub: ["Men's Clothing", "Women's Clothing", "Fashion Accessories"],
  },
  {
    name: "Jewelry, Eyewear, Watches",
    icon: Gem,
    sub: ["Fine Jewelry", "Fashion Watches", "Eyeglasses & Frames"],
  },
  {
    name: "Home & Garden",
    icon: Building,
    sub: ["Furniture", "Garden Supplies", "Home Decor", "Home Appliances"],
  },
  {
    name: "Beauty & Personal Care",
    icon: HeartPulse,
    sub: ["Skincare", "Makeup", "Hair Care", "Medical Supplies"],
  },
  {
    name: "Packaging & Printing",
    icon: Package,
    sub: ["Packaging Boxes", "Printing Services", "Adhesive Tapes"],
  },
  {
    name: "Construction & Real Estate",
    icon: HardHat,
    sub: ["Building Materials", "Doors & Windows", "Real Estate Services"],
  },
  {
    name: "Agriculture & Food",
    icon: Leaf,
    sub: ["Fresh Produce", "Packaged Food", "Agricultural Machinery"],
  },
  {
    name: "Toys, Kids & Babies",
    icon: ToyBrick,
    sub: ["Baby Care", "Educational Toys", "Outdoor Play"],
  },
  {
    name: "Raw Materials",
    icon: Droplets,
    sub: ["Metals & Alloys", "Chemicals", "Plastics & Polymers"],
  },
  {
    name: "Gifts & Crafts",
    icon: Paintbrush,
    sub: ["Corporate Gifting", "Handicrafts", "Festive Decor"],
  },
  {
    name: "Pet Supplies",
    icon: Dog,
    sub: ["Pet Food", "Pet Toys", "Grooming Supplies"],
  },
];
// --- Dummy Data for MSMEs ---
export const MSMEsData = [
  {
    id: 1,
    name: "Jaipur Textiles & Co.",
    logo: Shirt,
    verified: true,
    years: 5,
    staff: "50-100",
    revenue: "US$500,000+",
    rating: 4.9,
    reviews: 150,
    capabilities: {
      onTimeDelivery: "99.2%",
      responseTime: "<2h",
      customization: "Full customization",
      certifications: ["ISO 9001", "GOTS Certified"],
    },
    products: [
      {
        name: "Hand-Blocked Silk",
        image:
          "https://imgs.search.brave.com/6HJuEACLZWpQhz7sdFE83MNPUuAt06MtqOW2ok9Vu3o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFDb1B5dXlHOEwu/anBn",
        price: "₹450-600/m",
        minOrder: "50 meters",
      },
      {
        name: "Organic Cotton",
        image:
          "https://imgs.search.brave.com/7RpbBwDk9MExO-pYoVkiVuSXr4igMrdHkP1skbkieIg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YXpv/b2RsZS5jb20vY2Ru/L3Nob3AvcHJvZHVj/dHMvYmVkYTlkYzdf/NWZmNDA2ZGYtZGJk/OC00ZGVkLThhNzMt/YzZjZjVjZTNkMWNi/XzUxMng1MTIuanBn/P3Y9MTY3MTU0MzE2/NQ",
        price: "₹120-150/m",
        minOrder: "100 meters",
      },
    ],
    factoryImage:
      "https://imgs.search.brave.com/V8FULBtqYZJkPktbrRDfrjigiPOVHsENJJcCtNuCgv4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NjMwNDU3/MTU1ODUtNmM2ZThi/NTZkMWNiP2ZtPWpw/ZyZxPTYwJnc9MzAw/MCZpeGxpYj1yYi00/LjEuMCZpeGlkPU0z/d3hNakEzZkRCOE1I/eHpaV0Z5WTJoOE1U/TjhmRzlzWkNVeU1H/WmhZM1J2Y25sOFpX/NThNSHg4TUh4OGZE/QT0",
  },
  {
    id: 2,
    name: "Ahmedabad Precision Parts",
    logo: Factory,
    verified: true,
    years: 12,
    staff: "100-200",
    revenue: "US$2,000,000+",
    rating: 4.8,
    reviews: 210,
    capabilities: {
      onTimeDelivery: "100.0%",
      responseTime: "<1h",
      customization: "Minor customization",
      certifications: ["ISO 14001"],
    },
    products: [
      {
        name: "Hydraulic Pumps",
        image:
          "https://imgs.search.brave.com/k14e-gO8HNsGcmRC1eAfY0jqcBjb8dhtvEaW_1Vhf9Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQy/MTAxNjkwMS9waG90/by9oeWRyYXVsaWMt/cHVtcHMtb24tZXho/aWJpdGlvbi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9M09S/UTdCYTBacmhNdlVV/TW14VDlfZGlhUkdP/eEVCLXNfbG1laWdj/VmppST0",
        price: "₹35,000/unit",
        minOrder: "10 units",
      },
      {
        name: "Ball Valves",
        image:
          "https://imgs.search.brave.com/72_vjrLRIkNv03gpdcFZAHtb-BcpMUD2-EqSCFXCZ3A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9iYWxs/LXZhbHZlcy5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMTkv/MTIvYmFsbF9tYWlu/LmpwZw",
        price: "₹8,500/unit",
        minOrder: "50 units",
      },
    ],
    factoryImage:
      "https://imgs.search.brave.com/92fbd56x5veT-yv_leVdqtQfJaC4Ha0ePfbL3QuU3SQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pcm9uLXN0ZWVs/LWZhY3RvcnktcGlw/ZS1taWxsLWxvY2F0/ZWQtdGFnYW5yb2ct/c291dGgtcnVzc2lh/XzIxNTI3NC03NjUu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw",
  },
  {
    id: 3,
    name: "Global Electronics Sourcing",
    logo: Smartphone,
    verified: true,
    years: 2,
    staff: "20-50",
    revenue: "US$1,000,000+",
    rating: 4.7,
    reviews: 95,
    capabilities: {
      onTimeDelivery: "97.5%",
      responseTime: "<4h",
      customization: "ODM service available",
      certifications: ["CE Certified", "RoHS Compliant"],
    },
    products: [
      {
        name: "TWS Earbuds",
        image:
          "https://imgs.search.brave.com/3fEsGfesy5LrSbXicuv8hqDrIk2ks0onfFQOwhh5LfM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/amJsLmNvbS9kdy9p/bWFnZS92Mi9CRk5E/X1BSRC9vbi9kZW1h/bmR3YXJlLnN0YXRp/Yy8tL1NpdGVzLW1h/c3RlckNhdGFsb2df/SGFybWFuL2RlZmF1/bHQvZHdjMTFlYzBi/YS9KQkxfUXVhbnR1/bSUyMFRXU19Qcm9k/dWN0JTIwSW1hZ2Vf/T3Blbi5wbmc_c3c9/NTM1JnNoPTUzNQ",
        price: "₹800-1,200/pc",
        minOrder: "100 pieces",
      },
      {
        name: "Smart Watches",
        image:
          "https://imgs.search.brave.com/3ybUazezltGKBmP_uH87jHyhskzJ1GCsvnKjs3k-svA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z3N0YXRpYy5jb20v/bWFya2V0aW5nLWNt/cy9hc3NldHMvaW1h/Z2VzL2UzLzNmLzBk/NjBmMjA3NGZmZWE1/ZDYyMjVkZjY0NjEy/YjUvY2FsbS0yeC5w/bmc9bi13NTYyLWg0/MDctZmNyb3A2ND0x/LDA0NWUwMDAwZmJh/MmZmZmYtcnc",
        price: "₹1,800-2,500/pc",
        minOrder: "50 pieces",
      },
    ],
    factoryImage:
      "https://imgs.search.brave.com/RcDWVpdtjnvhbUycZBX2XVhwPktsi0Hm3piLodfM8jg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTAv/NjgwLzkzNy9zbWFs/bC93b3JrZXJzLWFz/c2VtYmxlLWVsZWN0/cm9uaWMtY29tcG9u/ZW50cy1vbi1hLXBy/b2R1Y3Rpb24tbGlu/ZS1pbi1hLWZhY3Rv/cnktZHVyaW5nLWV2/ZW5pbmctaG91cnMt/aW4tYS1idXN0bGlu/Zy1pbmR1c3RyaWFs/LXNldHRpbmctcGhv/dG8uanBn",
  },
];



