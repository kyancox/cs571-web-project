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
  /** [latitude, longitude] for the embedded map. */
  coords: [number, number];
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
    coords: [43.0766, -89.3999],
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
    coords: [43.088, -89.416],
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
    coords: [43.0601, -89.4093],
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
    coords: [43.0743, -89.3804],
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
    coords: [43.0749, -89.3871],
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
    coords: [43.0747, -89.3842],
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
    coords: [43.0636, -89.3933],
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
    coords: [43.0737, -89.4004],
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
    coords: [43.0927, -89.3505],
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
    coords: [43.0753, -89.4041],
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
    coords: [43.0927, -89.3335],
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
    coords: [43.0743, -89.3881],
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
    coords: [43.0747, -89.3842],
    cost: "Free",
    bestTime: "Summer, for the observation deck",
    goodFor: "Tours, history buffs",
    description:
      "Take a free guided tour of the Capitol and head up to the observation deck in summer for a panoramic view of the isthmus.",
  },
  {
    id: "uw-arboretum",
    name: "UW Arboretum",
    category: "Outdoors",
    location: "McCaffrey Dr",
    coords: [43.0418, -89.4268],
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
    coords: [43.0788, -89.412],
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
    coords: [43.07, -89.4128],
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
    coords: [43.0746, -89.3887],
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
    coords: [43.0716, -89.3801],
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
    coords: [43.0718, -89.4078],
    cost: "$",
    bestTime: "Weeknights",
    goodFor: "Groups, rainy days",
    description:
      "Bowling, billiards, and arcade games in the basement of Union South. Cheap, close, and good for a group that can't decide what to do.",
  },
  {
    id: "mickies-dairy-bar",
    name: "Mickies Dairy Bar",
    category: "Food",
    location: "Monroe St, across from Camp Randall",
    coords: [43.0679, -89.4112],
    cost: "$",
    bestTime: "Weekend mornings, get there early",
    goodFor: "Big breakfasts, hangovers",
    description:
      "A cash-only diner that's been serving students for decades. Order the scrambler and a malt, and don't plan on eating again until dinner.",
  },
  {
    id: "the-old-fashioned",
    name: "The Old Fashioned",
    category: "Food",
    location: "Capitol Square",
    coords: [43.0764, -89.3832],
    cost: "$$",
    bestTime: "Friday fish fry",
    goodFor: "Visiting parents, Wisconsin classics",
    description:
      "A Wisconsin supper club–style tavern on the Square with fried cheese curds, a long beer list, and a brandy old fashioned to match the name.",
  },
  {
    id: "michaels-frozen-custard",
    name: "Michael's Frozen Custard",
    shortName: "Michael's Custard",
    category: "Food",
    location: "Monroe St",
    coords: [43.0587, -89.4255],
    cost: "$",
    bestTime: "Summer nights",
    goodFor: "Dessert, dates",
    description:
      "Thick, rich Wisconsin frozen custard by the cone, sundae, or malt. Check the flavor of the day before you go.",
  },
  {
    id: "lao-laan-xang",
    name: "Lao Laan-Xang",
    category: "Food",
    location: "Williamson St",
    coords: [43.082, -89.3676],
    cost: "$$",
    bestTime: "Dinner",
    goodFor: "Trying something new",
    description:
      "A long-running family restaurant serving Laotian dishes on Willy Street. The larb and the curry are local favorites.",
  },
  {
    id: "tenney-park-skating",
    name: "Ice Skating at Tenney Park",
    shortName: "Tenney Park Skating",
    category: "Outdoors",
    location: "Tenney Park, near Lake Mendota",
    coords: [43.0928, -89.3685],
    cost: "Free",
    bestTime: "Mid-winter, once the ice is safe",
    goodFor: "Winter dates, groups",
    description:
      "When it gets cold enough, the city maintains skating on the Tenney Park lagoon. Bring your own skates or rent a pair nearby and loop under the old stone bridges.",
  },
  {
    id: "james-madison-park",
    name: "James Madison Park",
    category: "Outdoors",
    location: "Gorham St, on Lake Mendota",
    coords: [43.0812, -89.379],
    cost: "Free",
    bestTime: "Hot summer afternoons",
    goodFor: "Swimming, volleyball, picnics",
    description:
      "A lakefront park with a swimming beach and sand volleyball courts, a short walk from the Capitol. A great spot to cool off in the summer.",
  },
  {
    id: "wingra-boats",
    name: "Canoeing on Lake Wingra",
    shortName: "Lake Wingra Canoeing",
    category: "Outdoors",
    location: "Wingra Park, Monroe St",
    coords: [43.0577, -89.4242],
    cost: "$$",
    bestTime: "Summer weekends",
    goodFor: "Pairs, beginners",
    description:
      "Lake Wingra is small, calm, and ringed by the Arboretum, which makes it a great lake for first-time paddlers. Rent a canoe or paddleboard by the hour.",
  },
  {
    id: "southwest-commuter-path",
    name: "Southwest Commuter Path",
    shortName: "SW Commuter Path",
    category: "Outdoors",
    location: "Starts near Camp Randall",
    coords: [43.0675, -89.415],
    cost: "Free",
    bestTime: "Fall afternoons",
    goodFor: "Biking, long runs",
    description:
      "A paved rail trail that cuts through the west side under a canopy of trees. Ride it out toward Fitchburg and connect to the Capital City Trail for a longer loop.",
  },
  {
    id: "observatory-hill",
    name: "Observatory Hill",
    category: "Campus",
    location: "Observatory Dr",
    coords: [43.077, -89.407],
    cost: "Free",
    bestTime: "Sunset",
    goodFor: "Sunsets, quiet moments",
    description:
      "A grassy hilltop above Lake Mendota with ancient effigy mounds and one of the best sunset views on campus.",
  },
  {
    id: "allen-centennial-garden",
    name: "Allen Centennial Garden",
    category: "Campus",
    location: "Observatory Dr",
    coords: [43.076, -89.4146],
    cost: "Free",
    bestTime: "Late spring and summer",
    goodFor: "Studying outside, photos",
    description:
      "A free botanical garden tucked into campus with themed garden rooms, a pond, and plenty of benches for reading.",
  },
  {
    id: "washburn-observatory",
    name: "Washburn Observatory",
    category: "Campus",
    location: "Observatory Dr",
    coords: [43.0766, -89.4085],
    cost: "Free",
    bestTime: "Clear nights during public viewings",
    goodFor: "Stargazing, dates",
    description:
      "UW's historic 1878 observatory holds public viewing nights when the sky is clear. Check the schedule and take a look through the telescope.",
  },
  {
    id: "uw-geology-museum",
    name: "UW Geology Museum",
    category: "Campus",
    location: "Weeks Hall, Dayton St",
    coords: [43.0716, -89.4058],
    cost: "Free",
    bestTime: "Weekday afternoons",
    goodFor: "Dinosaur fans, rainy days",
    description:
      "A free museum with a mastodon skeleton, dinosaur fossils, and a walk-through cave model. A surprisingly fun half hour.",
  },
  {
    id: "badger-volleyball",
    name: "Badger Volleyball at the Field House",
    shortName: "Badger Volleyball",
    category: "Campus",
    location: "UW Field House, Monroe St",
    coords: [43.0695, -89.414],
    cost: "$",
    bestTime: "Fall match nights",
    goodFor: "School spirit, friends",
    description:
      "Wisconsin volleyball packs the historic Field House with one of the loudest crowds in college sports. Student tickets go fast.",
  },
  {
    id: "kohl-center",
    name: "Badger Hockey & Basketball at the Kohl Center",
    shortName: "Kohl Center",
    category: "Campus",
    location: "Kohl Center, Dayton St",
    coords: [43.0695, -89.3969],
    cost: "$$",
    bestTime: "Winter game nights",
    goodFor: "School spirit, big groups",
    description:
      "Cheer on Badger basketball or hockey with the student section. The band and the crowd make it worth going even if you don't follow the sport.",
  },
  {
    id: "the-orpheum",
    name: "Orpheum Theater",
    category: "Entertainment",
    location: "State St",
    coords: [43.0746, -89.3893],
    cost: "$$",
    bestTime: "Concert nights",
    goodFor: "Live music, friends",
    description:
      "A 1920s movie palace on State Street that now hosts touring bands and comedians under its ornate ceiling.",
  },
  {
    id: "high-noon-saloon",
    name: "High Noon Saloon",
    category: "Entertainment",
    location: "E Washington Ave",
    coords: [43.0809, -89.3741],
    cost: "$–$$",
    bestTime: "Weekend shows",
    goodFor: "Indie shows, local bands",
    description:
      "A laid-back music venue on the east side known for indie and local acts. Small enough that every spot has a good view.",
  },
  {
    id: "barrymore-theatre",
    name: "Barrymore Theatre",
    category: "Entertainment",
    location: "Atwood Ave",
    coords: [43.0889, -89.3582],
    cost: "$$",
    bestTime: "Show nights",
    goodFor: "Concerts, comedy, films",
    description:
      "A community-run theater on the east side that books everything from folk singers to stand-up. Grab dinner on Atwood Avenue before the show.",
  },
  {
    id: "madison-mallards",
    name: "Madison Mallards Game",
    shortName: "Mallards Game",
    category: "Entertainment",
    location: "Warner Park, north side",
    coords: [43.1288, -89.3627],
    cost: "$",
    bestTime: "Summer nights",
    goodFor: "Groups, cheap summer fun",
    description:
      "Summer collegiate baseball at the Duck Pond with goofy promotions, fireworks nights, and a crowd that's there more for the vibes than the box score.",
  },
  {
    id: "union-south-movies",
    name: "Free Movies at Union South",
    shortName: "Union South Movies",
    category: "Entertainment",
    location: "Marquee Theater, Union South",
    coords: [43.0718, -89.4078],
    cost: "Free",
    bestTime: "Weekend nights",
    goodFor: "Cheap dates, movie nights",
    description:
      "The Wisconsin Union Directorate screens recent releases and classics for free in the Marquee Theater. Hard to beat the price.",
  },
  {
    id: "madison-museum-of-contemporary-art",
    name: "Madison Museum of Contemporary Art",
    shortName: "MMoCA",
    category: "Attractions",
    location: "State St, inside the Overture Center",
    coords: [43.0748, -89.3887],
    cost: "Free",
    bestTime: "Gallery nights",
    goodFor: "Art lovers, dates",
    description:
      "A free contemporary art museum with rotating exhibitions and a rooftop sculpture garden that hosts events in the summer.",
  },
  {
    id: "wisconsin-veterans-museum",
    name: "Wisconsin Veterans Museum",
    shortName: "Veterans Museum",
    category: "Attractions",
    location: "Capitol Square",
    coords: [43.0749, -89.3851],
    cost: "Free",
    bestTime: "Before the farmers' market",
    goodFor: "History buffs",
    description:
      "A free museum on the Square that traces Wisconsin's military history from the Civil War to today, with full-size aircraft hanging overhead.",
  },
  {
    id: "art-fair-on-the-square",
    name: "Art Fair on the Square",
    category: "Attractions",
    location: "Capitol Square",
    coords: [43.0747, -89.3842],
    cost: "Free to browse",
    bestTime: "A weekend in July",
    goodFor: "Browsing, people-watching",
    description:
      "Hundreds of artists set up booths around the Capitol for one summer weekend. Wander, snack, and pick up something for your apartment walls.",
  },
  {
    id: "garver-feed-mill",
    name: "Garver Feed Mill",
    category: "Attractions",
    location: "Near Olbrich Gardens, east side",
    coords: [43.0899, -89.3378],
    cost: "Free to visit",
    bestTime: "Weekend afternoons",
    goodFor: "Local shops, coffee",
    description:
      "A restored century-old feed mill turned home to local makers, food producers, and events. Pair it with a walk through Olbrich next door.",
  },
  {
    id: "willy-street",
    name: "Williamson Street",
    shortName: "Willy Street",
    category: "Attractions",
    location: "Near east side",
    coords: [43.0813, -89.369],
    cost: "Free to wander",
    bestTime: "Weekend afternoons",
    goodFor: "Thrifting, coffee, people-watching",
    description:
      "A funky east side street packed with independent shops, the Willy Street Co-op, and plenty of places to eat. Visit during the Willy Street Fair in September.",
  },
];

