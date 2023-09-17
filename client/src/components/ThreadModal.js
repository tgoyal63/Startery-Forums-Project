import React, { useState } from "react";

const ThreadModal = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <div>
      {!showRequestModal ? (
        <button
          className="mt-10 mr-10 text-lg font-semibold bg-light-purple h-[53px] w-[201px] rounded-xl text-dark-purple"
          onClick={() => setShowRequestModal(true)}
        >
          Start New Thread
        </button>
      ) : (
        <div>
          <button
            className="mt-10 mr-10 text-lg font-semibold bg-light-purple h-[53px] w-[201px] rounded-xl text-dark-purple"
            onClick={() => setShowRequestModal(true)}
          >
            Start New Thread
          </button>
          <div
            class="relative z-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-">
                      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h1 className="text-xl font-semibold mb-4">
                          Write a new thread
                        </h1>
                        <div class="mt-2">
                          <div className="flex flex-col">
                            <div>
                              <label>Heading</label>
                              <input
                                type="text"
                                className="border rounded-md ml-10"
                              />
                            </div>
                            <div className="my-1">
                              <label>Description</label>
                              <input
                                type="text"
                                className="border rounded-md ml-[19px]"
                              />
                            </div>
                            <div>
                              <label>Category</label>
                              <select
                                id="organizationSelect"
                                className="ml-8 px-2 py-1 rounded-lg border w-20"
                                placeholder=""
                              >
                                <option disabled selected>
                                  Select 
                                </option>
                                <option value="org1">  1</option>
                                <option value="org2"> 2</option>
                                <option value="org3"> 3</option>
                                <option value="org4"> 4</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      class="inline-flex w-full justify-center rounded-md bg-white ring-2 ring-dark-purple text-black px-3 py-2 text-sm font-semibold shadow-sm hover:bg-light-purple hover:text-dark-purple sm:ml-3 sm:w-auto"
                      onClick={() => setShowRequestModal(false)}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadModal;
