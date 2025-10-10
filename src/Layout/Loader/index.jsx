// ✅ Loader.jsx
const Loader = ({ loading }) => {
  if (!loading) return null; // hide when false
  return (
    <div className="loader-wrapper">
      <div className="loader-index">
        <span></span>
      </div>
      <svg>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 19 -9"
            result="goo"
          />
        </filter>
      </svg>
    </div>
  );
};
export default Loader;
