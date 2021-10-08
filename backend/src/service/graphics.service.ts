import io from "../utils/graphics.utils";

export const emitGraphcsData = (data: unknown) => {
  io.emit("graphics", data);
};
