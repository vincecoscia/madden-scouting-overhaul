// WeekTracker.js
export default function WeekTracker({ currentWeek }) {
  const totalWeeks = 20;

  return (
      <div className="flex justify-between items-center px-4 w-full">

        {Array.from({ length: totalWeeks + 1 }, (_, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {index > 0 && (
              // This line connects the circles; it won't appear before the first item
              <div
                className={`absolute top-2 left-0 h-0.5 w-20 bg-gray-300 transform -translate-x-full ${index <= currentWeek ? 'bg-green-500' : 'bg-gray-300'}`}
                style={{ zIndex: 0 }}
              />
            )}
            <div className={`w-4 h-4 rounded-full z-10 ${index <= currentWeek ? 'bg-green-500' : 'bg-gray-500'}`} />
            <div className="mt-2 text-xs">{index}</div>
          </div>
        ))}
      </div>
  );
}
