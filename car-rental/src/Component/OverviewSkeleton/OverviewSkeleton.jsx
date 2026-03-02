const OverviewSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-1/3 bg-border rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-28 bg-border rounded-xl"></div>
        <div className="h-28 bg-border rounded-xl"></div>
        <div className="h-28 bg-border rounded-xl"></div>
      </div>

      <div className="h-40 bg-border rounded-xl"></div>
    </div>
  );
};

export default OverviewSkeleton;
