export const CATEGORIES = [
  "Food",
  "Outdoors",
  "Campus",
  "Entertainment",
  "Attractions",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Activity = {
  id: string;
  name: string;
  /** Shorter name for tight spots like cards, falls back to `name`. */
  shortName?: string;
  category: Category;
  location: string;
  cost: string;
  bestTime: string;
  goodFor: string;
  description: string;
  featured?: boolean;
};

export const ACTIVITIES: Activity[] = [
  {
    id: "memorial-union-terrace",
    name: "Memorial Union Terrace",
    category: "Campus",
    location: "Memorial Union, Langdon St",
    cost: "Free",
    bestTime: "Summer evenings",
    goodFor: "Friends, live music, sunsets",
    description:
      "The iconic sunburst chairs on the shore of Lake Mendota. Grab a scoop of ice cream or a drink, catch a free concert, and watch the sun go down over the lake.",
    featured: true,
  },
  {
    id: "picnic-point",
    name: "Picnic Point",
    category: "Outdoors",
    location: "University Bay Dr, on Lake Mendota",
    cost: "Free",
    bestTime: "Sunset, spring through fall",
    goodFor: "Walks, picnics, groups",
    description:
      "A wooded peninsula on Lake Mendota with walking trails, fire circles, and wide lake views. A classic spot for a sunset walk with friends.",
    featured: true,
  },
  {
    id: "henry-vilas-zoo",
    name: "Henry Vilas Zoo",
    category: "Attractions",
    location: "Vilas Park, near Lake Wingra",
    cost: "Free",
    bestTime: "Weekday mornings",
    goodFor: "Families, casual afternoons",
    description:
      "One of the few free zoos in the country, with red pandas, lions, and a children's zoo, all a short ride from campus.",
    featured: true,
  },
  {
    id: "majestic-theatre",
    name: "Majestic Theatre",
    category: "Entertainment",
    location: "King St, downtown",
    cost: "$$",
    bestTime: "Weekend nights",
    goodFor: "Concerts, dance nights",
    description:
      "A restored historic theater just off the Capitol Square that hosts touring bands, comedy, and dance parties in an intimate room.",
    featured: true,
  },
  {
    id: "ians-pizza",
    name: "Ian's Pizza",
    category: "Food",
    location: "State St",
    cost: "$",
    bestTime: "Late night",
    goodFor: "Quick bites, groups",
    description:
      "A Madison staple known for creative slices, like mac and cheese pizza. Perfect after a night out on State Street.",
  },
  {
    id: "dane-county-farmers-market",
    name: "Dane County Farmers' Market",
    shortName: "Farmers' Market",
    category: "Food",
    location: "Capitol Square",
    cost: "Free to browse",
    bestTime: "Saturday mornings, April–November",
    goodFor: "Morning strolls, local food",
    description:
      "The largest producer-only farmers' market in the country wraps around the Capitol every Saturday. Grab spicy cheese bread and a coffee and do a lap.",
  },
  {
    id: "lake-monona-kayaking",
    name: "Lake Monona Kayaking",
    category: "Outdoors",
    location: "Rentals along the Lake Monona shoreline",
    cost: "$$",
    bestTime: "Calm summer mornings",
    goodFor: "Adventure, pairs",
    description:
      "Paddle out for a view of the Capitol and Monona Terrace from the water. Rentals are available by the hour in the warmer months.",
  },
  {
    id: "chazen-museum-of-art",
    name: "Chazen Museum of Art",
    category: "Campus",
    location: "University Ave",
    cost: "Free",
    bestTime: "Rainy afternoons",
    goodFor: "Solo trips, dates",
    description:
      "UW–Madison's art museum, with a collection that spans centuries and continents. Admission is free and it's rarely crowded.",
  },
  {
    id: "glass-nickel-pizza",
    name: "Glass Nickel Pizza",
    category: "Food",
    location: "Atwood Ave",
    cost: "$$",
    bestTime: "Dinner",
    goodFor: "Groups, delivery nights",
    description:
      "A local favorite with a long list of specialty pies. The Fetalicious is the move.",
  },
  {
    id: "bascom-hill",
    name: "Bascom Hill",
    category: "Campus",
    location: "Top of Bascom Mall",
    cost: "Free",
    bestTime: "Fall, when the leaves turn",
    goodFor: "Photos, walks",
    description:
      "Climb the hill to Bascom Hall and sit with Abe Lincoln. The view down to the Capitol is one of the best on campus.",
  },
  {
    id: "olbrich-botanical-gardens",
    name: "Olbrich Botanical Gardens",
    category: "Attractions",
    location: "Atwood Ave, on Lake Monona",
    cost: "Free outdoor gardens",
    bestTime: "Late spring and summer",
    goodFor: "Dates, photos, quiet walks",
    description:
      "Sixteen acres of outdoor gardens, including a gilded Thai pavilion, plus a tropical conservatory that's perfect in the middle of winter.",
  },
  {
    id: "overture-center",
    name: "Overture Center",
    category: "Entertainment",
    location: "State St",
    cost: "$$–$$$",
    bestTime: "Show nights",
    goodFor: "Broadway tours, symphony",
    description:
      "Madison's performing arts center, hosting touring Broadway shows, the Madison Symphony Orchestra, and plenty of free community events.",
  },
  {
    id: "wisconsin-state-capitol",
    name: "Wisconsin State Capitol",
    category: "Attractions",
    location: "Capitol Square",
    cost: "Free",
    bestTime: "Summer, for the observation deck",
    goodFor: "Tours, history buffs",
    description:
      "Take a free guided tour of the Capitol and head up to the observation deck in summer for a panoramic view of the isthmus.",
  },
  {
    id: "babcock-dairy-store",
    name: "Babcock Dairy Store",
    category: "Food",
    location: "Babcock Hall, Linden Dr",
    cost: "$",
    bestTime: "Any warm afternoon",
    goodFor: "Ice cream runs",
    description:
      "Ice cream made on campus by UW's own dairy plant. Try a seasonal flavor and you'll understand the hype.",
  },
  {
    id: "uw-arboretum",
    name: "UW Arboretum",
    category: "Outdoors",
    location: "McCaffrey Dr",
    cost: "Free",
    bestTime: "Spring blooms and fall color",
    goodFor: "Hiking, birding, running",
    description:
      "Over a thousand acres of prairies, woodlands, and wetlands with miles of trails just south of campus. It feels a long way from the city.",
  },
  {
    id: "lakeshore-path",
    name: "Lakeshore Path",
    category: "Outdoors",
    location: "Along Lake Mendota, behind campus",
    cost: "Free",
    bestTime: "Early mornings",
    goodFor: "Biking, runs, walks",
    description:
      "A shaded path hugging Lake Mendota from Memorial Union out to Picnic Point. Great for a run or a slow walk between classes.",
  },
  {
    id: "camp-randall-stadium",
    name: "Camp Randall Stadium",
    category: "Campus",
    location: "Monroe St",
    cost: "$$",
    bestTime: "Fall game days",
    goodFor: "School spirit, big groups",
    description:
      "See a Badgers football game and stick around for Jump Around at the start of the fourth quarter. The whole stadium shakes.",
  },
  {
    id: "comedy-on-state",
    name: "Comedy on State",
    category: "Entertainment",
    location: "State St",
    cost: "$$",
    bestTime: "Weekend shows",
    goodFor: "Date nights, friends",
    description:
      "A comedy club right on State Street that brings in touring headliners and hosts open mic nights for local comics.",
  },
  {
    id: "monona-terrace",
    name: "Monona Terrace",
    category: "Attractions",
    location: "John Nolen Dr",
    cost: "Free rooftop",
    bestTime: "Summer evenings",
    goodFor: "Views, architecture fans",
    description:
      "A Frank Lloyd Wright–designed convention center with a rooftop garden overlooking Lake Monona. Look for free summer concerts on the roof.",
  },
  {
    id: "the-sett-bowling",
    name: "Bowling at The Sett",
    category: "Entertainment",
    location: "Union South",
    cost: "$",
    bestTime: "Weeknights",
    goodFor: "Groups, rainy days",
    description:
      "Bowling, billiards, and arcade games in the basement of Union South. Cheap, close, and good for a group that can't decide what to do.",
  },
];

export function getActivity(id: string): Activity | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}

export function isCategory(value: string | null | undefined): value is Category {
  return !!value && (CATEGORIES as readonly string[]).includes(value);
}
