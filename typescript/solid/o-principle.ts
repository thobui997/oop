/**
 * Open/Closed:
 *  Đối tượng nên mở rộng để phát triển (Open for extension), 
 *  nhưng đóng lại để chỉnh sửa (Closed for modification).
 */


interface IMessageSender {
    send(message: string): void;
}

class EmailSender implements IMessageSender {
    send(message: string) {
        console.log(`Email sending with message ${message}`)
    }
}

class SmsSender implements IMessageSender {
    send(message: string) {
        console.log(`SMS sending with message ${message}`)
    }
}

class NotificationService {
    constructor(public messageSender: IMessageSender) { }

    sendNotification(message: string) {
        this.messageSender.send(message);
    }
}

const emailSender = new EmailSender();
const notificationService = new NotificationService(emailSender);
notificationService.sendNotification("hello my friends!!!")