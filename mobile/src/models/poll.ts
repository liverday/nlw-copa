import { Participant } from "./participant";

type Poll = {
  id: string,
  title: string,
  code: string,
  createdAt: Date,
  updatedAt: Date,
  owner?: {
    id: string,
    name: string,
  },
  ownerId?: string;
  participants: Participant[];
}

export default Poll;