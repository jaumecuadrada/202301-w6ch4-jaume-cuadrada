import { type Request, type Response } from "express";
import express from "express";

type Thing = {
  id: number;
  name: string;
};

const thingsIalreadyKnow = [
  { id: 1, name: "Javascript" },
  { id: 2, name: "CSS" },
];

const app = express();

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.json());

app.use((req, res, next) => {
  console.log("Received a request!");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to thinks I already know API !!!" });
});

app.get("/things", (req, res) => {
  res.json(thingsIalreadyKnow);
});

app.get("/things/:idThing", (req, res) => {
  const thingId: number = parseInt(req.params.idThing, 10);
  const thing = thingsIalreadyKnow.find((thing) => thing.id === thingId);
  if (thing) {
    res.json(thing);
  } else {
    res.status(404).send("Thing not found");
  }
});

app.delete("/things/:idThing", (req, res) => {
  const thingId: number = parseInt(req.params.idThing, 10);
  const thingIndex: number = thingsIalreadyKnow.findIndex(
    (thing) => thing.id === thingId
  );

  if (thingIndex === -1) {
    res.status(404).send("Thing not found");
  } else {
    thingsIalreadyKnow.splice(thingIndex, 1);
    res.send("Thing deleted");
  }
});

app.post("/things", (req, res) => {
  const newThing: Thing = {
    id: thingsIalreadyKnow.length + 1,
    name: (req.body as Thing).name,
  };
  thingsIalreadyKnow.push(newThing);
  res.send(`New thing created: ${newThing.name} (ID: ${newThing.id})`);
});
