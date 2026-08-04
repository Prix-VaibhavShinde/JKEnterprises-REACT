export const formatDate = (
  date: string | Date,
  month: "short" | "long" = "short",
) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month,
    year: "numeric",
  });
};
