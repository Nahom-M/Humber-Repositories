const YouTubeEmbed = (props) => {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%", // Aspect ratio 16:9
        height: 0,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <iframe
        src={props.source}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%", // Ensures the iframe matches the container's width
          height: "100%", // Ensures the iframe matches the container's height
        }}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeEmbed;
