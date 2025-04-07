interface BadgeProps {
  type: 'AI' | 'AM';
}

export default function Badge({ type }: BadgeProps) {
  return (
    <div className="flex-shrink-0 w-7 h-7 bg-black rounded-full flex items-center justify-center">
      <span className="text-xs font-medium text-white">{type}</span>
    </div>
  );
} 