import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
      <div
        className='flex items-center gap-4 cursor-pointer'
        onClick={() => setIsOpen(true)}
      >
        <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-xl'>
            {icon ? (
                <img src={icon} alt="Icon" className='w-12 h-12'/>
            ) : (
                <LuImage />
            )}
        </div>

        <p className=''>{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {isOpen && (
        <div className='relative'>
            <button
                className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'
                onClick={() => setIsOpen(false)}
            >
                <LuX/>
            </button>

            <EmojiPicker
                open={isOpen}
                onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
            />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup

// import React, { useState, useRef, useEffect } from 'react';
// import EmojiPicker from 'emoji-picker-react';
// import { LuImage, LuX } from 'react-icons/lu';

// const EmojiPickerPopup = ({ icon, onSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pickerRef = useRef();

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (pickerRef.current && !pickerRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
//       <div
//         className='flex items-center gap-4 cursor-pointer'
//         onClick={() => setIsOpen(true)}
//       >
//         <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-xl overflow-hidden'>
//           {icon ? (
//             <img src={icon} alt="Emoji Icon" className='w-10 h-10 object-contain' />
//           ) : (
//             <LuImage />
//           )}
//         </div>
//         <p>{icon ? "Change Icon" : "Pick Icon"}</p>
//       </div>

//       {isOpen && (
//         <div className='relative z-50' ref={pickerRef}>
//           <button
//             className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'
//             onClick={() => setIsOpen(false)}
//           >
//             <LuX />
//           </button>

//           <div className='shadow-md border border-gray-200 rounded-lg bg-white'>
//             <EmojiPicker
//               emojiStyle="apple" // or "google", "facebook", "twitter"
//               onEmojiClick={(emoji) => {
//                 onSelect(emoji.imageUrl); // Get emoji image URL
//                 setIsOpen(false);
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmojiPickerPopup;

