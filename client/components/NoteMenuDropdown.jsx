import React from 'react'
import { useRef, useEffect } from 'react';

export default function NoteMenuDropdown({isActive, tags, setIsActive, onDeleteNote, note}) {

  const modalRef = useRef();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  if (isActive) {
    return (
      <div className='dropdown-content' ref={modalRef}>
        <button className='dropdown-btn' type='button' onClick={() => onDeleteNote(note.id)}>Delete</button>
        <button className='dropdown-btn' type='button'>Edit tags</button>
      </div>
    )
  }
}
