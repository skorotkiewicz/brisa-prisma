import type { RequestContext } from "brisa";
import { prisma } from "@/utils/prisma";
import { send } from "@/utils/response";

export async function PUT(request: RequestContext) {
  try {
    const formData = await request.formData();
    const id = Number(request.route.params?.id as string);
    const name = formData.get("name") as string;
    const hasTail = formData.get("hasTail") === "on";
    const image = formData.get("image") as string;
    const abilitiesStr = formData.get("abilities") as string;

    const abilities = abilitiesStr.split(",").map((ability) => ability.trim());

    // Delete existing abilities
    await prisma.abilitie.deleteMany({
      where: { animalId: id },
    });

    const updatedAnimal = await prisma.animal.update({
      where: { id },
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

    return send(200, updatedAnimal);
  } catch (error) {
    return send(500, { error: "Failed to update animal" });
  }
}

export async function DELETE(request: RequestContext) {
  try {
    const id = Number(request.route.params?.id as string);

    await prisma.abilitie.deleteMany({
      where: { animalId: id },
    });

    await prisma.animal.delete({
      where: { id },
    });

    return send(200, { message: "Animal deleted successfully" });
  } catch (error) {
    return send(500, { error: "Failed to delete animal" });
  }
}
