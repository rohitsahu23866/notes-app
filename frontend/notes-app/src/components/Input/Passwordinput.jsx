import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Passwordinput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
      <input 
        value={value}
        onChange={onChange}
        type={isShowPassword ? 'text' : 'password'}
        placeholder={placeholder || 'Password'}
        className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
      />
      {isShowPassword ? (
        <FaRegEye
          size={22}
          className='text-primary cursor-pointer'
          onClick={toggleShowPassword}
          aria-label="Hide password"
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className='text-slate-600 cursor-pointer'
          onClick={toggleShowPassword}
          aria-label="Show password"
        />
      )}
    </div>
  );
};

export default Passwordinput;
