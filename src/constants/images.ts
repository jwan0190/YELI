const UNSPLASH = "https://images.unsplash.com";
const PARAMS_LARGE = "?w=2400&q=80&auto=format&fit=crop";
const PARAMS_MED = "?w=1600&q=80&auto=format&fit=crop";
const PARAMS_DEFAULT = "?w=1400&q=80&auto=format&fit=crop";

const photo = (id: string, params: string = PARAMS_DEFAULT) => `${UNSPLASH}/${id}${params}`;

export const IMG = {
  hero: photo("photo-1519741497674-611481863552", PARAMS_LARGE),
  weddings: photo("photo-1583939003579-730e3918a45a", PARAMS_MED),
  como: photo("photo-1465495976277-4387d4b0b4c6"),
  kyoto: photo("photo-1519225421980-715cb0215aed", PARAMS_MED),
  petals: photo("photo-1511285560929-80b456fea0bc"),
  bride: photo("photo-1524863479829-916d8e77f114", PARAMS_MED),
  firstLook: photo("photo-1525772764200-be829a350797", PARAMS_MED),
  hudsonValley: photo("photo-1591604466107-ec97de577aff", "?w=2000&q=80&auto=format&fit=crop"),
  hourBefore: photo("photo-1606800052052-a08af7148866"),
  vow: photo("photo-1519671482749-fd09be7ccebf"),
  toast: photo("photo-1507504031003-b417219a0fde"),
  dance: photo("photo-1530023367847-a683933f4172"),
  vernissage: photo("photo-1509927083803-4bd519298ac4"),
  longTable: photo("photo-1606216794074-735e91aa2c92", "?w=2000&q=80&auto=format&fit=crop"),
  brandDinner: photo("photo-1532712938310-34cb3982ef74"),
};
