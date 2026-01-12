/**
 * Dependency Inversion Principle (DIP):
 *  1. Các module cấp cao không nên phụ thuộc vào các module cấp thấp. 
 *     Cả hai nên phụ thuộc vào sự trừu tượng (Abstraction/Interface). 
 *  2. Sự trừu tượng không nên phụ thuộc vào chi tiết, mà chi tiết nên phụ thuộc vào sự trừu tượng.
 */

class Order {
    constructor(
        public id: string,
        public orderName: string,
        public product: string[],
        public createdDate: string,
    ) { }
}

interface IDatabase {
    save(order: Order): void;
}

class MySQLDatabase implements IDatabase {
    save(order: Order) {
        console.log("MySQL save: " + order.id)
    }
}

class MongoDatabase implements IDatabase {
    save(order: Order) {
        console.log("Mongo save: " + order.id)
    }
}

class OrderProcessor {
    constructor(public database: IDatabase) { }

    process(order: Order) {
        this.database.save(order);
    }
}