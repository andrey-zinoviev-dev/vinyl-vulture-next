import styles from "./AccountRecentChats.module.css";

type RecentChat = {
  id: string;
  counterpart: string;
  preview: string;
  timeLabel: string;
};

const RECENT_CHATS: RecentChat[] = [
  {
    id: "1",
    counterpart: "vinyl_seller",
    preview: "Пластинка ещё в наличии, могу отправить завтра",
    timeLabel: "Сегодня",
  },
  {
    id: "2",
    counterpart: "jazz_corner",
    preview: "Состояние обложки — VG+, диск NM",
    timeLabel: "Вчера",
  },
  {
    id: "3",
    counterpart: "crate_diggers",
    preview: "Спасибо за заказ! Трекинг пришлю вечером",
    timeLabel: "Пн",
  },
  {
    id: "4",
    counterpart: "analog_store",
    preview: "Есть ещё один пресс с этой сессии",
    timeLabel: "Вс",
  },
];

export function AccountRecentChats() {
  return (
    <ul className={styles.list}>
      {RECENT_CHATS.map((chat) => (
        <li key={chat.id} className={styles.item}>
          <div className={styles.main}>
            <span className={styles.counterpart}>{chat.counterpart}</span>
            <span className={styles.preview}>{chat.preview}</span>
          </div>
          <span className={styles.time}>{chat.timeLabel}</span>
        </li>
      ))}
    </ul>
  );
}
