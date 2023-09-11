import React from "react";

const ThreadCard = () => {
  const data = [
    {
      threadName: "What are the startups in the bay area?",
      studentName: "Karan",
      replies: "43",
      views: "254",
      date: "May 25,2023",
      studentReplies: "14",
    },

    {
      threadName: "What are the startups in the  area?",
      studentName: "Wini",
      replies: "49",
      views: "214",
      date: "May 29,2023",
      studentReplies: "13",
    },
    {
      threadName: "What are the startups in the bay area?",
      studentName: "Bhanu",
      replies: "68",
      views: "214",
      date: "June 9,2023",
      studentReplies: "20",
    },

    {
      threadName: "What are the startups in the bay area?",
      studentName: "Rahul",
      replies: "19",
      views: "89",
      date: "May 19,2023",
      studentReplies: "2",
    },
  ];
  return (
    <div className="w-[860px] border border-2 ">
      <h1 className="text-left ml-8 mt-8 pb-2 text-3xl">Startery Community</h1>
      <div className="grid grid-cols-2 text-dark-gray rounded-md bg-gray-100 m-4">
        <div className="flex justify-start ml-6">
          <h3>Topic</h3>
        </div>
        <div className="flex flex-row justify-end mr-6 space-x-4">
          <h3>Replies</h3>
          <h3>Views</h3>
          <h3>Latest</h3>
        </div>
      </div>
      {data.map((item) => {
        return (
          <div>
            <div className="p-4">
              <div className="grid grid-rows-2 font-semibold text-md">
                <div className="grid grid-cols-2 mt-4">
                  <div className="flex justify-start ml-4 ">
                    <h3 >{item.threadName}</h3>
                  </div>

                  <div className="flex flex-row justify-end mr-6 space-x-9">
                    <h3 className="">{item.replies}</h3>
                    <h3 className="">{item.views}</h3>
                    <img className="relative mt-2" alt="img"></img>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 ">
                    <div className="flex flex-row justify-start ml-4 text-xs space-x-2 font-semibold">
                      <h3 >{item.studentName}</h3>
                      <h3 className="font-semibold text-light-gray">
                        {item.date}
                      </h3>
                      <h3 className="font-semibold text-light-gray">
                        {item.studentReplies}
                      </h3>
                    </div>

                    <div className="flex flex-row justify-end mr-24  text-sm text-light-gray space-x-9 font-semibold ">
                      <h3 className="absolute mr-14">replies</h3>
                      <h3 className="">views</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ThreadCard;
