
export interface Job {
  id: string;
  name: string;
  machine: string;
  type: string;
  state: 'Successful' | 'Pending' | 'Stopped' | 'Running' | 'Faulted';
  exceptionType?: 'Business' | 'System' | null;
  priority: 'High' | 'Normal' | 'Low';
  started: string;
  ended: string;
  duration: string;
  source: 'Manual' | 'Assistant' | 'Schedule';
  queueName?: string;
}

export const jobsData: Job[] = [
  {
    id: '1',
    name: 'Hello.Orchestrator2',
    machine: 'DESKTOP-ABC123',
    type: 'RPA Developer Pro',
    state: 'Successful',
    exceptionType: null,
    priority: 'Normal',
    started: '3 minutes ago',
    ended: '3 minutes ago',
    duration: '00:02:34',
    source: 'Manual',
    queueName: 'InvoiceQueue'
  },
  {
    id: '2',
    name: 'Invoice.Processing',
    machine: 'SERVER-DEF456',
    type: 'Development',
    state: 'Running',
    exceptionType: null,
    priority: 'High',
    started: '15 minutes ago',
    ended: '-',
    duration: '00:15:22',
    source: 'Schedule',
    queueName: 'InvoiceQueue'
  },
  {
    id: '3',
    name: 'Customer.Onboarding',
    machine: 'CLOUD-GHI789',
    type: 'RPA Developer Pro',
    state: 'Faulted',
    exceptionType: 'Business',
    priority: 'Low',
    started: '1 hour ago',
    ended: '45 minutes ago',
    duration: '00:15:00',
    source: 'Manual',
    queueName: 'CustomerQueue'
  },
  {
    id: '4',
    name: 'Data.Extraction',
    machine: 'SERVER-JKL012',
    type: 'Development',
    state: 'Successful',
    exceptionType: null,
    priority: 'Normal',
    started: '2 hours ago',
    ended: '1 hour ago',
    duration: '01:00:00',
    source: 'Assistant',
    queueName: 'DataQueue'
  },
  {
    id: '5',
    name: 'Report.Generation',
    machine: 'DESKTOP-MNO345',
    type: 'RPA Developer Pro',
    state: 'Successful',
    exceptionType: null,
    priority: 'High',
    started: '5 hours ago',
    ended: '4 hours ago',
    duration: '01:00:00',
    source: 'Manual',
    queueName: 'ReportQueue'
  },
  {
    id: '6',
    name: 'Email.Automation',
    machine: 'SERVER-PQR678',
    type: 'Production',
    state: 'Faulted',
    exceptionType: 'System',
    priority: 'High',
    started: '30 minutes ago',
    ended: '25 minutes ago',
    duration: '00:05:00',
    source: 'Schedule',
    queueName: 'EmailQueue'
  },
  {
    id: '7',
    name: 'Payment.Reconciliation',
    machine: 'CLOUD-STU901',
    type: 'Production',
    state: 'Pending',
    exceptionType: null,
    priority: 'High',
    started: '-',
    ended: '-',
    duration: '-',
    source: 'Schedule',
    queueName: 'PaymentQueue'
  },
  {
    id: '8',
    name: 'HR.DataSync',
    machine: 'SERVER-VWX234',
    type: 'Development',
    state: 'Running',
    exceptionType: null,
    priority: 'Normal',
    started: '10 minutes ago',
    ended: '-',
    duration: '00:10:15',
    source: 'Assistant',
    queueName: 'HRQueue'
  },
  {
    id: '9',
    name: 'Inventory.Update',
    machine: 'DESKTOP-YZA567',
    type: 'Production',
    state: 'Faulted',
    exceptionType: 'Business',
    priority: 'Normal',
    started: '2 hours ago',
    ended: '1 hour 45 minutes ago',
    duration: '00:15:00',
    source: 'Manual',
    queueName: 'InventoryQueue'
  },
  {
    id: '10',
    name: 'Contract.Renewal',
    machine: 'CLOUD-BCD890',
    type: 'RPA Developer Pro',
    state: 'Stopped',
    exceptionType: null,
    priority: 'Low',
    started: '3 hours ago',
    ended: '2 hours ago',
    duration: '01:00:00',
    source: 'Manual',
    queueName: 'ContractQueue'
  }
];

// Queue data for monitoring
export interface Queue {
  id: string;
  name: string;
  itemsTotal: number;
  itemsPending: number;
  itemsProcessed: number;
  itemsFailed: number;
}

export const queuesData: Queue[] = [
  { id: '1', name: 'InvoiceQueue', itemsTotal: 245, itemsPending: 12, itemsProcessed: 228, itemsFailed: 5 },
  { id: '2', name: 'CustomerQueue', itemsTotal: 180, itemsPending: 8, itemsProcessed: 165, itemsFailed: 7 },
  { id: '3', name: 'DataQueue', itemsTotal: 520, itemsPending: 45, itemsProcessed: 468, itemsFailed: 7 },
  { id: '4', name: 'ReportQueue', itemsTotal: 89, itemsPending: 3, itemsProcessed: 84, itemsFailed: 2 },
  { id: '5', name: 'EmailQueue', itemsTotal: 312, itemsPending: 28, itemsProcessed: 276, itemsFailed: 8 },
  { id: '6', name: 'PaymentQueue', itemsTotal: 156, itemsPending: 15, itemsProcessed: 138, itemsFailed: 3 },
  { id: '7', name: 'HRQueue', itemsTotal: 78, itemsPending: 5, itemsProcessed: 71, itemsFailed: 2 },
  { id: '8', name: 'InventoryQueue', itemsTotal: 423, itemsPending: 32, itemsProcessed: 385, itemsFailed: 6 },
  { id: '9', name: 'ContractQueue', itemsTotal: 67, itemsPending: 4, itemsProcessed: 61, itemsFailed: 2 },
];
