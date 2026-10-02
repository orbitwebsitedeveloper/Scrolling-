/**
 * Master Real Estate Sequence Configuration
 * Starting with the exact video sequence:
 * (1) Underwater coral reef & diver -> (2) Surfacing at infinity pool -> (3) Aerial cliffside villa -> (4) Pool terrace glide -> (5) Sunset living room
 * Followed seamlessly by the interior tour:
 * (6) Grand Entrance Foyer -> (7) Chef Kitchen & Dining -> (8) Master Suite -> (9) Twilight Infinity Fire Terrace
 */

import imgUser01Underwater from '@/src/assets/images/user_01_underwater_reef_1790917788732.jpg';
import imgUser02Surfacing from '@/src/assets/images/user_02_surfacing_pool_1790917803051.jpg';
import imgUser03Cliffside from '@/src/assets/images/user_03_cliffside_villa_1790917821486.jpg';
import imgUser04Terrace from '@/src/assets/images/user_04_terrace_glide_1790917833950.jpg';
import imgUser05Living from '@/src/assets/images/user_05_living_room_1790917849930.jpg';
import imgEntrance from '@/src/assets/images/estate_grand_entrance_1790917414133.jpg';
import imgKitchen from '@/src/assets/images/estate_dining_kitchen_1790917473279.jpg';
import imgMasterSuite from '@/src/assets/images/estate_master_suite_1790917487605.jpg';
import imgTwilightTerrace from '@/src/assets/images/estate_infinity_terrace_1790917438724.jpg';

export interface EstateFrame {
  id: string;
  src: string;
  name: string;
  location?: string;
  zoomStart: number;
  zoomEnd: number;
  panXStart: number;
  panXEnd: number;
  panYStart: number;
  panYEnd: number;
}

export const ESTATE_FRAMES: EstateFrame[] = [
  // 1. User Sequence: Underwater Dive
  {
    id: 'user_01_underwater',
    src: imgUser01Underwater,
    name: 'Coastal Reef Ascent',
    location: 'Pacific Shallows',
    zoomStart: 1.0,
    zoomEnd: 1.15,
    panXStart: 0,
    panXEnd: -0.02,
    panYStart: 0.03,
    panYEnd: -0.03,
  },
  // 2. User Sequence: Surfacing at Edge of Infinity Pool
  {
    id: 'user_02_surfacing',
    src: imgUser02Surfacing,
    name: 'Surfacing At Infinity Pool',
    location: 'Water Line Horizon',
    zoomStart: 1.02,
    zoomEnd: 1.16,
    panXStart: 0.02,
    panXEnd: -0.02,
    panYStart: 0.02,
    panYEnd: -0.01,
  },
  // 3. User Sequence: Aerial Cliffside Villa Reveal
  {
    id: 'user_03_cliffside',
    src: imgUser03Cliffside,
    name: 'Cliffside Architectural Estate',
    location: 'Coastal Ridge',
    zoomStart: 1.0,
    zoomEnd: 1.14,
    panXStart: -0.02,
    panXEnd: 0.03,
    panYStart: 0.01,
    panYEnd: -0.02,
  },
  // 4. User Sequence: Infinity Pool Terrace Glide
  {
    id: 'user_04_terrace',
    src: imgUser04Terrace,
    name: 'Infinity Pool Pavilion Glide',
    location: 'Outdoor Promenade',
    zoomStart: 1.02,
    zoomEnd: 1.15,
    panXStart: -0.03,
    panXEnd: 0.02,
    panYStart: 0,
    panYEnd: -0.03,
  },
  // 5. User Sequence: Sunset Living Room Pavilion
  {
    id: 'user_05_living',
    src: imgUser05Living,
    name: 'Sunset Living Pavilion',
    location: 'Main Residence',
    zoomStart: 1.0,
    zoomEnd: 1.14,
    panXStart: 0.02,
    panXEnd: -0.02,
    panYStart: 0.01,
    panYEnd: -0.02,
  },
  // 6. Our Sequence: Grand Entrance Foyer
  {
    id: 'estate_entrance',
    src: imgEntrance,
    name: 'Grand Entrance & Waterfall Wall',
    location: 'Atrium Foyer',
    zoomStart: 1.02,
    zoomEnd: 1.13,
    panXStart: -0.02,
    panXEnd: 0.02,
    panYStart: 0.01,
    panYEnd: -0.02,
  },
  // 7. Our Sequence: Chef Kitchen & Dining Pavilion
  {
    id: 'estate_kitchen',
    src: imgKitchen,
    name: 'Chef Kitchen & Dining Island',
    location: 'Culinary Pavilion',
    zoomStart: 1.0,
    zoomEnd: 1.14,
    panXStart: 0.02,
    panXEnd: -0.03,
    panYStart: -0.01,
    panYEnd: 0.02,
  },
  // 8. Our Sequence: Master Bedroom Sanctuary Suite
  {
    id: 'estate_master',
    src: imgMasterSuite,
    name: 'Master Sanctuary & Balcony',
    location: 'Upper Penthouse Suite',
    zoomStart: 1.02,
    zoomEnd: 1.15,
    panXStart: -0.02,
    panXEnd: 0.02,
    panYStart: 0.02,
    panYEnd: -0.01,
  },
  // 9. Our Sequence: Twilight Ocean Fire Terrace
  {
    id: 'estate_twilight_terrace',
    src: imgTwilightTerrace,
    name: 'Twilight Fire Pit & Ocean Horizon',
    location: 'Sunset Bluff',
    zoomStart: 1.0,
    zoomEnd: 1.18,
    panXStart: 0.02,
    panXEnd: -0.03,
    panYStart: 0,
    panYEnd: -0.03,
  },
];
