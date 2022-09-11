import "./Spinner.scss";

function Spinner() {
  return (
    <div className={"spinner"}>
      <svg viewBox="25 25 50 50">
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}

export default Spinner;
