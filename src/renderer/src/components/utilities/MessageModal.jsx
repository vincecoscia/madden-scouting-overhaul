export const MessageModal = (props) => {
  const { message, setMessage, title } = props;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state. */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal panel, show/hide based on modal state. */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex flex-col items-center">
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold">{title}</div>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700"
                    onClick={() => setMessage('')}
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">{message}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}