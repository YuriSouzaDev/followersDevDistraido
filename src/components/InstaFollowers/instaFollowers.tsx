import React from 'react';
import axios from 'axios';
import './instaFollowers.css';
import FollowerItem from '../FollowerItem/FollowerItem';

function InstaFollowers() {
  const [followers, setFollowers] = React.useState<number>(0);
  const [screenSize, setScreenSize] = React.useState<{
    width: number;
    height: number;
  }>({ width: window.innerWidth, height: window.innerHeight });

  async function getInstagramFollowers() {
    const token = import.meta.env.VITE_INSTAGRAM_TOKEN;
    const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;

    const fields = 'followers_count';
    const url = `https://graph.facebook.com/${userId}?fields=${fields}&access_token=${token}`;

    try {
      const { data } = await axios.get(url);
      setFollowers(data.followers_count);
    } catch (error) {
      console.error('Error fetching Instagram followers:', error);
    }
  }

  React.useEffect(() => {
    getInstagramFollowers();
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <h1>Frenesi de seguidores</h1>
      <p>
        Total: <span>{followers}</span>
      </p>
      <MemoizedFollowerItem
        followerCount={followers}
        screenWidth={screenSize.width}
        screenHeight={screenSize.height}
      />
    </div>
  );
}

const MemoizedFollowerItem = React.memo(FollowerItem);

export default InstaFollowers;
