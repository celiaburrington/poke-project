import { LocationName } from "../../types/location.types";
// Last Done: 721, All of Gen VI

// Forest
const FOREST = [
  2, 10, 11, 12, 13, 14, 16, 17, 18, 21, 25, 46, 47, 69, 83, 152, 153, 154, 162,
  214, 234, 252, 253, 254, 261, 265, 266, 267, 268, 269, 273, 387, 388, 389,
  438, 486, 495, 496, 497, 519, 520, 521, 532, 540, 541, 542, 566, 567, 640,
  650, 651, 652, 664, 665,
];
const CALM_CLEARING = [
  12, 13, 14, 19, 21, 29, 32, 43, 96, 97, 123, 127, 128, 133, 161, 162, 165,
  166, 172, 187, 188, 189, 235, 252, 253, 276, 280, 396, 397, 398, 399, 400,
  401, 402, 427, 428, 517, 518, 546, 547, 548, 549, 585, 586,
];
// eevee-lutions
const MYSTIC_GROVE = [
  23, 24, 26, 31, 34, 35, 36, 39, 40, 113, 122, 124, 132, 133, 134, 135, 136,
  137, 151, 174, 175, 176, 196, 251, 267, 280, 281, 282, 406, 439, 440, 470,
  475, 487, 492, 570, 571, 574, 575, 576, 653, 654, 655, 677, 678, 700,
];
// umbreon: 197
const DEEP_DARK_WOODS = [
  10, 11, 12, 19, 20, 31, 34, 41, 42, 44, 45, 46, 47, 56, 57, 69, 70, 71, 88,
  92, 93, 114, 163, 164, 185, 197, 200, 216, 217, 253, 262, 273, 274, 275, 285,
  286, 412, 413, 414, 430, 465, 491, 509, 510, 543, 544, 545, 590, 591, 674,
  675, 708, 709, 710, 711,
];
const JUNGLE = [
  1, 2, 3, 10, 11, 12, 19, 20, 24, 45, 46, 47, 48, 49, 52, 53, 56, 57, 102, 103,
  152, 153, 154, 167, 168, 190, 203, 204, 205, 269, 272, 287, 288, 289, 252,
  357, 390, 391, 392, 424, 441, 451, 452, 495, 511, 512, 513, 514,
];

// Town
const TOWN = [
  16, 19, 20, 21, 36, 52, 53, 58, 66, 67, 68, 122, 143, 161, 162, 172, 179, 185,
  209, 210, 235, 236, 237, 241, 263, 276, 300, 301, 333, 351, 358, 431, 432,
  446, 494, 506, 538, 539, 582, 676,
];
const ABANDONED_POWER_PLANT = [
  19, 20, 21, 23, 24, 29, 30, 32, 33, 41, 42, 66, 74, 81, 82, 88, 89, 100, 101,
  109, 110, 239, 261, 262, 263, 316, 317, 353, 354, 374, 434, 435, 436, 437,
  474, 504, 505, 532, 533, 534, 568, 569, 607, 608, 609, 649, 707, 708, 718,
];
const SOLAR_PANEL_FARM = [
  12, 21, 22, 25, 26, 81, 82, 100, 101, 125, 145, 172, 179, 180, 181, 187, 188,
  189, 191, 192, 239, 309, 310, 311, 312, 403, 404, 405, 417, 462, 466, 479,
  522, 523, 587, 702,
];
const STRANGE_RUINS = [
  63, 64, 65, 92, 93, 94, 122, 137, 150, 200, 201, 233, 343, 344, 355, 356, 379,
  384, 386, 429, 433, 442, 477, 483, 484, 493, 605, 606, 621, 622, 623, 624,
  625, 642, 646, 648, 679, 680, 681, 703, 716, 717,
];

// Plains
const MEADOW = [
  10, 11, 12, 16, 17, 19, 20, 21, 23, 43, 44, 77, 78, 84, 96, 97, 108, 123, 128,
  133, 161, 162, 179, 180, 181, 212, 241, 263, 264, 309, 327, 335, 336, 387,
  463, 504, 506, 507, 508, 531, 577, 578, 579, 626, 641, 667, 668, 672, 673,
];
const FLOWER_FIELD = [
  3, 10, 11, 12, 15, 16, 39, 40, 69, 70, 77, 123, 132, 133, 152, 153, 154, 174,
  179, 180, 181, 182, 242, 313, 314, 315, 401, 406, 407, 415, 416, 417, 420,
  421, 506, 572, 573, 666, 669, 670, 671, 682, 683, 684, 685,
];

// Freshwater
const RIVER = [
  54, 55, 60, 61, 62, 72, 79, 80, 83, 118, 119, 158, 183, 184, 193, 194, 199,
  202, 258, 259, 270, 271, 283, 284, 339, 340, 349, 370, 400, 418, 419, 469,
  482, 501, 502, 503, 515, 516, 535, 550, 580, 581, 656, 657, 690,
];
const SWAMP = [
  23, 24, 44, 45, 60, 61, 62, 71, 88, 89, 92, 93, 109, 110, 158, 159, 160, 186,
  194, 195, 258, 259, 260, 270, 271, 272, 316, 317, 360, 451, 452, 453, 454,
  469, 535, 536, 537, 588, 589, 616, 617, 618, 656, 657, 658, 690, 691, 704,
  705, 706,
];

