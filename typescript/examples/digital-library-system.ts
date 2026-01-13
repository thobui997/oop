abstract class LibraryItem {
    constructor(public id: number, public title: string, public author: string) { }
}

abstract class BorrowableItem extends LibraryItem implements IBorrowable {
    borrow() {
        console.log(`[LOG] Đang thực hiện thủ tục cho mượn: ${this.title}`);
    }

    returnItem() {
        console.log(`[LOG] Đã nhận lại và kiểm tra tình trạng: ${this.title}`);
    }
}

interface IDownloadable {
    download(): void;
}

interface IBorrowable {
    borrow(): void;
    returnItem(): void;
}

interface IDownloadRule {
    check(item: LibraryItem & IDownloadable): boolean;
}

class PhysicalBook extends BorrowableItem { }

class EBook extends LibraryItem implements IDownloadable {
    download() {
        console.log(`Dang tai sach ${this.title}`);
    }
}

class AudioBook extends BorrowableItem implements IDownloadable {
    download() {
        console.log(`Dang tai sach ${this.title}`);
    }
}

interface INotification {
    send(message: string): void;
}

class EmailNotification implements INotification {
    send(message: string) {
        console.log(`[Email] message: ${message}`);
    }
}

class SMSNotification implements INotification {
    send(message: string) {
        console.log(`[SMS] message: ${message}`);
    }
}

class TitleLengthRule implements IDownloadRule {
    check(item: LibraryItem & IDownloadable): boolean {
        return item.title.length >= 10;
    }
}

class LibraryService {
    constructor(private notification: INotification) { }

    processBorrow(item: LibraryItem & IBorrowable) {
        item.borrow();

        this.notification.send(`Da cho muon sach ${item.title}`);
    }

    processDownload(item: LibraryItem & IDownloadable, downloadRules: IDownloadRule[]) {
        if (downloadRules.length > 0 && !downloadRules.some(rule => rule.check(item))) {
            console.log("Khong duoc phep tai sach nay");
            return;
        }

        item.download();

        this.notification.send(`Da tai sach ${item.title}`);

    }
}