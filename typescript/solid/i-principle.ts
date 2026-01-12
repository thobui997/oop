/**
 * Interface Segregation Principle (ISP):
 *  Thay vì một Interface lớn, hãy chia thành nhiều Interface nhỏ, chuyên biệt.
 *  Client không nên bị ép buộc phụ thuộc vào các phương thức mà họ không sử dụng.
 */

interface ISaverDocument {
	saveData(): void;
}

interface IReaderDocument {
	readData(): void;
}

interface IEdiableDocument {
	read(): void;
	save(): void;
}
