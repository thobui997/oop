// Chỉ những ai có thể tính lương mới dùng interface này
interface ISalaried {
	calculateSalary(): number;
}

// Interface dành cho việc xuất dữ liệu (Single Responsibility)
interface IPayrollExporter {
	export(employeeName: string, salary: number): void;
}

abstract class Employee {
	constructor(public name: string) {} // Lưu tên nhân viên chung cho mọi loại
}

class FullTimeEmployee extends Employee implements ISalaried {
	constructor(name: string, private monthlySalary: number) {
		super(name);
	}

	calculateSalary(): number {
		return this.monthlySalary;
	}
}

class ContractorEmployee extends Employee implements ISalaried {
	constructor(
		name: string,
		private hourlyRate: number,
		private hoursWorked: number,
	) {
		super(name);
	}

	calculateSalary(): number {
		return this.hourlyRate * this.hoursWorked;
	}
}

// Ví dụ về Intern: Kế thừa Employee nhưng KHÔNG có lương (không implements ISalaried)
class Intern extends Employee {
	constructor(name: string) {
		super(name);
	}
}

class ConsolePayrollExporter implements IPayrollExporter {
	export(employeeName: string, salary: number): void {
		console.log(
			`[CONSOLE] Nhân viên: ${employeeName} | Lương: ${salary.toLocaleString()} VNĐ`,
		);
	}
}

class CSVPayrollExporter implements IPayrollExporter {
	export(employeeName: string, salary: number): void {
		console.log(`[CSV] "${employeeName}", "${salary}"`); // Giả lập ghi file CSV
	}
}

class PayrollService {
	// Chúng ta nhận vào danh sách những đối tượng có lương
	// Kết hợp kiểu Intersection để lấy được cả name (từ Employee) và lương (từ ISalaried)
	constructor(
		private employees: (Employee & ISalaried)[],
		private exporter: IPayrollExporter,
	) {}

	processPayroll(): void {
		console.log("--- BẮT ĐẦU XỬ LÝ BẢNG LƯƠNG ---");
		this.employees.forEach((emp) => {
			const salary = emp.calculateSalary();
			this.exporter.export(emp.name, salary);
		});
	}
}

// Khởi tạo các nhân viên
const staff1 = new FullTimeEmployee("Nguyễn Văn A", 20000000);
const staff2 = new ContractorEmployee("Trần Thị B", 200000, 160);
const intern = new Intern("Lê Văn C"); // Nhân viên này sẽ không được đưa vào bảng lương

// Khởi tạo exporter
const consoleExporter = new ConsolePayrollExporter();

// Khởi tạo dịch vụ và chạy
const hrSystem = new PayrollService([staff1, staff2], consoleExporter);
hrSystem.processPayroll();
