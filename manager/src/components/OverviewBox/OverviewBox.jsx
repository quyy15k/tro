import React from "react";

const OverviewBox = ({ count, title, icon, bg }) => {
  return (
    <div
      className={`w-1/3 border h-40  flex flex-col justify-center items-center ${bg} rounded-md shadow-md`}
    >
      <span className="text-2xl text-white uppercase">
        {title}: <strong>{count}</strong>
      </span>
      {icon}
    </div>
  );
};

export default OverviewBox;
