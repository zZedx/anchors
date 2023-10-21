const API_KEY = "AIzaSyClFZLm4Z_1oo30FkNQIPl0tKy_EIWichM";

export async function fetchVideo(query) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${query}&key=${API_KEY}`
  );
  const data = await res.json();
  return data.items[0];
}

