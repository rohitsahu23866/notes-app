import React, { useState } from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from 'moment';
import ColorPicker from '../ColorPicker/ColorPicker';
; // Import the ColorPicker component

const colorOptions = [
  '#FFFFFF', // Light Red
  '#FBCFE8', // Light Pink
  '#BFDBFE', // Light Blue
  '#F7E4B8', // Light Yellow
  '#D9C1E4', // Lavender
  '#FEC4A8', // Peach
];



const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Default color

  return (
    <div
      className='border  rounded p-4 bg-white shadow-lg hover:shadow-2xl  hover:translate-y-2 transition-all ease-in-out'
      style={{ backgroundColor: selectedColor }} // Apply the selected color
    >
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
          <span className='text-xs text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-400'}`}
          onClick={onPinNote}
        />
      </div>

      <p className='text-xs text-slate-600 mt-2'>{content?.slice(0, 60)}</p>

      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-700'>
          {tags.map((item, index) => (
            <span key={index}>{`#${item} `}</span>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <MdCreate
            className='text-slate-400 icon-btn hover:text-green-600'
            onClick={onEdit}
          />

          <MdDelete
            className='icon-btn text-slate-400 hover:text-red-500'
            onClick={onDelete}
          />
        </div>
      </div>

      {/* Add Color Picker */}
      <div className='mt-2'>
        <ColorPicker
          colors={colorOptions}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
      </div>
    </div>
  );
};

export default NoteCard;
