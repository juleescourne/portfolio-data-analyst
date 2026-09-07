import { useEffect, useRef } from 'react';

const ImageModal = ({ imagePath, onClose }) => {
    const closeRef = useRef(null);
    useEffect(() => {
        if (!imagePath) return undefined;
        const handler = (event) => { if (event.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        closeRef.current?.focus();
        return () => document.removeEventListener('keydown', handler);
    }, [imagePath, onClose]);

    if (!imagePath) return null;
    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label="Aperçu du dashboard">
            <button ref={closeRef} className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-purple-400" onClick={onClose}>Fermer</button>
            <img src={imagePath} alt="Dashboard agrandi" className="max-w-full max-h-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
    );
};

export default ImageModal;
