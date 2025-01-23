import type { RequestContext } from "brisa";
import { prisma } from "@/utils/prisma";
import { send } from "@/utils/response";

export async function GET(request: RequestContext) {
  try {
    const id = Number(request.route.params?.id as string);

    const animal = await prisma.animal.findUnique({
      where: { id },
      include: { abilities: true },
    });

    if (!animal) {
      return send(404, { error: "Animal not found" });
    }

    const formattedAnimal = {
      ...animal,
      abilities: animal.abilities.map((ability) => ability.abilitie),
    };

    return send(200, formattedAnimal);
  } catch (error) {
    return send(500, { error: "Failed to fetch animal" });
  }
}
