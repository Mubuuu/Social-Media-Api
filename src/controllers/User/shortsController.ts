import { Response, Request } from "express";

export default {
  uploadShorts: async (req: Request, res: Response) => {
    console.log(req.body, "boddddddddddddddy");
  },
};
