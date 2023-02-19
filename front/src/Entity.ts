import { entityTemplate } from "./setQTable";

const entT = Object.fromEntries(entityTemplate.entries());
export type Entity = typeof entT;
