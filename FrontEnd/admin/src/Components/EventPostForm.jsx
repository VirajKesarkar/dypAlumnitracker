import { useState } from "react";
import { motion } from "framer-motion";

const EventPostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [googleFormLink, setGoogleFormLink] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !googleFormLink) {
      alert("All fields are required");
      return;
    }
    onSubmit({ title, description, image, googleFormLink });
    setTitle("");
    setDescription("");
    setImage(null);
    setGoogleFormLink("");
    setIsFlipped(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-gray-100 p-4"
    >
      <motion.div 
        className="relative w-full max-w-lg bg-white shadow-lg rounded-xl p-6" 
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Post an Alumni Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform hover:scale-105"
          />
          <textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform hover:scale-105"
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="w-full p-2 border border-gray-300 rounded-lg transition-transform hover:scale-105"
          />
          {image && (
            <motion.img 
              src={image} 
              alt="Event Preview" 
              className="w-full h-40 object-cover mt-2 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          <input
            type="url"
            placeholder="Google Form Link"
            value={googleFormLink}
            onChange={(e) => setGoogleFormLink(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform hover:scale-105"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-110"
          >
            Post Event
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EventPostForm;
