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

export const marketplaceProducts: Product[] = [
  {
    id: 1,
    category: "laptops",
    name: "2023 Hot Selling Laptop Windows 11",
    price: "₹21,687 - ₹25,435",
    seller: "DI Xiang Industrial",
    image: "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 2,
    category: "laptops",
    name: "Original Fairly Brand New Laptops",
    price: "₹11,602 - ₹19,188",
    seller: "Verified Electronics",
    image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 3,
    category: "laptops",
    name: "High-Performance Gaming Laptop",
    price: "₹85,000 - ₹95,000",
    seller: "Gamer's Hub",
    image: "https://images.pexels.com/photos/7915228/pexels-photo-7915228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 4,
    category: "textiles",
    name: "Organic Cotton Fabric (40s Count)",
    price: "₹120 - ₹150 /meter",
    seller: "Ludhiana Textile Mills",
    image: "https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 5,
    category: "textiles",
    name: "Hand-Blocked Print Silk Fabric",
    price: "₹450 - ₹600 /meter",
    seller: "Jaipur Prints Co.",
    image: "https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 6,
    category: "industrial",
    name: "Stainless Steel Ball Valves (DN50)",
    price: "₹8,500 /unit",
    seller: "Precision Engineering",
    image: "https://images.pexels.com/photos/8459275/pexels-photo-8459275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 7,
    category: "apparel",
    name: "Men's Formal Cotton Shirts",
    price: "₹450 - ₹700",
    seller: "Tiruppur Garments",
    image: "https://images.pexels.com/photos/5905915/pexels-photo-5905915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 8,
    category: "health",
    name: "N95 Protective Face Masks",
    price: "₹15 - ₹25 /piece",
    seller: "Surat Medical Supplies",
    image: "https://images.pexels.com/photos/3951615/pexels-photo-3951615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 9,
    category: "auto",
    name: "Motorcycle Alloy Wheels",
    price: "₹3,500 - ₹5,000 /set",
    seller: "Delhi Auto Parts",
    image: "https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 10,
    category: "electronics",
    name: "Smart Watch with AMOLED Display",
    price: "₹1,800 - ₹2,500",
    seller: "Shenzhen Tech",
    image: "https://images.pexels.com/photos/207823/pexels-photo-207823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: false,
  },
  {
    id: 11,
    category: "agriculture",
    name: "Premium Basmati Rice",
    price: "₹80 - ₹120 /kg",
    seller: "Haryana Rice Mills",
    image: "https://images.pexels.com/photos/1547738/pexels-photo-1547738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 12,
    category: "construction",
    name: "UPVC Windows and Doors",
    price: "₹450 /sq.ft",
    seller: "Jaipur Fabricators",
    image: "https://images.pexels.com/photos/221016/pexels-photo-221016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
];

export const initialUserListedProducts: Product[] = [
  {
    id: 101,
    name: "Premium Packaging Box Kit (Pack of 100)",
    price: "₹2,500",
    seller: "Your Storefront",
    image: "https://images.pexels.com/photos/7208103/pexels-photo-7208103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 102,
    name: "MSME Precision Tool Set (45 Pieces)",
    price: "₹12,000",
    seller: "Your Storefront",
    image: "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 103,
    name: "Certified LED Bulbs (10W, Pack of 50)",
    price: "₹3,750",
    seller: "Your Storefront",
    image: "https://images.pexels.com/photos/8133591/pexels-photo-8133591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
  {
    id: 104,
    name: "Industrial Safety Helmets (Yellow)",
    price: "₹250 /piece",
    seller: "Your Storefront",
    image: "https://images.pexels.com/photos/5693422/pexels-photo-5693422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    certified: true,
  },
];

export const categories = [
    { name: "Industrial Machinery", icon: Factory, sub: ["Construction Machinery", "Manufacturing Equipment", "Tools & Hardware"] },
    { name: "Consumer Electronics", icon: Smartphone, sub: ["Mobile Phones", "Laptops & Gaming", "Smart Watches & Accessories"] },
    { name: "Vehicles & Transportation", icon: Truck, sub: ["Trucks & Buses", "Motorcycles", "Auto Parts & Accessories"] },
    { name: "Apparel & Accessories", icon: Shirt, sub: ["Men's Clothing", "Women's Clothing", "Fashion Accessories"] },
    { name: "Jewelry, Eyewear, Watches", icon: Gem, sub: ["Fine Jewelry", "Fashion Watches", "Eyeglasses & Frames"] },
    { name: "Home & Garden", icon: Building, sub: ["Furniture", "Garden Supplies", "Home Decor", "Home Appliances"] },
    { name: "Beauty & Personal Care", icon: HeartPulse, sub: ["Skincare", "Makeup", "Hair Care", "Medical Supplies"] },
    { name: "Packaging & Printing", icon: Package, sub: ["Packaging Boxes", "Printing Services", "Adhesive Tapes"] },
    { name: "Construction & Real Estate", icon: HardHat, sub: ["Building Materials", "Doors & Windows", "Real Estate Services"] },
    { name: "Agriculture & Food", icon: Leaf, sub: ["Fresh Produce", "Packaged Food", "Agricultural Machinery"] },
    { name: "Toys, Kids & Babies", icon: ToyBrick, sub: ["Baby Care", "Educational Toys", "Outdoor Play"] },
    { name: "Raw Materials", icon: Droplets, sub: ["Metals & Alloys", "Chemicals", "Plastics & Polymers"] },
    { name: "Gifts & Crafts", icon: Paintbrush, sub: ["Corporate Gifting", "Handicrafts", "Festive Decor"] },
    { name: "Pet Supplies", icon: Dog, sub: ["Pet Food", "Pet Toys", "Grooming Supplies"] },
];

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
    capabilities: { onTimeDelivery: "99.2%", responseTime: "<2h", customization: "Full customization", certifications: ["ISO 9001", "GOTS Certified"] },
    products: [
      { name: "Hand-Blocked Silk", image: "https://images.pexels.com/photos/8459275/pexels-photo-8459275.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2", price: "₹450-600/m", minOrder: "50 meters" },
      { name: "Organic Cotton", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2", price: "₹120-150/m", minOrder: "100 meters" },
    ],
    factoryImage: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
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
    capabilities: { onTimeDelivery: "100.0%", responseTime: "<1h", customization: "Minor customization", certifications: ["ISO 14001"] },
    products: [
      { name: "Hydraulic Pumps", image: "https://images.pexels.com/photos/6754395/pexels-photo-6754395.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2", price: "₹35,000/unit", minOrder: "10 units" },
      { name: "Ball Valves", image: "https://images.pexels.com/photos/4178885/pexels-photo-4178885.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2", price: "₹8,500/unit", minOrder: "50 units" },
    ],
    factoryImage: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
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
    capabilities: { onTimeDelivery: "97.5%", responseTime: "<4h", customization: "ODM service available", certifications: ["CE Certified", "RoHS Compliant"] },
    products: [
      { name: "TWS Earbuds", image: "https://images.pexels.com/photos/7156881/pexels-photo-7156881.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2", price: "₹800-1,200/pc", minOrder: "100 pieces" },
      { name: "Smart Watches", image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2", price: "₹1,800-2,500/pc", minOrder: "50 pieces" },
    ],
    factoryImage: "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2",
  },
];