import { useEffect, useState } from "react";

const API_KEY = "AIzaSyDWTEnlPDVFyklIuZ1cHxM6l4gBcj_RDRE";

const Result = () => {
  const [videoData, setVideoData] = useState({});
  const { likeCount, viewCount, commentCount } = videoData;
  const [channelData, setChannelData] = useState({});
  const [subscriberCount, setSubscriberCount] = useState(0);
  const { channelId, publishedAt, thumbnails, title: videoTitle } = channelData;

  const query = new URLSearchParams(window.location.search);
  const videoId = query.get("q");

  useEffect(() => {
    async function fetchResult() {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      const data = await res.json();
      setVideoData(data.items[0].statistics);
      setChannelData(data.items[0].snippet);
      const subscriber = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data.items[0].snippet.channelId}&key=${API_KEY}`
      );
      const subscriberData = await subscriber.json();
      setSubscriberCount(subscriberData.items[0].statistics.subscriberCount);
    }
    fetchResult();
  }, [videoId, channelId]);

  return (
    <div>
      <h1>{viewCount}</h1>
      <img src={thumbnails?.default.url} alt="" />
      <h1>{videoTitle}</h1>
      <h1>{likeCount}</h1>
      <h1>{commentCount}</h1>
      <h1>{subscriberCount}</h1>
      <h1>{publishedAt}</h1>
    </div>
  );
};

export default Result;
