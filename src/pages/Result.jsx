import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const API_KEY = "AIzaSyDWTEnlPDVFyklIuZ1cHxM6l4gBcj_RDRE";

function formatDate(date) {
  const inputDate = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const outputDate = inputDate.toLocaleDateString("en-US", options);
  return outputDate;
}

const Result = () => {
  //   console.log(useLoaderData());
  const { viewCount, likeCount, commentCount } = useLoaderData().statistics;
  const {
    thumbnails,
    title: videoTitle,
    publishedAt,
    channelId,
  } = useLoaderData().snippet;
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    async function fetchChannelData() {
      const subscriber = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`
      );
      const subscriberData = await subscriber.json();
      setSubscriberCount(subscriberData.items[0].statistics.subscriberCount);
    }
    fetchChannelData();
  }, [channelId]);

  return (
    <div className="w-full">
      <main className="bg-[#1e1e1e] px-10 py-6 rounded-2xl w-3/4 m-auto mt-10 flex justify-between">
        <div className="flex flex-col gap-4">
          <span className="bg-[#707070] px-3 py-1 w-fit rounded-lg">
          <i className="fa-solid fa-medal"></i> Top earner video
          </span>
          <div className="flex gap-6 items-center">
            <img
              src={thumbnails.medium.url}
              className="object-cover h-32 w-64 rounded-xl"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-lg">{videoTitle}</h1>
              <span className="text-white/50">
                <i className="fa-solid fa-eye mr-1"></i> {viewCount}
              </span>
              <span className="text-white/50">
                <i className="fa-solid fa-thumbs-up mr-1"></i> {likeCount}
              </span>
              <span className="text-white/50">
                <i className="fa-solid fa-comment mr-1"></i> {commentCount}
              </span>
            </div>
          </div>
          <span className="text-white/50 text-sm inline-block">
            Uploaded on - {formatDate(publishedAt)}
          </span>
        </div>
        <div className="bg-[#282828] py-6 px-24 flex flex-col gap-4 rounded-xl items-center justify-center">
          <span className="font-bold text-3xl">
            $
            {Math.min(subscriberCount, viewCount) +
              10 * commentCount +
              5 * likeCount}
          </span>
          <button className="px-12 py-2 bg-white rounded-full">View</button>
        </div>
      </main>
      <OtherVideos channelId={channelId}/>
    </div>
  );
};

function OtherVideos({channelId}){
    return <div>
        <span>Other Videos Potentials</span>
    </div>
}

export default Result;

export function Loader() {
  const query = new URLSearchParams(window.location.search);
  const videoId = query.get("q");

  async function fetchResult() {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    );
    const data = await res.json();
    return data.items[0];
  }
  return fetchResult();
}
