import React, { useState, ReactNode } from 'react';

// Type untuk field form
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';
  placeholder?: string;
  value: any;
  required?: boolean;
  options?: { value: string; label: string }[]; // Untuk select, checkbox, radio
  disabled?: boolean;
  min?: number | string;
  max?: number | string;
  rows?: number; // Untuk textarea
  cols?: number; // Untuk textarea
  accept?: string; // Untuk file input
  className?: string;
  validation?: (value: any) => string | null; // Custom validation
}

interface FormProps {
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  title?: string;
  description?: string;
  className?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
  loading?: boolean;
  footer?: ReactNode;
  onChange?: (fieldId: string, value: any) => void;
}

const ReusableForm: React.FC<FormProps> = ({
  fields,
  onSubmit,
  onCancel,
  submitText = 'Simpan',
  cancelText = 'Batal',
  title,
  description,
  className = '',
  layout = 'vertical',
  loading = false,
  footer,
  onChange,
}) => {
  // State untuk menyimpan nilai form dan error
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initialValues: Record<string, any> = {};
    fields.forEach((field) => {
      initialValues[field.id] = field.value;
    });
    return initialValues;
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handler untuk perubahan nilai input
  const handleChange = (fieldId: string, value: any) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    
    // Clear error when field is changed
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
    
    // Call onChange callback if provided
    if (onChange) {
      onChange(fieldId, value);
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach((field) => {
      // Check required fields
      if (field.required && (values[field.id] === '' || values[field.id] === null || values[field.id] === undefined)) {
        newErrors[field.id] = `${field.label} harus diisi`;
      }
      
      // Run custom validation if provided
      if (field.validation && values[field.id] !== '' && values[field.id] !== null && values[field.id] !== undefined) {
        const validationError = field.validation(values[field.id]);
        if (validationError) {
          newErrors[field.id] = validationError;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler untuk submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(values);
    }
  };

  // Generate layout classes
  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'grid grid-cols-1 md:grid-cols-3 gap-4 items-center';
      case 'inline':
        return 'flex flex-wrap items-center gap-4';
      case 'vertical':
      default:
        return 'flex flex-col gap-4';
    }
  };

  // Render field based on type
  const renderField = (field: FormField) => {
    const { id, label, type, placeholder, value, required, options, disabled, min, max, className = '', rows, cols, accept } = field;
    const fieldValue = values[id];
    const hasError = !!errors[id];
    
    const baseInputClasses = `w-full px-3 py-2 border rounded-md ${
      hasError ? 'border-red-500' : 'border-gray-300'
    } focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'bg-gray-100' : ''}`;
    
    const fieldClasses = className ? `${baseInputClasses} ${className}` : baseInputClasses;

    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            name={id}
            placeholder={placeholder}
            value={fieldValue || ''}
            required={required}
            disabled={disabled}
            rows={rows || 4}
            cols={cols}
            className={fieldClasses}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        );
      
      case 'select':
        return (
          <select
            id={id}
            name={id}
            value={fieldValue || ''}
            required={required}
            disabled={disabled}
            className={fieldClasses}
            onChange={(e) => handleChange(id, e.target.value)}
          >
            <option value="">{placeholder || `Pilih ${label}`}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="flex flex-col gap-2">
            {options?.map((option) => {
              const isChecked = Array.isArray(fieldValue) 
                ? fieldValue.includes(option.value) 
                : fieldValue === option.value;
              
              return (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={id}
                    value={option.value}
                    checked={isChecked}
                    disabled={disabled}
                    onChange={(e) => {
                      if (Array.isArray(fieldValue)) {
                        const newValue = e.target.checked
                          ? [...fieldValue, option.value]
                          : fieldValue.filter((val: string) => val !== option.value);
                        handleChange(id, newValue);
                      } else {
                        handleChange(id, e.target.checked ? option.value : '');
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        );
      
      case 'radio':
        return (
          <div className="flex flex-col gap-2">
            {options?.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={id}
                  value={option.value}
                  checked={fieldValue === option.value}
                  disabled={disabled}
                  onChange={(e) => handleChange(id, e.target.value)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      
      case 'file':
        return (
          <input
            type="file"
            id={id}
            name={id}
            accept={accept}
            disabled={disabled}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleChange(id, e.target.files[0]);
              }
            }}
          />
        );
      
      default:
        return (
          <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            value={fieldValue || ''}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            className={fieldClasses}
            onChange={(e) => handleChange(id, e.target.value)}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${className}`} noValidate>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      
      <div className={getLayoutClasses()}>
        {fields.map((field) => (
          <div 
            key={field.id} 
            className={`form-field ${layout === 'horizontal' ? 'md:col-span-1' : ''}`}
          >
            <label 
              htmlFor={field.id} 
              className={`block mb-1 font-medium ${layout === 'inline' ? 'sr-only' : ''}`}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {renderField(field)}
            
            {errors[field.id] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-end gap-4">
        {footer || (
          <>
            {onCancel && (
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={onCancel}
                disabled={loading}
              >
                {cancelText}
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                submitText
              )}
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default ReusableForm;