// Ocean
const OCEAN = [
  7, 8, 9, 54, 55, 72, 73, 79, 80, 90, 91, 98, 99, 118, 119, 120, 121, 129, 158,
  159, 160, 222, 223, 224, 249, 260, 278, 279, 318, 349, 363, 366, 367, 368,
  370, 456, 457, 481, 489, 490, 686, 687,
];
const BEACH = [
  7, 8, 9, 54, 55, 79, 80, 90, 91, 98, 99, 120, 121, 222, 183, 184, 199, 278,
  279, 341, 342, 422, 423, 557, 558, 686, 687, 688, 689, 692, 693,
];
const VOLCANO = [
  4, 5, 6, 37, 38, 58, 59, 78, 126, 146, 155, 156, 157, 218, 219, 240, 244, 250,
  255, 256, 257, 322, 323, 324, 390, 391, 392, 467, 485, 498, 499, 500, 631,
  721,
];
const DEEP_SEA = [
  9, 72, 73, 86, 87, 116, 117, 119, 129, 130, 131, 138, 139, 170, 171, 211, 223,
  224, 226, 230, 318, 319, 320, 321, 350, 364, 365, 369, 382, 458, 564, 565,
  592, 593, 594, 602, 603, 604,
];
const GLACIER = [
  86, 87, 215, 220, 221, 225, 234, 238, 245, 361, 362, 363, 364, 365, 393, 394,
  395, 459, 460, 461, 473, 582, 583, 584, 613, 614, 615, 712, 713,
];

// Mountains
const ROCKY_MOUNTAIN = [
  50, 51, 66, 67, 68, 74, 75, 76, 104, 105, 106, 107, 111, 112, 115, 142, 213,
  231, 232, 243, 246, 247, 248, 297, 303, 347, 348, 371, 372, 374, 375, 376,
  385, 408, 409, 410, 411, 447, 448, 464, 488, 610, 611, 612, 619, 620, 638,
  643, 644, 647,
];
const SNOWY_SUMMIT = [
  66, 67, 68, 142, 144, 147, 148, 149, 215, 220, 221, 225, 234, 238, 359, 361,
  362, 393, 394, 395, 436, 437, 459, 460, 461, 468, 473, 613, 614, 627, 628,
];
const BIRDS_EYE_LOOKOUT = [
  16, 17, 18, 21, 22, 83, 142, 147, 148, 227, 276, 277, 333, 334, 373, 380, 381,
  396, 397, 398, 425, 426, 468, 628, 629, 630, 661, 662, 663, 701,
];

// Cave
const LARGE_CAVE = [
  41, 42, 50, 51, 66, 67, 74, 75, 76, 79, 95, 104, 105, 111, 169, 208, 228, 229,
  246, 290, 291, 292, 293, 294, 295, 299, 304, 305, 306, 345, 346, 377, 481,
  524, 525, 526, 633, 634, 635, 639, 719,
];
const CRAGGY_CANYON = [
  27, 28, 66, 67, 68, 74, 104, 105, 111, 112, 115, 141, 142, 169, 227, 228, 229,
  246, 299, 307, 308, 325, 326, 337, 338, 371, 372, 443, 444, 445, 476, 595,
  596, 627, 659, 660, 714, 715,
];
const ABANDONED_MINE = [
  19, 20, 41, 42, 50, 51, 66, 67, 68, 74, 75, 169, 206, 261, 262, 290, 291, 292,
  293, 296, 297, 299, 302, 472, 476, 524, 527, 528, 529, 530, 597, 598, 599,
  600, 601, 632,
];
const FROZEN_CAVE = [
  41, 42, 95, 169, 208, 215, 220, 221, 361, 362, 378, 459, 460, 461, 471, 473,
  478, 613, 614, 615, 696, 697, 698, 699,
];

// Desert
const DESERT = [
  27, 28, 50, 51, 58, 59, 77, 78, 84, 85, 104, 105, 177, 178, 328, 329, 330,
  331, 332, 343, 344, 443, 449, 450, 455, 551, 552, 553, 557, 558, 559, 560,
  645, 556, 629, 630, 694, 695,
];
const SCORCHED_SANDS = [
  4, 5, 27, 28, 37, 38, 58, 59, 77, 78, 84, 85, 155, 156, 157, 228, 229, 255,
  256, 257, 322, 323, 324, 449, 551, 552, 553, 554, 555, 561, 562, 563, 631,
  636, 637, 720,
];

