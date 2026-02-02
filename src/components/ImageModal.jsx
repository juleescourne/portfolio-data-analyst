import React from 'react';

const ImageModal = ({ imagePath, onClose }) => {
    if (!imagePath) return null;

    return (
        <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={onClose}>
            <button
                className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                onClick={onClose}>
                Fermer
            </button>
            <img
                src={imagePath}
                alt="Dashboard agrandi"
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
};

export default ImageModal;