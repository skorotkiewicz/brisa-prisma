import type { RequestContext } from "brisa";
import { prisma } from "@/utils/prisma";
import { send } from "@/utils/response";

export async function GET() {
  try {
    const animals = await prisma.animal.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return send(200, animals);
  } catch (error) {
    return send(500, { error: "Failed to fetch animals" });
  }
}

export async function POST(request: RequestContext) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const hasTail = formData.get("hasTail") === "on";
    const image = formData.get("image") as string;
    const abilitiesStr = formData.get("abilities") as string;

    const abilities = abilitiesStr.split(",").map((ability) => ability.trim());

    const newAnimal = await prisma.animal.create({
      data: {
        name,
        hasTail,
        image,
        abilities: {
          create: abilities.map((ability) => ({ abilitie: ability })),
        },
      },
      include: {
        abilities: true,
      },
    });

    return send(200, newAnimal);
  } catch (error) {
    return send(500, { error: "Failed to create animal" });
  }
}
