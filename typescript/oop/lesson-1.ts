class ElectronicDevice {
    private _batteryLevel: number = 0;

    charge(batteryLevel: number) {
        this._batteryLevel = batteryLevel;
    }

    turnOn() {
        console.log("")
    }
}

class Laptop extends ElectronicDevice {
    override turnOn() {
        console.log("Booting Windows...")
    }
}

class Smartphone extends ElectronicDevice {
    override turnOn() {
        console.log("Logo Apple hien len...")
    }
}

const laptop = new Laptop()
laptop.turnOn();

const apple = new Smartphone();
apple.turnOn();
