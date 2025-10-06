import React from "react";



const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-red-500 w-10 h-10 flex items-center justify-center text-white font-bold rounded-full cursor-pointer
                 hover:bg-red-600 hover:scale-110 transition-all shadow-md"
    >
      Delete
    </div>
  );
};

export default DeleteButton;
