import React from 'react';

const ColorPicker = ({ colors, selectedColor, onColorChange }) => {
  return (
    <div className='flex gap-2'>
      {colors.map(color => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full border-2 border-slate-400 ${selectedColor === color ? 'border-black' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
