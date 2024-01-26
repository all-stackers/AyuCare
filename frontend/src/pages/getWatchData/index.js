import React from "react";

const WatchData = () => {
  const HandleClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://v1.nocodeapi.com/jhenilparihar/fit/AIyMVUBTUSNFKymT/aggregatesDatasets?dataTypeName=steps_count",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const formatDataForChart = (data) => {
    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const values = [];
    const chartLabels = [];
    data.forEach((entry) => {
      const startTime = new Date(parseInt(entry.startTimeMillis));
      const dayOfWeek = startTime.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
      chartLabels.push(labels[dayOfWeek]);
      values.push(entry.value);
    });

    return { chartLabels, values };
  };

  return (
    <div>
      <button
        onClick={() => {
          formatDataForChart([
            {
              value: 2631,
              startTimeMillis: "1705637253952",
              endTimeMillis: "1705723653952",
              startTime: "19 Jan 2024 04:07 am",
              endTime: "20 Jan 2024 04:07 am",
            },
            {
              value: 8095,
              startTimeMillis: "1705723653952",
              endTimeMillis: "1705810053952",
              startTime: "20 Jan 2024 04:07 am",
              endTime: "21 Jan 2024 04:07 am",
            },
            {
              value: 798,
              startTimeMillis: "1705896453952",
              endTimeMillis: "1705982853952",
              startTime: "22 Jan 2024 04:07 am",
              endTime: "23 Jan 2024 04:07 am",
            },
            {
              value: 3595,
              startTimeMillis: "1705982853952",
              endTimeMillis: "1706069253952",
              startTime: "23 Jan 2024 04:07 am",
              endTime: "24 Jan 2024 04:07 am",
            },
            {
              value: 7851,
              startTimeMillis: "1706069253952",
              endTimeMillis: "1706155653952",
              startTime: "24 Jan 2024 04:07 am",
              endTime: "25 Jan 2024 04:07 am",
            },
            {
              value: 5214,
              startTimeMillis: "1706155653952",
              endTimeMillis: "1706227201000",
              startTime: "25 Jan 2024 04:07 am",
              endTime: "26 Jan 2024 12:00 am",
            },
          ]);
        }}
      >
        Hit
      </button>
    </div>
  );
};

export default WatchData;
