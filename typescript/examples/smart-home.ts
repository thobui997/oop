abstract class SmartDevice {
	constructor(public id: string, public name: string) {}
}

interface IPowerable {
	turnOn(): void;
	turnOff(): void;
}

interface ITemperatureControl {
	setTemperature(temp: number): void;
}

interface ILockable {
	lock(): void;
	unlock(): void;
}

class SmartLight extends SmartDevice implements IPowerable {
	turnOn() {
		console.log("turn on the " + this.name);
	}

	turnOff() {
		console.log("turn off the " + this.name);
	}
}

class AirConditioner
	extends SmartDevice
	implements IPowerable, ITemperatureControl
{
	public currentTemp: number = 0;

	turnOn() {
		console.log("turn on the " + this.name);
	}

	turnOff() {
		console.log("turn off the " + this.name);
	}

	setTemperature(temp: number) {
		this.currentTemp = temp;
	}
}

class SmartLock extends SmartDevice implements ILockable {
	lock() {
		console.log("lock");
	}

	unlock() {
		console.log("unlock");
	}
}

class RemoteControl {
	shutdownAll(devices: (SmartDevice & IPowerable)[]) {
		for (let device of devices) {
			device.turnOff();
		}
	}
}

const light1 = new SmartLight("L001", "lìgth 1");
const light2 = new SmartLight("L001", "lìgth 2");
const air1 = new AirConditioner("A001", "Air 1");

const remoteControl = new RemoteControl();

remoteControl.shutdownAll([light1, light2, air1]);
