import { prisma } from "@/utils/prisma";
import { send } from "@/utils/response";

export async function GET() {
  const animals = await prisma.animal.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return send(200, animals);
}
