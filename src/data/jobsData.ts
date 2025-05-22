
export interface Job {
  id: string;
  name: string;
  machine: string;
  type: string;
  state: 'Successful' | 'Pending' | 'Stopped';
  priority: 'High' | 'Normal' | 'Low';
  started: string;
  ended: string;
  source: 'Manual' | 'Assistant';
}

export const jobsData: Job[] = [
  {
    id: '1',
    name: 'Hello.Orchestrator2',
    machine: 'DESKTOP-ABC123',
    type: 'RPA Developer Pro',
    state: 'Successful',
    priority: 'Normal',
    started: '3 minutes ago',
    ended: '3 minutes ago',
    source: 'Manual'
  },
  {
    id: '2',
    name: 'Invoice.Processing',
    machine: 'SERVER-DEF456',
    type: 'Development',
    state: 'Pending',
    priority: 'High',
    started: '15 minutes ago',
    ended: '-',
    source: 'Assistant'
  },
  {
    id: '3',
    name: 'Customer.Onboarding',
    machine: 'CLOUD-GHI789',
    type: 'RPA Developer Pro',
    state: 'Stopped',
    priority: 'Low',
    started: '1 hour ago',
    ended: '45 minutes ago',
    source: 'Manual'
  },
  {
    id: '4',
    name: 'Data.Extraction',
    machine: 'SERVER-JKL012',
    type: 'Development',
    state: 'Successful',
    priority: 'Normal',
    started: '2 hours ago',
    ended: '1 hour ago',
    source: 'Assistant'
  },
  {
    id: '5',
    name: 'Report.Generation',
    machine: 'DESKTOP-MNO345',
    type: 'RPA Developer Pro',
    state: 'Successful',
    priority: 'High',
    started: '5 hours ago',
    ended: '4 hours ago',
    source: 'Manual'
  }
];
