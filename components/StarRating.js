export default function StarRating({ rating = 0, count, size = "text-sm" }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center gap-1 ${size}`}>
      <div className="flex" aria-label={`Note : ${rating} sur 5`}>
        {stars.map((s) => {
          const filled = rating >= s;
          const half = !filled && rating > s - 1 && rating < s;
          return (
            <span key={s} className="relative text-slate-600">
              <span aria-hidden>★</span>
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden text-amber-400"
                  style={{ width: half ? "50%" : "100%" }}
                  aria-hidden
                >
                  ★
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="font-semibold text-slate-200">{rating.toFixed(1)}</span>
      {typeof count === "number" && (
        <span className="text-slate-400">({count})</span>
      )}
    </div>
  );
}
