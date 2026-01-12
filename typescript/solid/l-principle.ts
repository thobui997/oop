/**
 * Liskov Substitution Principle (LSP):
 *  Các đối tượng của lớp con phải có thể thay thế cho các đối tượng của lớp cha
 *  mà không làm hỏng tính đúng đắn của chương trình.
 */

interface ISaverDocument {
	saveData(): void;
}

interface IReaderDocument {
	readData(): void;
}

class EditableDocument implements IReaderDocument, ISaverDocument {
	readData() {
		console.log("Đang đọc dữ liệu...");
	}
	saveData() {
		console.log("Đang lưu dữ liệu...");
	}
}

class ReadOnlyDocument implements IReaderDocument {
	readData() {
		console.log("read data");
	}
}
