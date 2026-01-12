interface IOrderObserver {
	update(order: Order): void;
}

class Order {
	private observers: IOrderObserver[] = [];
	public status: string = "PENDING";

	constructor(public id: string) {}

	addObserver(observer: IOrderObserver) {
		this.observers.push(observer);
	}

	changeStatus(newStatus: string) {
		this.status = newStatus;
		console.log(`--- Đơn hàng ${this.id} chuyển sang: ${newStatus} ---`);

		for (let observer of this.observers) {
			observer.update(this);
		}
	}
}

class WarehouseHandler implements IOrderObserver {
	update(order: Order) {
		// Logic lọc nằm ở đây như bạn đã đoán!
		if (order.status === "PAID") {
			console.log("[Warehouse] Đã nhận thanh toán. Bắt đầu đóng gói hàng...");
		}
	}
}

class CustomerNotificationHandler implements IOrderObserver {
	update(order: Order) {
		// Handler này quan tâm đến mọi trạng thái
		console.log(
			`[Customer] Thông báo: Đơn hàng của bạn hiện là ${order.status}`,
		);
	}
}

// Chạy thử
const myOrder = new Order("ORDER_001");
myOrder.addObserver(new WarehouseHandler());
myOrder.addObserver(new CustomerNotificationHandler());

myOrder.changeStatus("SHIPPING"); // Chỉ Customer nhận
myOrder.changeStatus("PAID"); // Cả hai cùng nhận
