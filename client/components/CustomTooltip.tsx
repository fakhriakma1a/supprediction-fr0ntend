// TypeScript interfaces for Tooltip
interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

// Custom Tooltip Component for displaying info on hover
export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-32">
        <p className="text-gray-600 text-sm font-poppins mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm font-poppins font-medium" style={{ color: entry.color }}>
              {entry.name === 'actual' ? 'Actual' : 
               entry.name === 'predicted' ? 'Predicted' : 
               entry.name === 'sales' ? 'Sales' :
               entry.name === 'supply' ? 'Supply' : entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};