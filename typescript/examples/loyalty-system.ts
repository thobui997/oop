interface ICustomer {
	getDiscount(): number;
}

interface INotification {
	send(message: string): void;
}

interface IRepository {
	save(discount: number): void;
}

class GoldCustomer implements ICustomer {
	getDiscount() {
		return 20 / 100;
	}
}

class SliverCustomer implements ICustomer {
	getDiscount() {
		return 10 / 100;
	}
}

class GuestCustomer implements ICustomer {
	getDiscount() {
		return 0;
	}
}

class HolidayDiscount implements ICustomer {
	constructor(private baseCustomer: ICustomer) {}

	getDiscount(): number {
		// Lấy giảm giá gốc + thêm 5% ngày lễ
		return this.baseCustomer.getDiscount() + 0.05;
	}
}

class EmailNotification implements INotification {
	send(message: string) {
		console.log("email sending....");
	}
}

class SmsNotification implements INotification {
	send(message: string) {
		console.log("sms sending...");
	}
}

class MysqlDatabase implements IRepository {
	save(discount: number): void {
    console.log("save to database")
  }
}

class DiscountService {
	getDiscount(total: number, customer: ICustomer) {
		return total - total * customer.getDiscount();
	}
}

class CheckoutProcess {
	constructor(
		private database: IRepository,
		private discountService: DiscountService,
		private notification: INotification,
		private customer: ICustomer,
	) {}

	processCheckout(money: number) {
		const totalMoney = this.discountService.getDiscount(money, this.customer);

		this.database.save(totalMoney);

		this.notification.send("order created");
	}
}

const guest = new GuestCustomer();
const database = new MysqlDatabase();
const discountService = new DiscountService();
const emailNotification = new EmailNotification();

const checkoutProcess = new CheckoutProcess(
	database,
	discountService,
	emailNotification,
	guest,
);

checkoutProcess.processCheckout(1000);
