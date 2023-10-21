import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [query , setQuery] = useState('');
    function handleSubmit(e){
        e.preventDefault();
        if(query){
            const video = new URLSearchParams(new URL(query).search);
            const videoId = video.get('v');
            navigate(`/result/${videoId}`);
        }
    }
  return (
    <div className="w-full flex justify-center">
      <div className="w-1/3 mt-10 text-center space-y-8">
        <h1 className="font-bold text-5xl">Discorver your earning potential</h1>
        <p className="text-white/70 text-lg">
          Turn your Youtube expertise into a lucrative income through resource
          sharing
        </p>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter youtube video link"
            className="px-5 py-2 rounded-full border bg-transparent flex-grow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="px-6 py-2 bg-orange-600 rounded-full">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
