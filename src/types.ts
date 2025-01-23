export type Animal = { id: string; name: string };

// export type AnimalInfo = Animal & {
//   hasTail?: boolean;
//   abilities?: string[];
//   image?: string;
// };

export type AnimalInfo = Animal & {
  id: number;
  name: string;
  hasTail: boolean;
  image: string;
  abilities?: string[];
};