const ENCOUNTER_LISTS = [
  FOREST,
  CALM_CLEARING,
  MYSTIC_GROVE,
  DEEP_DARK_WOODS,
  JUNGLE,
  TOWN,
  ABANDONED_POWER_PLANT,
  SOLAR_PANEL_FARM,
  STRANGE_RUINS,
  MEADOW,
  FLOWER_FIELD,
  RIVER,
  SWAMP,
  OCEAN,
  BEACH,
  VOLCANO,
  DEEP_SEA,
  GLACIER,
  ROCKY_MOUNTAIN,
  SNOWY_SUMMIT,
  BIRDS_EYE_LOOKOUT,
  LARGE_CAVE,
  CRAGGY_CANYON,
  ABANDONED_MINE,
  FROZEN_CAVE,
  DESERT,
  SCORCHED_SANDS,
];

const LOCATIONS = [
  {
    name: LocationName.Forest,
    description:
      "A lush forest, where the towering trees create a canopy of leaves overhead, their rustling a gentle whisper in the breeze. The scent of damp earth fills the air as rays of sunlight filter through the branches.",
  },
  {
    name: LocationName.CalmClearing,
    description:
      "A peaceful forest clearing, sunlight bright in the secluded area. A gentle breeze stirs the tall grass.",
  },
  {
    name: LocationName.MysticGrove,
    description: `The area seems to shimmer with an ethereal glow. Maybe it's the strange flowers blooming in the shadows, or the mist shrouding the distant trees.`,
  },
  {
    name: LocationName.DeepDarkWoods,
    description:
      "Towering trees block out the sky casting the forest floor into darkness. You get the sense that you are being watched.",
  },
  {
    name: LocationName.Jungle,
    description:
      "Dense jungle undergrowth makes progress slow, but you can hear more nimble creatures moving in the canopy above. The air is warm from the tropical humidity.",
  },
  {
    name: LocationName.Town,
    description:
      "A bustling town, the streets alive with people. The smell of fresh bread wafts down the street.",
  },
  {
    name: LocationName.AbandonedPowerPlant,
    description:
      "The decaying plant is littered with debris from shattered windows and ransacked machinery. Electricity sparks from exposed wires, and you hear the occasional clang of metal.",
  },
  {
    name: LocationName.SolarPanelFarm,
    description:
      "There is a hum of electricity in the air, and the sun glints off the rows of blue solar panels.",
  },
  {
    name: LocationName.StrangeRuins,
    description:
      "Crumbled rocks covered with unintelligible symbols rise from the earth. The air is thick with the sense that something ancient still lingers here.",
  },
  {
    name: LocationName.Meadow,
    description:
      "A large meadow of waving grasses stretches out before you. The sky above is perfectly clear.",
  },
  {
    name: LocationName.FlowerField,
    description:
      "A vibrant field bursting with wildflowers of every color. The breeze carries the sweet scent of blossoms.",
  },
  {
    name: LocationName.River,
    description:
      "A river flows gently before you, its water clear and sparkling under the sun.",
  },
  {
    name: LocationName.Swamp,
    description:
      "The ground is muddy underfoot, and the air smells earthy and damp.",
  },
  {
    name: LocationName.Ocean,
    description:
      "Still within sight of the shore, the water is deep and clear.",
  },
  {
    name: LocationName.Beach,
    description:
      "Warm sand leads down to the water, where waves gently lap the shore.",
  },
  {
    name: LocationName.Volcano,
    description: "The firey peak is almost too hot to bear.",
  },
  {
    name: LocationName.DeepSea,
    description:
      "The water is dark and cold. Visibility is limited, but you catch glimpses of movement out of the corner of your eye.",
  },
  {
    name: LocationName.Glacier,
    description:
      "A frozen expanse of ice and snow, its surface gleaming in the pale sunlight. The air is thin and frigid, and the cracking of the ice echoes across the landscape.",
  },
  {
    name: LocationName.RockyMountain,
    description:
      "Cliff faces and large boulders make travel challenging, but the views are breathtaking.",
  },
  {
    name: LocationName.SnowySummit,
    description:
      "You stand atop a snow-covered peak, the cold biting at your skin.",
  },
  {
    name: LocationName.BirdsEyeLookout,
    description:
      "From this high vantage point, the entire landscape unfurls before you, a patchwork of forests, fields, and towns.",
  },
  {
    name: LocationName.LargeCave,
    description:
      "Stalactites hang from the ceiling, and the sound of dripping water echoes through the cavern.",
  },
  {
    name: LocationName.CraggyCanyon,
    description:
      "The canyon before you is a maze of jagged rocks and narrow paths, with steep cliffs that drop off into the abyss below.",
  },
  {
    name: LocationName.AbandonedMine,
    description:
      "Old, rusted equipment litters the ground, and the smell of dust and mold fills the air.",
  },
  {
    name: LocationName.FrozenCave,
    description:
      "You slip across the ice-covered ground, breath misting in the fridged temperature of the cave.",
  },
  {
    name: LocationName.Desert,
    description:
      "The endless stretch of desert lies before you, the golden sands shimmering under the hot sun.",
  },
  {
    name: LocationName.ScorchedSands,
    description:
      "The air is thick with the smell of ash, and the sun beats down relentlessly, making every step a battle against the unrelenting heat.",
  },
];

export { LOCATIONS, ENCOUNTER_LISTS };
