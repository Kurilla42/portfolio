// Цели Метрики (счётчик 109643428 подключён в корневом layout). Вызов безопасен, если ym не загрузился.
export function ymGoal(goal: string) {
  if (typeof window === "undefined") return;
  const ym = (window as unknown as { ym?: (id: number, action: string, goal: string) => void }).ym;
  if (typeof ym === "function") ym(109643428, "reachGoal", goal);
}
