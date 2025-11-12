export type Agent = {
  id: string;
  username: string;
  password: string;
  name: string;
};

export const AGENTS: Agent[] = [
  { id: 'a1', username: 'agent1', password: '1234', name: 'Agent One' },
  { id: 'a2', username: 'agent2', password: '1234', name: 'Agent Two' },
];
