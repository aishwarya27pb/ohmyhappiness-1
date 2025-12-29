
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // Employee Welcome Kits
  {
    id: 'wk1',
    name: 'Day One Onboarding Box',
    price: 145,
    category: 'Employee Welcome Kits',
    description: 'The ultimate first-day experience. Includes a custom hoodie, insulated tumbler, hardbound journal, and tech organizer. Designed to make every new hire feel like a VIP from the moment they open the lid.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    isCustomizable: true,
    colors: ['Corporate Navy', 'Tech Grey', 'Minimal White'],
    inStock: true
  },
  {
    id: 'wk2',
    name: 'Remote Starter Set',
    price: 95,
    category: 'Employee Welcome Kits',
    description: 'Essential gear for the modern home office: Ring light, noise-isolating buds, and a desk-friendly succulent. Perfect for distributed teams looking to maintain a high-quality video presence.',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    isCustomizable: true,
    inStock: true
  },

  // Client Gifts
  {
    id: 'cg1',
    name: 'Vantage Point Wine Set',
    price: 185,
    category: 'Client Gifts',
    description: 'A bottle of premium Cabernet paired with lead-free crystal glasses and a leather-wrapped corkscrew. A sophisticated choice for closing deals or celebrating milestones.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    isCustomizable: true,
    inStock: true
  },
  {
    id: 'cg2',
    name: 'Executive Tech Folio',
    price: 125,
    category: 'Client Gifts',
    description: 'Pebbled Italian leather folio designed to house an iPad Pro, legal pad, and premium pen. Elegance meets utility for the traveling executive.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    isCustomizable: true,
    inStock: false
  },

  // Eco-Friendly Gifts
  {
    id: 'eco1',
    name: 'Terra Recycled Tote',
    price: 28,
    category: 'Eco-Friendly Gifts',
    description: 'Ultra-durable tote made from 100% ocean-bound plastic. Perfect for daily commutes or weekend markets. Sustainably chic for the environmentally conscious brand.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    isCustomizable: true,
    colors: ['Sage', 'Stone', 'Ocean'],
    inStock: true
  },
  {
    id: 'eco2',
    name: 'Bamboo Desktop Garden',
    price: 42,
    category: 'Eco-Friendly Gifts',
    description: 'Sustainably sourced bamboo planter with easy-to-grow air plants and polished river stones. Brings a touch of nature to even the most crowded desk.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    isCustomizable: false,
    inStock: true
  },

  // Employee Gifts
  {
    id: 'eg1',
    name: 'Peak Performance Fleece',
    price: 72,
    category: 'Employee Gifts',
    description: 'Soft-touch performance fleece with discrete logo embroidery. Loved by engineering teams globally for its warmth and professional cut.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    isCustomizable: true,
    colors: ['Slate', 'Charcoal', 'Midnight'],
    inStock: true
  },

  // Drinkware
  {
    id: 'dw1',
    name: 'Prism Insulated Canteen',
    price: 38,
    category: 'Drinkware',
    description: 'Double-walled stainless steel bottle that keeps beverages ice-cold for 24 hours. Minimalist aesthetic that fits perfectly in a car cup holder or gym bag.',
    image: 'https://images.unsplash.com/photo-1602143307185-8a1a598103d1?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    isCustomizable: true,
    colors: ['Matte Black', 'Brushed Copper', 'Snow White'],
    inStock: true
  },
  {
    id: 'dw2',
    name: 'Fireside Ceramic Mug',
    price: 24,
    category: 'Drinkware',
    description: 'Hefty, hand-glazed ceramic mug with a wide handle for maximum comfort during morning calls. Each piece features unique glazing patterns.',
    image: 'https://images.unsplash.com/photo-1539375665275-f9ad415bf9ec?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    isCustomizable: true,
    inStock: true
  },

  // Promotional Products
  {
    id: 'pp1',
    name: 'Signature Branded Lanyards',
    price: 8,
    category: 'Promotional Products',
    description: 'High-quality woven polyester lanyards with premium metal clips. Bulk pricing applies for conferences and large-scale corporate events.',
    image: 'https://images.unsplash.com/photo-1610940882244-1fbcfe928bc6?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    isCustomizable: true,
    inStock: true
  },

  // Legacy/Originals for Variety
  {
    id: 'e2',
    name: 'Acoustics Noise-Cancelling Headphones',
    price: 249,
    category: 'Electronics',
    description: 'High-fidelity audio with premium comfort and industry-leading noise cancellation. The gold standard for focus in open-office environments.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    isCustomizable: true,
    inStock: true
  },
  {
    id: 'f2',
    name: 'Artisan Charcuterie Selection',
    price: 95,
    category: 'Food & Beverage',
    description: 'A curated spread of aged cheeses, cured meats, dried fruits, and gourmet crackers. Packed in a reusable wooden crate for a premium unboxing experience.',
    image: 'https://images.unsplash.com/photo-1540914129486-624ad0445768?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    isCustomizable: false,
    inStock: false
  }
];
