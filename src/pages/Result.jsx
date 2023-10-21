import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { fetchVideo } from "../services/api";

const API_KEY = "AIzaSyClFZLm4Z_1oo30FkNQIPl0tKy_EIWichM";

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
          <button className="px-12 py-2 bg-white rounded-full text-black">
            Check How?
          </button>
        </div>
      </main>
      <OtherVideos channelId={channelId} subscriberCount={subscriberCount} />
    </div>
  );
};

function OtherVideos({ channelId, subscriberCount }) {
  const [videosId, setVideosId] = useState([]);
//   useEffect(() => {
//     async function fetchTopVideo() {
//       const res =
//         await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&order=viewCount&maxResults=2
//             `);
//       const data = await res.json();
//       const videoId = data.items.map((item) => item.id.videoId);
//       setVideosId(videoId);
//     }
//     fetchTopVideo();
//   }, [channelId]);
  return (
    <div className="w-3/4 mx-auto mt-16 flex flex-col gap-4 items-center">
      <span className="text-[#b7b7b7] font-bold text-lg">
        Other Videos Potentials
      </span>
      <table className="w-full text-center px-4 py-3">
        <thead className="bg-[#1e1e1e] border-b-2 border-black h-16">
          <tr>
            <th>Rank</th>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Views</th>
            <th>Likes</th>
            <th>Comments</th>
            <th>Uploaded on</th>
            <th>Estimated Earning</th>
          </tr>
        </thead>
        <tbody className="bg-[#171717]">
          {videosId.map((id, i) => (
            <VideoItem
              key={id}
              id={id}
              i={i}
              subscriberCount={subscriberCount}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VideoItem({ id, i, subscriberCount }) {
//   const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({});
  const [snippet, setSnippet] = useState({});
  //   const { viewCount, likeCount, commentCount } = video.statistics;
  //   const { thumbnails, title, publishedAt } = video.snippet;
  useEffect(() => {
    setLoading(true);
    fetchVideo(id).then((data) => {
      setStatistics(data.statistics);
      setSnippet(data.snippet);
    });
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <tr>
        <td>{i + 1}</td>
        <td>Loading...</td>
      </tr>
    );
  }
  return (
    <tr className="h-20">
      <td>{i + 2}</td>
      <td>{snippet?.title}</td>
      <td><img src={snippet?.thumbnails?.medium.url} alt="" className="h-16 m-auto object-cover rounded-lg"/></td>
      <td>{statistics?.viewCount}</td>
      <td>{statistics?.likeCount}</td>
      <td>{statistics?.commentCount}</td>
      <td>{formatDate(snippet?.publishedAt)}</td>
      <td>
        {Math.min(subscriberCount, statistics?.viewCount) +
          10 * statistics?.commentCount +
          5 * statistics?.likeCount}
      </td>
    </tr>
  );
}

export default Result;

export async function Loader({ params }) {
  const query = params.videoId;
  const result = fetchVideo(query);
  return result;
}
