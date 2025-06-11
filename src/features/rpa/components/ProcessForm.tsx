
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Plus, Trash2 } from 'lucide-react';

interface ProcessFormProps {
  isOpen: boolean;
  onClose: () => void;
  process?: any;
}

const ProcessForm = ({ isOpen, onClose, process }: ProcessFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    environment: '',
    package: '',
    arguments: [{ key: '', value: '' }]
  });

  useEffect(() => {
    if (process) {
      setFormData({
        name: process.name || '',
        description: process.description || '',
        environment: process.environment || '',
        package: process.package || '',
        arguments: process.arguments || [{ key: '', value: '' }]
      });
    } else {
      setFormData({
        name: '',
        description: '',
        environment: '',
        package: '',
        arguments: [{ key: '', value: '' }]
      });
    }
  }, [process]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArgumentChange = (index: number, field: 'key' | 'value', value: string) => {
    const newArguments = [...formData.arguments];
    newArguments[index][field] = value;
    setFormData(prev => ({
      ...prev,
      arguments: newArguments
    }));
  };

  const addArgument = () => {
    setFormData(prev => ({
      ...prev,
      arguments: [...prev.arguments, { key: '', value: '' }]
    }));
  };

  const removeArgument = (index: number) => {
    if (formData.arguments.length > 1) {
      const newArguments = formData.arguments.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        arguments: newArguments
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting process:', formData);
    // Here you would typically call an API
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {process ? 'Edit Process' : 'Add New Process'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Process Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter process name"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter process description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="environment">Environment</Label>
                <Select value={formData.environment} onValueChange={(value) => handleInputChange('environment', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="package">Package</Label>
                <Select value={formData.package} onValueChange={(value) => handleInputChange('package', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invoice-processor">Invoice Processor</SelectItem>
                    <SelectItem value="data-migrator">Data Migrator</SelectItem>
                    <SelectItem value="report-generator">Report Generator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Input Arguments</Label>
                <Button type="button" variant="outline" size="sm" onClick={addArgument}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Argument
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.arguments.map((arg, index) => (
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
                    {formData.arguments.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArgument(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {process ? 'Update Process' : 'Create Process'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessForm;
