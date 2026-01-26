import { ArrowRight, Loader2, Send, SendHorizonal } from "lucide-react";

export default function ButtonLoader({
  handleClick = () => {},
  loading = false,
  text = "Submit",
  loadingText = 'Wait',
  textIcon =null,
  disabled = false,
  className = "",
  buttonColor="primary"
}) {
  const isDisabled = loading || disabled;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`btn btn-${buttonColor} ${className}`}>
      {loading ? (
        <>
          {loadingText && loadingText}
          <Loader2 className="animate-spin w-5 h-5 font-medium" />
        </>
      ) : (
        <>
          {textIcon && textIcon}
          {text}
        </>
      )}
    </button>
  );
}
