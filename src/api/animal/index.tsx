import type { Animal } from "@/types";
import { prisma } from "@/utils/prisma";

const animals: Animal[] = [
  { id: "1", name: "Dog" },
  { id: "2", name: "Cat" },
  { id: "3", name: "Bird" },
  { id: "4", name: "Fish" },
  { id: "5", name: "Horse" },
];

export async function GET() {
  const data = await prisma.user.count();
  console.log(data);

  return new Response(JSON.stringify(animals), {
    headers: { "content-type": "application/json" },
  });
}
