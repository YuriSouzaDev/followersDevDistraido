import './FollowerItem.css';

interface FollowerItemProps {
  followerCount: number;
  screenWidth: number;
  screenHeight: number;
}

function FollowerItem({
  followerCount,
  screenWidth,
  screenHeight,
}: FollowerItemProps) {
  const createRandomPosition = (): { x: number; y: number } => {
    const x = Math.random() * (screenWidth - 20);
    const y = Math.random() * (screenHeight - 100);
    return { x, y };
  };

  function createFollowerIcons(followerCount: number): JSX.Element[] {
    const icons: JSX.Element[] = [];
    for (let index = 0; index < followerCount; index++) {
      const position = createRandomPosition();
      const delay = index * Math.random() * 100;
      icons.push(
        <div
          key={index}
          className="ball"
          style={{
            left: position.x,
            top: position.y,
            animationDelay: `${delay}ms`,
          }}
        ></div>
      );
    }
    return icons;
  }

  return (
    <div className="follower-item">{createFollowerIcons(followerCount)}</div>
  );
}

export default FollowerItem;
