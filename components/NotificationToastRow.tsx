import NotificationMessage from "@/utils/NotificationMessage";
import { ToastNotification } from "./NotificationToast";

export default function NotificationToastRow(note: ToastNotification) {
  const getDate = (n: ToastNotification) =>
    "date" in n ? n.date : "localDate" in n ? n.localDate : "";
  return (
    <li className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
      <div className="flex notes-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground leading-relaxed break-words">
            <span>{NotificationMessage(note)}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">{getDate(note)}</p>
        </div>
      </div>
    </li>
  );
}
