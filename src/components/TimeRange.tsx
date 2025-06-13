import React from 'react';
import clsx from 'clsx';

const timeRanges: { label: string; value: TimeRangeValue }[] = [
  { label: 'Last year', value: 'long_term' },
  { label: 'Last 6 Months', value: 'medium_term' },
  { label: 'Last 4 Weeks', value: 'short_term' },
];

type TimeRangeValue = 'long_term' | 'medium_term' | 'short_term';


interface TimeRangeSelectorProps {
  selected: TimeRangeValue;
  onChange: (range: TimeRangeValue) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="flex gap-6">
      {timeRanges.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={clsx(
            'text-base  transition-colors sm:text-2xl',
            selected === value ? 'text-foreground underline underline-offset-4' : 'text-muted-foreground hover:text-white'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
