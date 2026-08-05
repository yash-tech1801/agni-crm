import React from 'react';

export default function EditForm({ values, onChange }) {
  return (
    <div className="edit-form-grid">
      {Object.entries(values).map(([field, value]) => (
        <label key={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
          <input
            name={field}
            value={value ?? ''}
            onChange={onChange}
            type="text"
          />
        </label>
      ))}
    </div>
  );
}
