
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus, X } from 'lucide-react';

interface Process {
  id: string;
  name: string;
  environment: string;
  status: 'Active' | 'Inactive' | 'Draft';
  createdAt: string;
  lastRun: string;
  description: string;
  owner: string;
  package: string;
}

interface ProcessFormProps {
  process?: Process;
  onClose: () => void;
}

interface InputArgument {
  key: string;
  value: string;
}

const ProcessForm: React.FC<ProcessFormProps> = ({ process, onClose }) => {
  const [formData, setFormData] = useState({
    name: process?.name || '',
    description: process?.description || '',
    environment: process?.environment || 'Development',
    package: process?.package || '',
  });

  const [inputArguments, setInputArguments] = useState<InputArgument[]>([
    { key: '', value: '' }
  ]);

  const environments = ['Development', 'Staging', 'Production'];
  const packages = ['InvoiceBot v2.1', 'OnboardBot v1.5', 'ReportBot v3.0', 'DataBot v1.0'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArgumentChange = (index: number, field: 'key' | 'value', value: string) => {
    const newArguments = [...inputArguments];
    newArguments[index][field] = value;
    setInputArguments(newArguments);
  };

  const addArgument = () => {
    setInputArguments(prev => [...prev, { key: '', value: '' }]);
  };

  const removeArgument = (index: number) => {
    if (inputArguments.length > 1) {
      setInputArguments(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving process:', formData, inputArguments);
    // TODO: Save to backend
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Process Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Process Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter process name"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter process description"
          rows={3}
        />
      </div>

      {/* Environment */}
      <div className="space-y-2">
        <Label>Environment *</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {formData.environment}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-white">
            {environments.map((env) => (
              <DropdownMenuItem 
                key={env}
                onClick={() => handleInputChange('environment', env)}
              >
                {env}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Package */}
      <div className="space-y-2">
        <Label>Package *</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {formData.package || 'Select package'}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-white">
            {packages.map((pkg) => (
              <DropdownMenuItem 
                key={pkg}
                onClick={() => handleInputChange('package', pkg)}
              >
                {pkg}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Input Arguments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Input Arguments (Optional)</Label>
          <Button type="button" variant="outline" size="sm" onClick={addArgument}>
            <Plus className="h-4 w-4 mr-2" />
            Add Argument
          </Button>
        </div>
        
        <div className="space-y-3">
          {inputArguments.map((arg, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Input
                placeholder="Key"
                value={arg.key}
                onChange={(e) => handleArgumentChange(index, 'key', e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Value"
                value={arg.value}
                onChange={(e) => handleArgumentChange(index, 'value', e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeArgument(index)}
                disabled={inputArguments.length === 1}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4 border-t">
        <Button type="submit" className="flex-1">
          {process ? 'Update Process' : 'Create Process'}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProcessForm;
