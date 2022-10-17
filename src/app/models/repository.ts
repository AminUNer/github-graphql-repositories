import { User } from "./user";

export interface Repository  {

  name?: string;

  description?: string;

  url?: string;

  isArchived?: boolean;

  createdAt?: Date;

  updatedAt?: Date;

  owner?: User;

  contributors?: User[];

}