/**
 * Activities hidden from the site until we have a photo for them.
 * Move one back into ACTIVITIES once it has an entry in lib/activity-images.json.
 */
export const HIDDEN_ACTIVITIES: Activity[] = [
  {
    id: "babcock-dairy-store",
    name: "Babcock Dairy Store",
    category: "Food",
    location: "Babcock Hall, Linden Dr",
    coords: [43.0753, -89.4126],
    cost: "$",
    bestTime: "Any warm afternoon",
    goodFor: "Ice cream runs",
    description:
      "Ice cream made on campus by UW's own dairy plant. Try a seasonal flavor and you'll understand the hype.",
  },
  {
    id: "greenbush-bakery",
    name: "Greenbush Bakery",
    category: "Food",
    location: "Regent St",
    coords: [43.0681, -89.4061],
    cost: "$",
    bestTime: "Late night",
    goodFor: "Donut runs, study breaks",
    description:
      "A tiny kosher bakery famous for its apple fritters and sour cream donuts. It's open late, so it's the perfect end to a long night.",
  },
  {
    id: "library-mall-food-carts",
    name: "Library Mall Food Carts",
    shortName: "Library Mall Carts",
    category: "Food",
    location: "Library Mall, end of State St",
    coords: [43.0757, -89.3995],
    cost: "$",
    bestTime: "Weekday lunch, warm months",
    goodFor: "Cheap lunch between classes",
    description:
      "A rotating lineup of food carts parks at the foot of State Street. Walk the row, pick whatever smells best, and eat on the steps of the Memorial Library.",
  },
  {
    id: "short-stack-eatery",
    name: "Short Stack Eatery",
    category: "Food",
    location: "Gorham St, off State St",
    coords: [43.0742, -89.3908],
    cost: "$$",
    bestTime: "Brunch",
    goodFor: "Brunch with friends",
    description:
      "A breakfast spot built around pancakes and scratch-made comfort food, with a Bloody Mary bar that draws a weekend line.",
  },
  {
    id: "elver-park-sledding",
    name: "Sledding at Elver Park",
    shortName: "Elver Park Sledding",
    category: "Outdoors",
    location: "West side, off McKenna Blvd",
    coords: [43.0412, -89.5068],
    cost: "Free",
    bestTime: "After a big snowfall",
    goodFor: "Friends, snow days",
    description:
      "One of the biggest sledding hills in the city. Grab a cafeteria tray or a real sled and make a day of it after the first good snow.",
  },
  {
    id: "hoofer-sailing",
    name: "Hoofer Sailing Club",
    category: "Outdoors",
    location: "Memorial Union pier",
    coords: [43.077, -89.4],
    cost: "$$",
    bestTime: "Spring through fall",
    goodFor: "Learning to sail, meeting people",
    description:
      "One of the largest inland sailing clubs in the country, run out of the Memorial Union. Membership gets you lessons and access to the fleet on Lake Mendota.",
  },
  {
    id: "concerts-on-the-square",
    name: "Concerts on the Square",
    category: "Entertainment",
    location: "Capitol Square",
    coords: [43.0747, -89.3842],
    cost: "Free",
    bestTime: "Wednesday evenings in summer",
    goodFor: "Picnics, big groups",
    description:
      "The Wisconsin Chamber Orchestra plays free outdoor concerts on the Capitol lawn each summer. Bring a blanket, a picnic, and some friends.",
  },
];

export function getActivity(id: string): Activity | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}

export function isCategory(value: string | null | undefined): value is Category {
  return !!value && (CATEGORIES as readonly string[]).includes(value);
}
