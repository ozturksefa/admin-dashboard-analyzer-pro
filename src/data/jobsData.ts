
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
  // Job specific parameters
  transactionsTotal: number;
  transactionsSuccessful: number;
  transactionsFailed: number;
  itemsProcessed: number;
  retryCount: number;
  cpuUsage: number;
  memoryUsage: number;
  inputArgs?: Record<string, string>;
  outputData?: Record<string, string>;
  errorMessage?: string;
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
    queueName: 'InvoiceQueue',
    transactionsTotal: 25,
    transactionsSuccessful: 25,
    transactionsFailed: 0,
    itemsProcessed: 25,
    retryCount: 0,
    cpuUsage: 12,
    memoryUsage: 245,
    inputArgs: { 'FilePath': 'C:/Data/input.xlsx', 'BatchSize': '25' },
    outputData: { 'ProcessedCount': '25', 'Status': 'Complete' }
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
    queueName: 'InvoiceQueue',
    transactionsTotal: 150,
    transactionsSuccessful: 89,
    transactionsFailed: 2,
    itemsProcessed: 91,
    retryCount: 3,
    cpuUsage: 45,
    memoryUsage: 512,
    inputArgs: { 'Vendor': 'All', 'DateRange': '2024-01' }
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
    queueName: 'CustomerQueue',
    transactionsTotal: 50,
    transactionsSuccessful: 42,
    transactionsFailed: 8,
    itemsProcessed: 42,
    retryCount: 5,
    cpuUsage: 28,
    memoryUsage: 380,
    inputArgs: { 'Region': 'EMEA', 'CustomerType': 'Enterprise' },
    errorMessage: 'Invalid customer data format in row 43'
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
    queueName: 'DataQueue',
    transactionsTotal: 500,
    transactionsSuccessful: 498,
    transactionsFailed: 2,
    itemsProcessed: 498,
    retryCount: 2,
    cpuUsage: 65,
    memoryUsage: 780,
    inputArgs: { 'Source': 'SAP', 'Table': 'BKPF' },
    outputData: { 'RecordsExtracted': '498', 'FileSize': '12.5MB' }
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
    queueName: 'ReportQueue',
    transactionsTotal: 12,
    transactionsSuccessful: 12,
    transactionsFailed: 0,
    itemsProcessed: 12,
    retryCount: 0,
    cpuUsage: 35,
    memoryUsage: 420,
    inputArgs: { 'ReportType': 'Monthly', 'Format': 'PDF' },
    outputData: { 'ReportsGenerated': '12', 'OutputPath': '/reports/2024/' }
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
    queueName: 'EmailQueue',
    transactionsTotal: 200,
    transactionsSuccessful: 145,
    transactionsFailed: 55,
    itemsProcessed: 145,
    retryCount: 10,
    cpuUsage: 78,
    memoryUsage: 890,
    inputArgs: { 'Template': 'Newsletter', 'Recipients': 'All' },
    errorMessage: 'SMTP connection timeout after 30 seconds'
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
    queueName: 'PaymentQueue',
    transactionsTotal: 0,
    transactionsSuccessful: 0,
    transactionsFailed: 0,
    itemsProcessed: 0,
    retryCount: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    inputArgs: { 'Bank': 'HSBC', 'AccountType': 'Corporate' }
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
    queueName: 'HRQueue',
    transactionsTotal: 75,
    transactionsSuccessful: 45,
    transactionsFailed: 0,
    itemsProcessed: 45,
    retryCount: 1,
    cpuUsage: 32,
    memoryUsage: 356,
    inputArgs: { 'System': 'Workday', 'SyncType': 'Full' }
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
    queueName: 'InventoryQueue',
    transactionsTotal: 320,
    transactionsSuccessful: 280,
    transactionsFailed: 40,
    itemsProcessed: 280,
    retryCount: 8,
    cpuUsage: 55,
    memoryUsage: 620,
    inputArgs: { 'Warehouse': 'WH-001', 'Category': 'Electronics' },
    errorMessage: 'SKU mismatch detected for 40 items'
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
    queueName: 'ContractQueue',
    transactionsTotal: 30,
    transactionsSuccessful: 18,
    transactionsFailed: 0,
    itemsProcessed: 18,
    retryCount: 0,
    cpuUsage: 22,
    memoryUsage: 290,
    inputArgs: { 'ContractType': 'Annual', 'AutoRenew': 'true' },
    outputData: { 'Renewed': '18', 'Pending': '12' }
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
