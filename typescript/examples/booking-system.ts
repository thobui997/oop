interface IBookingService {
	calculatePrice(data: any): number;
}

class RideHailingService implements IBookingService {
	calculatePrice(data: any) {
		return data.km * 10000;
	}
}

class FoodDeliveryService implements IBookingService {
	calculatePrice(data: any) {
		return data.foodPrice + 20000;
	}
}

interface IPaymentGateway {
	processPayment(amount: number): boolean;
}

class CreditCardPayment implements IPaymentGateway {
	processPayment(amount: number) {
		return true;
	}
}

class MomoPayment implements IPaymentGateway {
	processPayment(amount: number) {
		return true;
	}
}
interface INotification {
	send(message: string): void;
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

class BookingManager {
	constructor(
		private bookingService: IBookingService,
		private paymentGateway: IPaymentGateway,
		private notification: INotification,
	) {}

	createBooking(inputData: any) {
		const amount = this.bookingService.calculatePrice(inputData);

		const isSuccess = this.paymentGateway.processPayment(amount);

		if (isSuccess) {
			this.notification.send("booking success");
		} else {
			this.notification.send("booking failed");
		}
	}
}

interface IRideData {
	km: number;
}
interface IFoodData {
	foodPrice: number;
}

class DiscountBookingDecorator implements IBookingService {
	constructor(private baseService: IBookingService) {}

	calculatePrice(data: any): number {
		let price = this.baseService.calculatePrice(data);
		if (price > 500000) {
			price -= 50000;
			console.log("Đã áp dụng giảm giá 50k!");
		}
		return price;
	}
}

// Cách sử dụng cực kỳ linh hoạt:
const rideService = new RideHailingService();
const discountedRideService = new DiscountBookingDecorator(rideService);
const paymentGateway = new CreditCardPayment();
const notification = new SmsNotification();

const bookingManager = new BookingManager(
	discountedRideService,
	paymentGateway,
	notification,
);

bookingManager.createBooking({ km: 100, foodPrice: 40000 });
