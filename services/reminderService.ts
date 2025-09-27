const REMINDER_STORAGE_KEY = 'eventReminders';

export const getReminderIds = (): number[] => {
  try {
    const savedReminders = localStorage.getItem(REMINDER_STORAGE_KEY);
    if (savedReminders) {
      const ids = JSON.parse(savedReminders);
      if (Array.isArray(ids) && ids.every(id => typeof id === 'number')) {
        return ids;
      }
    }
  } catch (error) {
    console.error("Falha ao analisar lembretes do localStorage", error);
  }
  return [];
};

export const addReminderId = (id: number): void => {
  const currentIds = getReminderIds();
  if (!currentIds.includes(id)) {
    const newIds = [...currentIds, id];
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(newIds));
  }
};

export const removeReminderId = (id: number): void => {
  const currentIds = getReminderIds();
  const newIds = currentIds.filter(reminderId => reminderId !== id);
  localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(newIds));
};
