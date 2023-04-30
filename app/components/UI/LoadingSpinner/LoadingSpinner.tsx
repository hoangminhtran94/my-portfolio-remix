const LoadingSpinner = ({ className = "" }: { className?: string }) => {
  return (
    <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full bg-modal">
      <div className={`lds-spinner ${className}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
